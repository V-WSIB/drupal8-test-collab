<?php
/**
 * @file
 * Contains Drupal\wsib_merger\Plugin\QueueWorker\WsibMergerGetBase.php
 */

namespace Drupal\wsib_merger\Plugin\QueueWorker;

use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;

/**
 * Provides Base parsing functionality for merger.
 */
abstract class WsibMergerGetBase extends QueueWorkerBase implements ContainerFactoryPluginInterface {
 /**
   * @var EntityManagerInterface.
   */
  protected $entityManager;

  /**
   * @var QueryFactory.
   */
  protected $entityQuery;

  /**
   * {@inheritdoc}
   */
  public function __construct(EntityTypeManagerInterface $entity_manager, QueryFactory $entity_query) {
    $this->entityManager = $entity_manager;
    $this->entityQuery = $entity_query;
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
    $import_key = $data->content['key'];
    $data = $data->content['info'];
    if (isset($data->nid)) {
      $this->merge($data->nid, 'en');
      $this->merge($data->nid, 'fr');
    }
  }

  /**
   * Helper function to merge fields.
   *
   * @param int $nid
   *    Node id.
   *
   * @param string $language
   *    Language code.
   */
  protected function merge($nid, $language) {
    $node_or = $this->entityManager->getStorage('node')->load($nid);
    if (isset($node_or) && $node_or->hasTranslation($language)) {
      $node = $node_or->getTranslation($language);
    }
    elseif (!$node_or->hasTranslation($language) && $language == 'fr') {
      return;
    }
    if (is_object($node)) {
      $value = '';
      $field_names = ['field_policy' => ['en' => '', 'fr' => '',],
                      'field_purpose' => ['en' => 'Purpose', 'fr' => 'But',],
                      'field_guidelines' => ['en' => '', 'fr' => '',],
                      'field_document_history' => ['en' => 'Document History', 'fr' => 'Historique du document',],
                      'field_references' => ['en' => 'References', 'fr' => 'Références',],
                      'field_legislative_authority' => ['en' => 'Legislative Authority', 'fr' => '',],
                      'field_minute' => ['en' => 'Minute', 'fr' => 'Procès-verbal',],
                      'field_appendix' => ['en' => 'Appendix', 'fr' => 'Annexe',],
                    ];
      foreach ($field_names as $field => $labels) {
        if (isset($node->{$field})) {
          $val = $node->{$field}->getValue();
          $is_empty = TRUE;
          $val_part = '';
          foreach ($val as $v) {
            if (!empty($v['value'])) {
              $val_part .= $v['value'];
              $is_empty = FALSE;
            }
          }
          if (!$is_empty && isset($field_names[$field][$language]) && !empty($field_names[$field][$language])) {
            $val_part = '<h3>' . $field_names[$field][$language] . '</h3>' . $val_part;
          }
          $value .= $val_part;
        }
      }
      $node->field_policy_content->setValue(['value' => $value, 'format' => 'full_html']);
      $node->save();
      if (isset($node_or)) {
        $node_or->save();
      }
    }
  }

}
