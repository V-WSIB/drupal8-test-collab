<?php

namespace Drupal\wsib_open_data_import\Plugin\QueueWorker;

use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\Core\Queue\QueueFactory;
use Drupal\Core\Queue\QueueWorkerManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides read functionality for Open Data.
 */
abstract class OpenDataImportGetBase extends QueueWorkerBase implements ContainerFactoryPluginInterface {
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

  /**
   * {@inheritdoc}
   */
  public function __construct(QueueFactory $queue, QueueWorkerManagerInterface $queue_manager) {
    $this->queueFactory = $queue;
    $this->queueManager = $queue_manager;
    $this->queue = $this->queueFactory->get('wsib_open_data_import_save_manual', TRUE);
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $container->get('queue'),
      $container->get('plugin.manager.queue_worker')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function processItem($data) {
    $data = explode("\n", $data->content['info']);
    $header = array_shift($data);
    $header = $this->cleanIndex($header);
    $header = str_getcsv($header, ',', '"');

    foreach ($data as $key => $value) {
      if (!empty($value)) {
        $splitted = str_getcsv($value, ',', '"');
        $content[$key] = [];
        $content[$key]['subsite_context'] = 'Global';
        foreach ($splitted as $index => $column) {
          if (isset($content[$key][$header[$index]])) {
            $content[$key][$header[$index] . '_1'] = $column;
          }
          else {
            $content[$key][$header[$index]] = $column;
          }
        }
        $this->queue->createItem($content[$key]);
      }
    }
  }

  /**
   * Helper function to clean string.
   *
   * @param string $string
   *   Original string.
   *
   * @return string
   *   Cleaned string.
   */
  protected function cleanIndex($string) {
    // This function does the following string cleaning:
    // removes special characters,
    // replaces French accent characters by regular characters,
    // replaces spaces by underscore,
    // removes spaces at the end of line,
    // removes double underscore,
    // replaces character '#' by 'number'.
    setlocale(LC_ALL, "en_US.utf8");
    $string = iconv("utf-8", "ascii//TRANSLIT", $string);
    $string = str_replace(' ', '_', strtolower($string));
    $string = str_replace('_,', ',', $string);
    $string = str_replace('#', 'number', $string);
    $string = preg_replace('/[^A-Za-z0-9\_\,]/', '', $string);
    $string = str_replace('__', '_', $string);
    return $string;
  }

}
