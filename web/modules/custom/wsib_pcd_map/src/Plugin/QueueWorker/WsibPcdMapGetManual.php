<?php

namespace Drupal\wsib_pcd_map\Plugin\QueueWorker;

use Drupal\wsib_pcd_map\Plugin\QueueWorker\WsibPcdMapGetBase;
use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\Core\Queue\QueueFactory;
use Drupal\Core\Queue\ReliableQueueInterface;
use Drupal\Core\Queue\QueueWorkerInterface;
use Drupal\Core\Queue\QueueWorkerManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;


/**
 * Provides Base parsing functionality.
 *
 * @QueueWorker(
 *   id = "wsib_pcd_map_get_manual",
 *   title = @Translation("Parse PCD Manually")
 * )
 */
class WsibPcdMapGetManual extends WsibPcdMapGetBase {

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
    $this->queue = $this->queueFactory->get('wsib_pcd_map_save_manual', TRUE);

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
}
