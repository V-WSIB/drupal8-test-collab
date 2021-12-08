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
abstract class WsibPcdImportSaveBase extends QueueWorkerBase implements ContainerFactoryPluginInterface {

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
      if ($key == 'tr_import') {
        $pc = $data['pc'];
        $this->processPrograms($pc, $eid);
      }
    }
  }

  /**
   * Helper function to process programs translations.
   *
   * @param array $pc
   *   Array of programs tids that need to be translated.
   *
   * @param int $eid
   *   Entity id of the provider node.
   */
  protected function processPrograms($pc, $eid) {
    if (!empty($eid)) {
      $node = $this->entity_manager->getStorage('node')->load($eid);
      $tr_langs = $node->getTranslationLanguages();
      if (!empty($tr_langs)) {
        foreach ($tr_langs as $key => $lng) {
          if ($kety !== 'en') {
            $node_tr = $node->getTranslation($key);
            $node_tr->field_program_of_care->setValue($pc);
            $node_tr->moderation_state = 'published';
            $node_tr->save();
          }
        }
      }
    }
  }

}
