<?php

namespace Drupal\wsib_pcd_map\Plugin\QueueWorker;

use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\wsib_pcd_map\Plugin\QueueWorker\WsibPcdMapSaveBase;

/**
 * Provides save functionality for content.
 *
 * @QueueWorker(
 *   id = "wsib_pcd_map_save_manual",
 *   title = @Translation("Manually Save Programs Mapping Data")
 * )
 */
class WsibPcdMapSaveManual extends WsibPcdMapSaveBase {}
