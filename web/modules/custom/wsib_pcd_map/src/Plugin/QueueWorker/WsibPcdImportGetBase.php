<?php

namespace Drupal\wsib_pcd_map\Plugin\QueueWorker;

use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\Core\Queue\QueueFactory;
use Drupal\Core\Queue\ReliableQueueInterface;
use Drupal\Core\Queue\QueueWorkerInterface;
use Drupal\Core\Queue\QueueWorkerManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides parse and load functionality for the translations import queue.
 */
abstract class WsibPcdImportGetBase extends QueueWorkerBase implements ContainerFactoryPluginInterface {
  /**
   * @var QueueFactory
   */
  protected $queueFactory;

  /**
   * @var QueueWorkerManagerInterface
   */
  protected $queueManager;

  /**
   * @var ReliableQueueInterface object
   */
  protected $queue;

  /**
   * {@inheritdoc}
   */
  public function __construct(QueueFactory $queue, QueueWorkerManagerInterface $queue_manager) {
    $this->queueFactory = $queue;
    $this->queueManager = $queue_manager;
    $this->queue = $this->queueFactory->get('wsib_pcd_import_save_manual', TRUE);
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
    if (isset($data->content['key']) && $data->content['key'] == 'tr_import' && isset($data->content['eid'])) {
      $key_import = $data->content['key'];
      $eid = $data->content['eid'];
      $node = \Drupal::entityTypeManager()->getStorage('node')->load($eid);
      $pc = $node->field_program_of_care->getValue();
      if (isset($pc) && !empty($pc)) {
        $item = new \stdClass();
        $item->content = [
          'key' => $key_import,
          'eid' => $eid,
          'pc' => $pc,
        ];
        $this->queue->createItem($item);
      }
    }
  }

}
