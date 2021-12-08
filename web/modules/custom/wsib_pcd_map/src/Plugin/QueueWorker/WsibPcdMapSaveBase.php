<?php

namespace Drupal\wsib_pcd_map\Plugin\QueueWorker;

use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;

/**
 * Provides Base functionality for the saving programs of directory mapping.
 */
abstract class WsibPcdMapSaveBase extends QueueWorkerBase implements ContainerFactoryPluginInterface {

  /**
   * @var EntityManagerInterface.
   */
  protected $entity_manager;

  /**
   * @var QueryFactory.
   */
  protected $entity_query;

  /**
   * {@inheritdoc}
   */
  public function __construct(EntityTypeManagerInterface $entity_manager, QueryFactory $entity_query) {
    $this->entity_manager = $entity_manager;
    $this->entity_query = $entity_query;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('entity.query')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function processItem($data) {
    $data = $data->content;
    if (isset($data['key'])) {
      $key = $data['key'];
      $eid = $data['eid'];
      if ($key == 'map') {
        $programs = $data['programs'];
        $this->processPrograms($programs, $eid);
      }
    }
  }

  /**
   * Helper function to process programs and assign them to a provider.
   *
   * @param array $programs
   *    array of programs tids that need to be added to the provider.
   *
   * @param int $eid
   *    entity id of the provider node.
   */
  protected function processPrograms($programs, $eid) {
    if (!empty($eid)) {
      $node = $this->entity_manager->getStorage('node')->load($eid);
      $values = [];
      // foreach ($programs as $pr) {
      //   $values[] = ['target_id' => $pr];
      // }
      $node->field_program_of_care->setValue($values);
      $node->moderation_state = 'published';
      $node->save();
      $tr_langs = $node->getTranslationLanguages();
      if (!empty($tr_langs)) {
        foreach ($tr_langs as $key => $lng) {
          $node_tr = $node->getTranslation($key);
          $node_tr->field_program_of_care->setValue($values);
          $node->moderation_state = 'published';
          $node_tr->save();
        }
      }
    }
  }

}
