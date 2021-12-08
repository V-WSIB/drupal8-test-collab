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
 * Provides parse and load functionality for the Mapper queue.
 */
abstract class WsibPcdMapGetBase extends QueueWorkerBase implements ContainerFactoryPluginInterface {
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

  /**
   * {@inheritdoc}
   */
  public function processItem($data) {
    if (isset($data->content['key']) && $data->content['key'] == 'map' && isset($data->content['eid'])) {
      $key_import = $data->content['key'];
      $eid = $data->content['eid'];
      $node = \Drupal::entityTypeManager()->getStorage('node')->load($eid);
      $profession = $node->field_profession->getValue();
      $profession = reset($profession);
      if (!empty($profession['target_id'])) {
        $profession = $profession['target_id'];
        $programs = $this->mapProfession($profession);
      }
      if (isset($profession) && !empty($programs)) {
        $item = new \stdClass();
        $item->content = ['key' => $key_import, 'eid' => $eid, 'profession' => $profession, 'programs' => $programs];
        $this->queue->createItem($item);
      }
    }
  }

  /**
   * Helper function to map profession to the program of care.
   *
   * @param int $profession
   *   Id of the profession taxonomy.
   *
   * @return int $program
   *   Id of program of care matched taxonomy.
   */
  protected function mapProfession($profession) {
    $tids = NULL;
    switch ($profession) {
      case 206:
        $tids = [16, 261, 266, 21];
      break;
      // case 216:
      //   $tids = [16, 266, 21];
      // break;
      case 231:
        $tids = [16, 261, 266, 21];
      break;
      case 11:
        $tids = [16, 261, 266, 21];
      break;
      // case 246:
      //   $tids = [16, 261, 266, 21];
      // break;
      // case 221:
      //   $tids = [261];
      // break;
      // case 226:
      //   $tids = [261];
      // break;
      // case 241:
      //   $tids = [261];
      // break;
      // case 251:
      //   $tids = [261];
      // break;
      // case 256:
      //   $tids = [261];
      // break;
      // case 201:
      //   $tids = [271];
      // break;
      // case 211:
      //   $tids = [271];
      // break;
    }

    return $tids;
  }

}
