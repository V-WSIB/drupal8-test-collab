<?php

namespace Drupal\wsib_pcd_map\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Queue\QueueFactory;
use Drupal\Core\Queue\ReliableQueueInterface;
use Drupal\Core\Queue\QueueWorkerInterface;
use Drupal\Core\Queue\QueueWorkerManagerInterface;
use Drupal\Core\Queue\SuspendQueueException;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\Query\QueryFactory;

/**
 * Contains \Drupal\wsib_pcd_map\Form\WsibPcdMapForm.
 *    Provides interface for the import administration.
 */
class WsibPcdMapForm extends ConfigFormBase {
  /**
   * @var QueueFactory
   */
  protected $queueFactory;

  /**
   * @var QueueWorkerManagerInterface
   */
  protected $queueManager;

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
    return ['wsib_pcd_map.settings',];
  }

  /**
   * {@inheritdoc}.
   */
  public function getFormId() {
    return 'wsib_pcd_map_form';
  }

  /**
   * {@inheritdoc}.
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('wsib_pcd_map.settings');
    $form['actions']['#type'] = 'actions';
    $form['actions']['run_import'] = [
      '#type' => 'submit',
      '#value' => $this->t('Trigger PCD mapping'),
      '#button_type' => 'primary',
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // saving config
    $this->config('wsib_pcd_map.settings')
      ->save();
    $this->importDataQueuePopulate();
    parent::submitForm($form, $form_state);
  }

  /**
   * Helper function to populate Queue with data from file.
   *
   */
  protected function importDataQueuePopulate() {
    // get manual queue instance.
    $queue_manual = $this->queueFactory->get('wsib_pcd_map_get_manual', TRUE);
    $queue_manual->deleteQueue();
    // get manual save queue instance.
    $queue_save_manual = $this->queueFactory->get('wsib_pcd_map_save_manual', TRUE);
    $queue_save_manual->deleteQueue();
    $operations = [];
    $operations[] = ['\Drupal\wsib_pcd_map\Form\WsibPcdMapForm::getBatchOperation', ['getPcd',[]]];
    $operations[] = ['\Drupal\wsib_pcd_map\Form\WsibPcdMapForm::getBatchOperation', ['queueCreateItem', [$queue_manual, 'map',]]];
    // getting data.
    $operations[] = ['\Drupal\wsib_pcd_map\Form\WsibPcdMapForm::getBatchOperation', ['queueProcessItem', [$queue_manual, 'wsib_pcd_map_get_manual']]];
    // saving data.
    $operations[] = array('\Drupal\wsib_pcd_map\Form\WsibPcdMapForm::getBatchOperation', array('queueProcessItem', array($queue_save_manual, 'wsib_pcd_map_save_manual')));
    $batch = [
      'title' => $this->t('Wsib PCD Mapping Import'),
      'operations' => $operations,
      'label' => $this->t('Wsib PCD Mapping Import'),
      'finished' => NULL,
    ];
    batch_set($batch);
  }

  /**
   * Helper function to get batch operation.
   *
   * @param $callback_name.
   *    name of the callback function that needs to be called.
   *
   * @param array $arguments.
   *    array of arguments that needs to be passed to the callback function.
   */
  public static function getBatchOperation($callback_name, $arguments, &$context) {
    switch ($callback_name) {
      case 'getPcd':
        $data = self::$callback_name();
        if (isset($data)) {
          $context['results']['data']['pcds'] = $data;
        }
      break;
      case 'queueCreateItem':
        self::$callback_name($arguments[0], $arguments[1], $context);
      break;
      case 'queueProcessItem':
        self::$callback_name($arguments[0], $arguments[1], $context);
      break;
    }

  }

  /**
   * Helper function to get products and their bazaarvoice properties from the DB.
   *
   * @return array $res
   *    array of records fetch from the database.
   */
  public static function getPcd() {
    $query = \Drupal::entityQuery('node')
      ->condition('type', 'programs_of_care_provider')
      ->condition('field_profession', [206, 216, 231, 11, 246, 221, 226, 241, 251, 256, 201, 211], "IN");
    $eids = $query->execute();
    if (!empty($eids)) {
      return $eids;
    }
    return NULL;

  }

  /**
   * Helper function to manually process queued items.
   *
   * @param QueueFactory $queue
   *
   * @param str $queue_name
   *    name of the queue.
   */
  public static function queueProcessItem($queue, $queue_name, &$context) {
    $queue_worker = \Drupal::service('plugin.manager.queue_worker')->createInstance($queue_name);
    $limit = 1;
    if (empty($context['sandbox'])) {
      $context['sandbox']['progress'] = 0;
      $context['sandbox']['current'] = 0;
      $context['sandbox']['max'] = $queue->numberOfItems();
      $context['sandbox']['offset'] = 0;
    }
    else {
      $context['sandbox']['offset'] = $context['sandbox']['offset'] + $limit +1;
    }
    $off = min($context['sandbox']['offset'] + $limit, $context['sandbox']['max']-1);
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
          watchdog_exception('napoleon_pims', $e);
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
   *    QueueInterface object.
   *
   * @param str $key
   *    Key to identify part of the import.
   */
  protected static function queueCreateItem($queue, $key, $context) {
    if (!empty($context['results']['data']['pcds'])) {
      foreach ($context['results']['data']['pcds'] as $k => $d) {
        $item = new \stdClass();
        $item->content = ['key' => $key, 'eid' => $d,];
        $queue->createItem($item);
      }
    }
  }

}
