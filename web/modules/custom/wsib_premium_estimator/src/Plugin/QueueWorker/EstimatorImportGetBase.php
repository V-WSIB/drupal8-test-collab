<?php

namespace Drupal\wsib_premium_estimator\Plugin\QueueWorker;

use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\Core\Queue\QueueFactory;
use Drupal\Core\Queue\QueueWorkerManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides read functionality for the CSV file of Premium Estimator data.
 */
abstract class EstimatorImportGetBase extends QueueWorkerBase implements ContainerFactoryPluginInterface {
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
    $this->queue = $this->queueFactory->get('wsib_premium_estimator_import_save_data_manual', TRUE);
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
    $estimators = preg_split('/$\R?^/m', $data->content['info']);
    $header = array_shift($estimators);
    $header = $this->cleanIndex($header);
    $header = explode('|', $header);

    foreach ($estimators as $key => $estimator) {
      $splitted = explode('|', $estimator);
      $estimators[$key] = [];
      foreach ($splitted as $index => $column) {
        $estimators[$key][$header[$index]] = $column;
      }
      $this->queue->createItem($estimators[$key]);
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
    // It converts a string to lowercase, removes space at the end,
    // replaces all spaces with underscore, and removes special characters.
    $string = str_replace(' ', '_', strtolower($string));
    $string = str_replace('_|', '|', $string);
    return preg_replace('/[^A-Za-z0-9\_\|]/', '', $string);
  }

}
