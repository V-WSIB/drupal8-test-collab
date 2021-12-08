<?php

namespace Drupal\wsib_open_data_import\Form;

use Drupal\file\Entity\File;
use Drupal\Core\File\FileSystem;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Queue\QueueFactory;
use Drupal\Core\Queue\QueueWorkerManagerInterface;
use Drupal\Core\Queue\SuspendQueueException;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Csv;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Contains open data import form.
 */
class OpenDataImportForm extends ConfigFormBase {

  /**
   * Defines the queue factory.
   *
   * @var \Drupal\Core\Queue\QueueFactory
   */
  protected $queueFactory;

  /**
   * Provides an interface for a queue worker manager.
   *
   * @var \Drupal\Core\Queue\QueueWorkerManagerInterface
   */
  protected $queueManager;

  public static $queueManagerInstance;

  /**
   * Provides helpers to operate on files and stream wrappers.
   *
   * @var \Drupal\Core\File\FileSystem
   */
  protected $fileSystem;

  /**
   * {@inheritdoc}
   */
  public function __construct(QueueFactory $queue, QueueWorkerManagerInterface $queue_manager, FileSystem $file_system) {
    $this->queueFactory = $queue;
    $this->queueManager = $queue_manager;
    $this->fileSystem = $file_system;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('queue'),
      $container->get('plugin.manager.queue_worker'),
      $container->get('file_system')
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'wsib_open_data_import_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['help'] = [
      '#type' => 'markup',
      '#markup' => $this->t('Upload Open Data file.'),
    ];

    $form['file'] = [
      '#type' => 'managed_file',
      '#title' => $this->t('Open Data'),
      '#description' => $this->t('Upload a CSV file please.'),
      '#size' => 20,
      '#upload_location' => 'public://open_data',
      '#upload_validators' => [
        'file_validate_extensions' => ['csv xls xlsx'],
      ],
    ];

    $form['actions']['#type'] = 'actions';
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#name' => 'submit',
      '#value' => $this->t('Upload File'),
      '#button_type' => 'primary',
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $fid = reset($form_state->getValue('file', 0));
    if ($fid) {
      $file = $form['file']['#files'][$fid];
      $file_mime_type = $file->getMimeType();

      $file_uri = $file->getFileUri();
      $file_path = $this->fileSystem->realpath($file_uri);

      // If original file is not a CSV, convert it.
      if ($file_mime_type !== 'text/csv') {
        // Load original file.
        $spreadsheet = IOFactory::load($file_path);
        $loaded_sheet_names = $spreadsheet->getSheetNames();

        // Set CSV file path and URI.
        $file_uri = $form['file']['#upload_location'] . '/' . $loaded_sheet_names[0] . '.csv';
        $file_path = $this->fileSystem->realpath($file_uri);

        // Set PHPSpreadsheet settings and save file.
        $writer = new Csv($spreadsheet);
        $writer->setDelimiter('|');
        $writer->setEnclosure('');
        $writer->setLineEnding("\r\n");
        $writer->setSheetIndex(0);
        $writer->save($file_path);

        // Delete original file.
        $original_file = File::load($fid);
        $original_file->delete();

        // Load CSV file to be managed by Drupal.
        $file_content = file_get_contents($file_path);
        $file = file_save_data($file_content, $file_uri, FILE_EXISTS_REPLACE);
        $fid = $file->id();
      }

      $this->dataQueuePopulate($file_path, $fid);
    }

    parent::submitForm($form, $form_state);
  }

  /**
   * Helper function to populate Queue with data from CSV file.
   *
   * @param string $file_path
   *   Path of CSV file in the file system.
   * @param string $fid
   *   File ID.
   */
  protected function dataQueuePopulate($file_path, $fid) {
    // Get manual queue instance.
    $queue_get_manual = $this->queueFactory->get('wsib_open_data_import_get_manual', TRUE);
    $queue_get_manual->deleteQueue();
    // Get manual save queue instance.
    $queue_save_manual = $this->queueFactory->get('wsib_open_data_import_save_manual', TRUE);
    $queue_save_manual->deleteQueue();

    $operations = [];
    $operations[] = [
      '\Drupal\wsib_open_data_import\Form\OpenDataImportForm::getBatchOperation',
      [
        'queueCreateItem',
        [
          $queue_get_manual,
          $file_path,
          $fid,
        ],
      ],
    ];
    $operations[] = [
      '\Drupal\wsib_open_data_import\Form\OpenDataImportForm::queueProcessItem',
      [
        $queue_get_manual,
        'wsib_open_data_import_get_manual',
      ],
    ];
    $operations[] = [
      '\Drupal\wsib_open_data_import\Form\OpenDataImportForm::queueProcessItem',
      [
        $queue_save_manual,
        'wsib_open_data_import_save_manual',
      ],
    ];

    $batch = [
      'title' => $this->t('WSIB Open Data Import'),
      'operations' => $operations,
      'label' => $this->t('WSIB Open Data Import'),
      'finished' => NULL,
    ];
    batch_set($batch);
  }

  /**
   * Helper function to get batch operation.
   *
   * @param string $callback_name
   *   Name of the callback function that needs to be called.
   * @param array $arguments
   *   Array of arguments that needs to be passed to the callback function.
   * @param array $context
   *   Context of current queue processing.
   */
  public static function getBatchOperation($callback_name, array $arguments, array &$context) {
    switch ($callback_name) {
      case 'queueCreateItem':
        self::$callback_name($arguments[0], $arguments[1], $arguments[2]);
        break;

      case 'queueProcessItem':
        self::$callback_name($arguments[0], $arguments[1], $context);
        break;
    }

  }

  /**
   * Helper function to create queue item.
   *
   * @param object $queue
   *   QueueFactory object.
   * @param string $file_path
   *   Path of CSV file in the file system.
   * @param string $fid
   *   File ID.
   */
  protected static function queueCreateItem($queue, $file_path, $fid) {
    // Check if file exists and if it is readable.
    if (is_readable($file_path)) {
      $item = new \stdClass();
      $data = file_get_contents($file_path);

      // Create queue item.
      $item->content = ['info' => $data];
      $queue->createItem($item);

      // Load file entity and delete it from file system.
      $file = File::load($fid);
      $file->delete();
    }
    else {
      $messenger = \Drupal::service('messenger');
      $messenger->addMessage('Error while reading file. Import failed.', 'error', FALSE);
    }
  }

  /**
   * Helper function to manually process queued items.
   *
   * @param object $queue
   *   QueueFactory object.
   * @param string $queue_name
   *   Name of the queue.
   * @param array $context
   *   Context of current queue processing.
   */
  public static function queueProcessItem($queue, $queue_name, array &$context) {
    $queue_worker = \Drupal::service('plugin.manager.queue_worker')->createInstance($queue_name);
    $limit = 1;
    \Drupal::state()->set('unpublish', 'true');
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
          watchdog_exception('open_data_import', $e);
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

}
