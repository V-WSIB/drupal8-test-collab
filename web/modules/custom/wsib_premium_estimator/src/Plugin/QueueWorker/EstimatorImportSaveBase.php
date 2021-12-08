<?php

namespace Drupal\wsib_premium_estimator\Plugin\QueueWorker;

use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\EntityFieldManager;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\Core\Entity\Query\Sql\Query;
use Drupal\Core\Messenger\Messenger;
use Drupal\node\Entity\Node;
use Drupal\taxonomy\Entity\Term;

/**
 * Provides parsing and saving functionality for Premium Estimator data.
 */
abstract class EstimatorImportSaveBase extends QueueWorkerBase implements ContainerFactoryPluginInterface {

  /**
   * Provides an interface for entity type managers.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityManager;

  /**
   * Returns the entity query object for this entity type.
   *
   * @var \Drupal\Core\Entity\Query\QueryFactory
   */
  protected $entityQuery;

  /**
   * Manages the discovery of entity fields.
   *
   * @var \Drupal\Core\Entity\EntityFieldManager
   */
  protected $entityField;

  /**
   * Stores runtime messages sent out to individual users on the page.
   *
   * @var \Drupal\Core\Messenger\Messenger
   */
  protected $messenger;

  /**
   * {@inheritdoc}
   */
  public function __construct(EntityTypeManagerInterface $entityManager, QueryFactory $entityQuery, EntityFieldManager $entityField, Messenger $messenger) {
    $this->entity_manager = $entityManager;
    $this->entity_query = $entityQuery;
    $this->entity_field = $entityField;
    $this->messenger = $messenger;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('entity.query'),
      $container->get('entity_field.manager'),
      $container->get('messenger')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function processItem($data) {
    if (isset($data)) {
      $type = 'estimator';
      // Column from CSV and content type field to be compared
      // to check if node already exists.
      $columns = [$data['cu_code'], $data['year']];
      $fields = ['field_code', 'field_year'];
      // Query if node exists by ID field.
      $nid = $this->getNodeId($columns, $fields, $type);
      if (isset($nid)) {
        $this->updateNode($nid, $data);
      }
      else {
        $this->createNode($data, $type);
      }
    }
  }

  /**
   * Helper function to update existing release.
   *
   * @param int $nid
   *   Node ID of the node to be updated.
   * @param object $data
   *   Given data to be updated.
   */
  protected function updateNode($nid, $data) {
    $node = $this->entity_manager->getStorage('node')->load($nid);
    $mappings = $this->getMappings();

    $values = [];
    // Map direct values.
    if (!empty($mappings['direct'])) {
      foreach ($mappings['direct'] as $field_name => $data_name) {
        $node->{$field_name}->value = $data[$data_name];
        $values[$field_name] = $data[$data_name];
      }
    }

    // Map taxonomy values.
    if (!empty($mappings['taxonomies'])) {
      foreach ($mappings['taxonomies'] as $field_name => $data_structure) {
        $info = [];
        foreach ($data_structure['field'] as $key => $value) {
          if (is_array($value)) {
            $info[$key] = $this->buildEntityReferenceField($value, $data);
          }
          else {
            $info[$key] = trim($data[$value]);
          }
        }
        $result = $this->setTaxonomyTerm($info, $data_structure['taxonomy'], $data_structure['check_field']);
        $node->{$field_name}->setValue($result);
        $values[$field_name] = $result;
      }
    }

    // // Map content entity references.
    if (!empty($mappings['content'])) {
      foreach ($mappings['content'] as $field_name => $data_structure) {
        $info = [];
        foreach ($data_structure['field'] as $key => $value) {
          if (is_array($value)) {
            $info[$key] = $this->buildEntityReferenceField($value, $data);
          }
          else {
            $info[$key] = trim($data[$value]);
          }
        }
        $translation_info = NULL;
        if (isset($data_structure['translation']) && !empty($data_structure)) {
          $translation_info = [];
          foreach ($data_structure['translation'] as $language => $translated_fields) {
            foreach ($translated_fields['field'] as $field => $value) {
              $translation_info[$language]['field'][$field] = trim($data[$value]);
            }
          }
        }
        $result = $this->setContentReference($info, $data_structure['type'], $data_structure['check_field'], $translation_info);
        $node->{$field_name}->setValue($result);
        $values[$field_name] = $result;
      }
    }

    // Use any specified callbacks.
    if (!empty($mappings['callbacks'])) {
      foreach ($mappings['callbacks'] as $field_name => $callback) {
        $result = $this->{$callback['function']}($data[$callback['field']]);
        $node->{$field_name}->value = $result;
        $values[$field_name] = $result;
      }
    }

    $this->setNodeModeration(TRUE, $node);
    $node->save();

    // Map translations.
    if (!empty($mappings['translation'])) {
      foreach ($mappings['translation'] as $language => $translated_data) {
        $translation_info = [];
        foreach ($translated_data['field'] as $field => $value) {
          $translation_info['field'][$field] = trim($data[$value]);
        }
        if ($node->hasTranslation($language)) {
          $this->updateTranslation($node, $language, $translation_info);
        }
        else {
          $translation = $this->createTranslation($node, $language, $values, $translation_info);
          if (!empty($translation)) {
            $this->setNodeModeration(TRUE, $translation);
            $translation->save();
          }
        }
      }
    }
  }

  /**
   * Helper function to create new node.
   *
   * @param object $data
   *   Given data from CSV file.
   * @param string $type
   *   Content type.
   */
  protected function createNode($data, $type) {
    $initial_values = [
      'nid' => NULL,
      'type' => $type,
      'uid' => 1,
      'langcode' => 'en',
    ];

    $values = [];
    $mappings = $this->getMappings();

    // Map direct values.
    if (!empty($mappings['direct'])) {
      foreach ($mappings['direct'] as $field_name => $data_name) {
        $values[$field_name] = $data[$data_name];
      }
    }

    // Map taxonomy values.
    if (!empty($mappings['taxonomies'])) {
      foreach ($mappings['taxonomies'] as $field_name => $data_structure) {
        $info = [];
        foreach ($data_structure['field'] as $key => $value) {
          if (is_array($value)) {
            $info[$key] = $this->buildEntityReferenceField($value, $data);
          }
          else {
            $info[$key] = trim($data[$value]);
          }
        }
        $values[$field_name] = $this->setTaxonomyTerm($info, $data_structure['taxonomy'], $data_structure['check_field']);
      }
    }

    // Map content entity references.
    if (!empty($mappings['content'])) {
      foreach ($mappings['content'] as $field_name => $data_structure) {
        $info = [];
        foreach ($data_structure['field'] as $key => $value) {
          if (is_array($value)) {
            $info[$key] = $this->buildEntityReferenceField($value, $data);
          }
          else {
            $info[$key] = trim($data[$value]);
          }
        }
        $translation_info = NULL;
        if (isset($data_structure['translation']) && !empty($data_structure)) {
          $translation_info = [];
          foreach ($data_structure['translation'] as $language => $translated_fields) {
            foreach ($translated_fields['field'] as $field => $value) {
              $translation_info[$language]['field'][$field] = trim($data[$value]);
            }
          }
        }
        $values[$field_name] = $this->setContentReference($info, $data_structure['type'], $data_structure['check_field'], $translation_info);
      }
    }

    // Use any specified callbacks.
    if (!empty($mappings['callbacks'])) {
      foreach ($mappings['callbacks'] as $field_name => $callback) {
        $values[$field_name] = $this->{$callback['function']}($data[$callback['field']]);
      }
    }

    $node = $this->entity_manager->getStorage('node')->create(array_merge($initial_values, $values));
    $node->save();

    $this->setNodeModeration(TRUE, $node);
    $node->save();

    // Map translations.
    if (!empty($mappings['translation'])) {
      foreach ($mappings['translation'] as $language => $translated_data) {
        $translation_info = [];
        foreach ($translated_data['field'] as $field => $value) {
          $translation_info['field'][$field] = trim($data[$value]);
        }
        $translation = $this->createTranslation($node, $language, $values, $translation_info);
        if (!empty($translation)) {
          $this->setNodeModeration(TRUE, $translation);
          $translation->save();
        }
      }
    }
  }

  /**
   * Helper function to build entity reference field format to be referenced.
   *
   * @param array $field
   *   Array with entity reference element fields.
   * @param array $data
   *   Given data from CSV file.
   *
   * @return array
   *   Array containing data for referenced item.
   */
  protected function buildEntityReferenceField(array $field, array $data) {
    $info = [];
    if (!empty($field)) {
      foreach ($field as $key => $value) {
        if ($key === 'field') {
          foreach ($value as $index => $item) {
            if (is_array($item)) {
              $info[$key][$index] = $this->buildEntityReferenceField($item, $data);
            }
            else {
              $info[$key][$index] = trim($data[$item]);
            }
          }
        }
        else {
          $info[$key] = $value;
        }
      }
    }
    return $info;
  }

  /**
   * Helper function to map provided data to Drupal fields.
   *
   * @return array
   *   Arrays with mapping between CSV and Drupal content type fields.
   */
  protected function getMappings() {
    // Map direct values.
    // Drupal content type field machine name => Associative array index.
    $mappings['direct'] = [
      'title' => 'title_in_english',
      'field_code' => 'cu_code',
      'field_year' => 'year',
    ];

    // Map content entity references using array structure.
    $mappings['content'] = [
      'field_rate_group' => [
        'field' => [
          'title' => 'rate_group_description_in_english',
          'field_code' => 'rate_group',
          'field_premium_rate' => 'premium_rate',
          'field_year' => 'year',
          'field_sector' => [
            'field' => [
              'name' => 'sector',
              'field_code' => 'sector_id',
            ],
            'taxonomy' => 'sector',
            'check_field' => 'field_code',
          ],
        ],
        'type' => 'rate_group',
        'check_field' => [
          'field_code',
          'field_year',
        ],
        'translation' => [
          'fr' => [
            'field' => [
              'title' => 'rate_group_description_in_french',
            ],
          ],
        ],
      ],
    ];

    $mappings['translation'] = [
      'fr' => [
        'field' => [
          'title' => 'title_in_french',
        ],
      ],
    ];

    return $mappings;
  }

  /**
   * Helper function to set moderation state for a node.
   *
   * @param string $is_active
   *   Status of node.
   * @param object $node
   *   Node object to be edited and saved.
   */
  protected function setNodeModeration($is_active, $node) {
    if ($is_active === TRUE) {
      $node->set('moderation_state', 'published');
      $node->setPublished(TRUE);
    }
    else {
      $node->set('moderation_state', 'unpublished');
      $node->setPublished(FALSE);
    }
  }

  /**
   * Helper function to set a referenced content to a node.
   *
   * @param array $value
   *   Content of node to be referenced.
   * @param string $type
   *   Content type of node to be referenced.
   * @param array $check_field
   *   Array with fields to be used to check if node exists.
   * @param array $translation_info
   *   Array with translation languages and fields to be translated.
   *
   * @return int
   *   Id of content to be referenced.
   */
  protected function setContentReference(array $value, $type, array $check_field, array $translation_info) {
    if ($value) {
      $nid = $this->mapContent($value, $type, $check_field, $translation_info);
    }
    else {
      $nid = NULL;
    }
    return $nid;
  }

  /**
   * Helper function to map a referenced node to its id.
   *
   * @param array $node_data
   *   Node data from CSV file.
   * @param string $content_type
   *   Content type of node to be referenced.
   * @param array $check_field
   *   Array with fields to be used to check if node exists.
   * @param array $translation_info
   *   Array with translation languages and fields to be translated.
   *
   * @return int
   *   Mapped referenced node id.
   */
  protected function mapContent(array $node_data, $content_type, array $check_field, array $translation_info) {
    $properties = [];
    if (is_array($check_field)) {
      foreach ($check_field as $field) {
        $properties[$field] = $node_data[$field];
      }
    }
    else {
      $properties[$check_field] = $node_data[$check_field];
    }
    $node = $this->entity_manager->getStorage('node')->loadByProperties($properties);
    if (!empty($node) && is_array($node)) {
      $node = reset($node);
      $this->updateContentReference($node, $node_data, $translation_info);
      return $node->id();
    }
    else {
      $nid = $this->createContentReference($node_data, $content_type, $translation_info);
      if (isset($nid)) {
        return $nid;
      }
    }
  }

  /**
   * Helper function to create content entity reference.
   *
   * @param array $node_data
   *   Node data from CSV file.
   * @param string $content_type
   *   Content type of the node.
   * @param array $translation_info
   *   Array with translation languages and fields to be translated.
   *
   * @return string
   *   Mapped referenced node id to be set to node.
   */
  protected function createContentReference(array $node_data, $content_type, array $translation_info) {
    $initial_values = [
      'vid' => NULL,
      'uid' => 1,
      'langcode' => 'en',
      'type' => $content_type,
    ];
    $values = [];

    $fields = $this->entity_field->getFieldDefinitions('node', $content_type);

    foreach ($node_data as $key => $value) {
      if (is_array($value)) {
        // Check if field is an entity reference.
        if ($fields[$key]->getType() === 'entity_reference') {
          if ($fields[$key]->getSetting('handler') === 'default:taxonomy_term') {
            $referenced_vocabulary = reset($fields[$key]->getSetting('handler_settings')['target_bundles']);
            $tid = $this->setTaxonomyTerm($value['field'], $referenced_vocabulary, $value['check_field']);
            $values[$key] = $tid;
          }
          elseif ($fields[$key]->getSetting('handler') === 'default:node') {
            $referenced_type = reset($fields[$key]->getSetting('handler_settings')['target_bundles']);
            $nid = $this->setContentReference($value['field'], $referenced_type, $value['check_field']);
            $values[$key] = $nid;
          }
        }
      }
      else {
        $values[$key] = $value;
      }
    }

    $node = $this->entity_manager->getStorage('node')->create(array_merge($initial_values, $values));
    $node->save();
    $this->setNodeModeration(TRUE, $node);
    $node->save();

    if (!empty($translation_info)) {
      foreach ($translation_info as $language => $translated_data) {
        $translation = $this->createTranslation($node, $language, $values, $translated_data);
        if (!empty($translation)) {
          $this->setNodeModeration(TRUE, $translation);
          $translation->save();
        }
      }
    }

    return $node->id();
  }

  /**
   * Helper function to update referenced content if necessary.
   *
   * @param \Drupal\node\Entity\Node $node
   *   Referenced content.
   * @param string $node_data
   *   Data to be updated on referenced node.
   * @param array $translation_info
   *   Array with translation languages and fields to be translated.
   */
  protected function updateContentReference(Node $node, $node_data, array $translation_info) {
    $fields = $this->entity_field->getFieldDefinitions('node', $node->bundle());
    foreach ($node_data as $key => $value) {
      // Check if field is an entity reference.
      if (is_array($value)) {
        if ($fields[$key]->getType() === 'entity_reference') {
          if ($fields[$key]->getSetting('handler') === 'default:taxonomy_term') {
            $referenced_term = $this->entity_manager->getStorage('taxonomy_term')->load($node->{$key}->target_id);
            if ((empty($referenced_term) && !empty($value['field'][$value['check_field']])) || $referenced_term->{$value['check_field']}->value !== $value['field'][$value['check_field']]) {
              $referenced_vocabulary = reset($node->getFieldDefinition($key)->getSetting('handler_settings')['target_bundles']);
              $tid = $this->setTaxonomyTerm($value['field'], $referenced_vocabulary, $value['check_field']);
              $node->{$key}->setValue($tid);
              $node->save();
            }
          }
          if ($fields[$key]->getSetting('handler') === 'default:node') {
            $referenced_node = $this->entity_manager->getStorage('node')->load($node->{$key}->target_id);
            foreach (array_values($value['check_field']) as $item) {
              if ((empty($referenced_node) && !empty($value['field'][$item])) || $referenced_node->{$item}->value !== $value['field'][$item]) {
                $referenced_type = reset($node->getFieldDefinition($key)->getSetting('handler_settings')['target_bundles']);
                $nid = $this->setContentReference($value['field'], $referenced_type, $value['check_field']);
                $node->{$key}->setValue($nid);
                $node->save();
              }
            }
          }
        }
      }
      else {
        if ($node->{$key}->value !== $value) {
          $node->{$key}->setValue($value);
          $node->save();
        }
      }
    }

    if (!empty($translation_info)) {
      foreach ($translation_info as $language => $translated_data) {
        if ($node->hasTranslation($language)) {
          $this->updateTranslation($node, $language, $translated_data);
        }
        else {
          $translation = $this->createTranslation($node, $language, $node_data, $translated_data);
          if (!empty($translation)) {
            $this->setNodeModeration(TRUE, $translation);
            $translation->save();
          }
        }
      }
    }
  }

  /**
   * Helper function to create translation and set translated values.
   *
   * @param \Drupal\node\Entity\Node $entity
   *   Entity to be translated.
   * @param string $language
   *   Language of new translation.
   * @param array $values
   *   Array with original entity values.
   * @param array $translated_data
   *   Array with translated values to override original ones.
   *
   * @return \Drupal\node\Entity\Node
   *   Translated entity.
   */
  protected function createTranslation(Node $entity, $language, array $values, array $translated_data) {
    $translated_values = $values;
    if (isset($translated_data['field']) && !empty($translated_data['field'])) {
      foreach ($translated_data['field'] as $key => $value) {
        if ($entity->getFieldDefinition($key)->isRequired() && empty($value)) {
          $message = 'Execution failed. Field "' . $key . '" missing for translation of "' . $values['title'] . '".';
          $this->messenger->addMessage($message, 'error', FALSE);
          $this->messenger->deleteByType('status');
          return NULL;
        }
        else {
          $translated_values[$key] = $value;
        }
      }
    }
    $translation = $entity->addTranslation($language, $translated_values);
    $translation->save();
    return $translation;
  }

  /**
   * Helper function to update translation.
   *
   * @param \Drupal\node\Entity\Node $entity
   *   Entity which translation will be updated.
   * @param string $language
   *   Language of new translation.
   * @param array $data
   *   Array with values to be updated on current translation.
   */
  protected function updateTranslation(Node $entity, $language, array $data) {
    $translation = $entity->getTranslation($language);
    if (isset($data['field']) && !empty($data['field'])) {
      foreach ($data['field'] as $key => $value) {
        if ($translation->{$key}->value !== $value) {
          $translation->{$key}->setValue($value);
          $translation->save();
        }
      }
    }
  }

  /**
   * Helper function to set taxonomy term to node.
   *
   * @param array $value
   *   Term or potential term information.
   * @param string $vocabulary
   *   Name of the taxonomy tree that needs to be loaded.
   * @param string $check_field
   *   Name of field to be used to compare referenced term.
   *
   * @return array
   *   Mapped term(s) to be set to node.
   */
  protected function setTaxonomyTerm(array $value, $vocabulary, $check_field) {
    if ($value) {
      $term_id = $this->mapSearchableTerms($value, $vocabulary, $check_field);
    }
    else {
      $term_id = NULL;
    }
    return $term_id;
  }

  /**
   * Helper function to map searchable taxonomy terms to their tids.
   *
   * @param array $term_data
   *   Term code or potential term information.
   * @param string $taxonomy_tree
   *   Name of the taxonomy tree that needs to be loaded.
   * @param string $check_field
   *   Name of field to be used to compare referenced term.
   *
   * @return string
   *   Mapped term id.
   */
  protected function mapSearchableTerms(array $term_data, $taxonomy_tree, $check_field) {
    $taxonomy = $this->entity_manager->getStorage('taxonomy_term')->loadTree($taxonomy_tree);
    if (!empty($taxonomy) && is_array($taxonomy)) {
      foreach ($taxonomy as $item) {
        $term = $this->entity_manager->getStorage('taxonomy_term')->load($item->tid);
        if ($term->{$check_field}->value === $term_data[$check_field]) {
          $this->updateTaxonomy($term, $term_data);
          return $term->id();
        }
      }
      // If here it means that did not find any matching taxonomy.
      $tid = $this->createSearchableTaxonomy($term_data, $taxonomy_tree);
      if (isset($tid)) {
        return $tid;
      }
    }
    else {
      $tid = $this->createSearchableTaxonomy($term_data, $taxonomy_tree);
      if (isset($tid)) {
        return $tid;
      }
    }
  }

  /**
   * Helper function to create new taxonomy term.
   *
   * @param array $term_data
   *   Term or potential term information.
   * @param string $taxonomy_tree
   *   Name of the taxonomy tree that needs to be loaded.
   *
   * @return string
   *   Mapped term id.
   */
  protected function createSearchableTaxonomy(array $term_data, $taxonomy_tree) {
    $values = [];
    $values['vid'] = $taxonomy_tree;
    $fields = $this->entity_field->getFieldDefinitions('taxonomy_term', $taxonomy_tree);

    foreach ($term_data as $key => $value) {
      if (is_array($value)) {
        // Check if field is an entity reference to a taxonomy term.
        if ($fields[$key]->getType() === 'entity_reference' && $fields[$key]->getSetting('handler') === 'default:taxonomy_term') {
          $referenced_vocabulary = reset($fields[$key]->getSetting('handler_settings')['target_bundles']);
          $tid = $this->setTaxonomyTerm($value['field'], $referenced_vocabulary, $value['check_field']);
          $values[$key] = $tid;
        }
      }
      else {
        $values[$key] = $value;
      }
    }

    $term = $this->entity_manager->getStorage('taxonomy_term')->create($values);
    $term->save();
    return $term->id();
  }

  /**
   * Helper function to update referenced taxonomy term if necessary.
   *
   * @param \Drupal\taxonomy\Entity\Term $term
   *   Referenced taxonomy term.
   * @param array $term_data
   *   Data from CSV file to be updated on taxonomy term.
   */
  protected function updateTaxonomy(Term $term, array $term_data) {
    foreach ($term_data as $key => $value) {
      // Check if field is an entity reference.
      if (is_array($value)) {
        $referenced_term = $this->entity_manager->getStorage('taxonomy_term')->load($term->{$key}->target_id);
        if ($referenced_term->{$value['check_field']}->value !== $value['field'][$value['check_field']]) {
          $referenced_vocabulary = reset($term->getFieldDefinition($key)->getSetting('handler_settings')['target_bundles']);
          $tid = $this->setTaxonomyTerm($value['field'], $referenced_vocabulary, $value['check_field']);
          $term->{$key}->setValue($tid);
          $term->save();
        }
      }
      else {
        if ($term->{$key}->value !== $value) {
          $term->{$key}->setValue($value);
          $term->save();
        }
      }
    }
  }

  /**
   * Helper function to get array with matchins node(s) id(s)
   *
   * @param array $values
   *   Array of values from the feed.
   * @param array $comp_fields
   *   Array of fields to be compared with $value.
   * @param string $type
   *   Machine name of the content type.
   *
   * @return array
   *   Array of node ids if they exist - NULL otherwise.
   */
  protected function getNodeId(array $values, array $comp_fields, $type) {
    $connection = \Drupal::database();
    $query = $connection->select('node', 'n');
    $query->fields('n', ['nid']);
    foreach ($comp_fields as $key => $field) {
      $query->leftJoin('node__' . $field, 'cid' . $key, 'cid' . $key . '.entity_id = n.nid');
      $query->condition('cid' . $key . '.' . $field . '_value', $values[$key]);
    }
    $query->condition('type', $type);
    $res = $query->execute()->fetchAll();
    $nid = reset($res);
    if (!empty($nid)) {
      return $nid->nid;
    }
    else {
      return NULL;
    }
  }

  /**
   * Helper function to unpublish nodes older than a specified time.
   *
   * @param string $type
   *   Machine name of the content type of the nodes to be unpublished.
   * @param string $time
   *   Edition time to be compared.
   */
  protected function unpublishOldNodes($type, $time) {
    $nodes = $this->getOldNodes($type, $time);
    if (!empty($nodes)) {
      foreach ($nodes as $node) {
        $this->unpublishNode($node);
      }
    }
  }

  /**
   * Helper function to unpublish a node.
   *
   * @param string $nid
   *   ID of the node to be unpublished.
   */
  protected function unpublishNode($nid) {
    $node = $this->entity_manager->getStorage('node')->load($nid);
    if ($node->status->value == 1) {
      $this->setNodeModeration(FALSE, $node);
      $node->save();
    }
  }

  /**
   * Helper function to get all nodes of a specific content type.
   *
   * @param string $type
   *   Machine name of the content type.
   * @param string $time
   *   Edition time to be compared.
   *
   * @return array
   *   Array of node IDs if they exist - NULL otherwise.
   */
  protected function getOldNodes($type, $time) {
    $query = $this->entity_query
      ->get('node')
      ->condition('type', $type)
      ->condition('changed', strtotime($time), '<=');
    $nid = $this->executeQuery($query);
    return $nid;
  }

  /**
   * Helper function to execute a query and return result.
   *
   * @param \Drupal\Core\Entity\Query\Sql\Query $query
   *   Entity query object to be executed.
   *
   * @return array
   *   Array of node IDs if they exist - NULL otherwise.
   */
  protected function executeQuery(Query $query) {
    $entity_ids = $query->execute();
    $nid = NULL;
    if (!empty($entity_ids)) {
      $nid = $entity_ids;
    }
    return $nid;
  }

}
