<?php
/**
 * @file
 * Contains Drupal\wsib_merger\Plugin\QueueWorker\WsibMergerGetManual.php
 */

namespace Drupal\wsib_merger\Plugin\QueueWorker;

use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\node\Entity\Node;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;

/**
 * Provides save functionality for import.
 *
 * @QueueWorker(
 *   id = "wsib_merger_get_manual",
 *   title = @Translation("Manual Merger")
 * )
 */
class WsibMergerGetManual extends WsibMergerGetBase {}
