<?php
/**
 * @file
 * Contains \Drupal\wsib_merger\Form\\WsibMerferForm.
 */

namespace Drupal\wsib_merger\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Queue\QueueFactory;
use Drupal\Core\Queue\ReliableQueueInterface;
use Drupal\Core\Queue\QueueWorkerInterface;
use Drupal\Core\Queue\QueueWorkerManagerInterface;
use Drupal\Core\Queue\SuspendQueueException;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Database\Database;

class WsibMergerForm extends ConfigFormBase {

  /**
   * @var QueueFactory
   */
  protected $queueFactory;

  /**
   * @var QueueWorkerManagerInterface
   */
  protected $queueManager;

  public static $queueManagerInstance;

  /**
   * {@inheritdoc}
   */
  public function __construct(QueueFactory $queue, QueueWorkerManagerInterface $queue_manager) {
    $this->queueFactory = $queue;
    $this->queueManager = $queue_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('queue'),
      $container->get('plugin.manager.queue_worker')
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['wsib_merger.settings'];
  }

  /**
   * {@inheritdoc}.
   */
  public function getFormId() {
    return 'wsib_merger_form';
  }

  /**
   * {@inheritdoc}.
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('wsib_merger.settings');
    $form['actions']['#type'] = 'actions';
    $form['actions']['run_merge'] = [
      '#type' => 'submit',
      '#value' => $this->t('Merge Fields'),
      '#button_type' => 'primary',
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $operation = $form_state->getValues()['op']->__toString();
    if (isset($operation) && $operation === 'Merge Fields') {
      // Trigger manual import.
      $this->mergerDataQueuePopulate();
    }
    parent::submitForm($form, $form_state);
  }

  /**
   * Helper function to populate Queue for clearing data on profiles.
   */
  protected function mergerDataQueuePopulate() {
    // Get manual queue instance.
    $queue_manual = $this->queueFactory->get('wsib_merger_get_manual', TRUE);
    $queue_manual->deleteQueue();
    $operations = [];
    // Making a queue of the items.
    $operations[] = ['\Drupal\wsib_merger\Form\WsibMergerForm::getBatchOperation', ['queueCreateItem', [$queue_manual, 'merge_info']]];
    // Merging data.
    $operations[] = [
      '\Drupal\wsib_merger\Form\WsibMergerForm::queueProcessItem',
      [
        $queue_manual,
        'wsib_merger_get_manual',
      ],
    ];
    $batch = [
      'title' => $this->t('WSIB Merger Run'),
      'operations' => $operations,
      'label' => $this->t('WSIB Merger Run'),
      'finished' => NULL,
    ];
    batch_set($batch);
  }

  /**
   * Helper function to get batch operation.
   *
   * @param $callback_name
   *   Name of the callback function that needs to be called.
   *
   * @param array $arguments
   *   Array of arguments that needs to be passed to the callback function.
   */
  public static function getBatchOperation($callback_name, $arguments, &$context) {
    switch ($callback_name) {
      case 'queueCreateItem':
        self::$callback_name($arguments[0], $arguments[1]);
        break;

      case 'queueProcessItem':
        self::$callback_name($arguments[0], $arguments[1], $context);
        break;
    }
  }

  /**
   * Helper function to manually process queued items.
   *
   * @param QueueFactory $queue
   *
   * @param string $queue_name
   *   Name of the queue.
   */
  public static function queueProcessItem($queue, string $queue_name, &$context) {
    $queue_worker = \Drupal::service('plugin.manager.queue_worker')->createInstance($queue_name);
    $limit = 1;
    if (empty($context['sandbox'])) {
      $context['sandbox']['progress'] = 0;
      $context['sandbox']['current'] = 0;
      $context['sandbox']['max'] = $queue->numberOfItems();
      $context['sandbox']['offset'] = 0;
    }
    else {
      $context['sandbox']['offset'] = $context['sandbox']['offset'] + $limit + 1;
    }
    $off = min($context['sandbox']['offset'] + $limit, $context['sandbox']['max'] - 1);
    for ($i = $context['sandbox']['offset']; $i <= $off; $i++) {
      $item = $queue->claimItem();
      if (isset($item)) {
        try {
          $queue_worker->processItem($item->data);
          $queue->deleteItem($item);
        }
        catch (SuspendQueueException $e) {
          $queue->releaseItem($item);
          break;
        }
        catch (\Exception $e) {
          watchdog_exception('wsib_merger', $e);
        }
      }
      $context['sandbox']['progress']++;
    }
    if ($context['sandbox']['progress'] != $context['sandbox']['max']) {
      $context['finished'] = $context['sandbox']['progress'] / $context['sandbox']['max'];
    }
    else {
      $context['sandbox'] = [];
      $context['finished'] = 1;
    }
  }

  /**
   * Helper function to create queue item.
   *
   * @param queue
   *   QueueInterface object.
   * @param string $key
   *   Key to identify part of the import.
   */
  protected static function queueCreateItem($queue, string $key) {
    $item = new \stdClass();
    $data = self::queryItems($key);
    if (!empty($data)) {
      foreach ($data as $record) {
        $item->content = [
          'key' => $key,
          'info' => $record,
        ];
        $queue->createItem($item);
      }
    }

  }

  /**
   * Helper function to query items from old db.
   *
   * @param string $key
   *   Key of the import determines what.
   */
  protected static function queryItems(string $key) {
    $db = Database::getConnection('default', 'default');
    switch ($key) {
      case 'merge_info':
        $query = $db->select('node_field_data', 'n');
        $query->fields('n', ['nid']);
        $query->condition('type', 'operational_policy');
        $res = $query->execute()->fetchAll();
        return $res;
      break;
    }
  }

}
