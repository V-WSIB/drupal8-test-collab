<?php

namespace Drupal\wsib_open_data_import\Plugin\QueueWorker;

use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Entity\EntityFieldManager;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\file\Entity\File;
use Drupal\Core\File\FileSystem;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\Core\Entity\Query\Sql\Query;
use Drupal\media\Entity\Media;
use Drupal\Core\Messenger\Messenger;
use Drupal\node\Entity\Node;
use Drupal\taxonomy\Entity\Term;

/**
 * Provides parsing and saving functionality for Open Data.
 */
abstract class OpenDataImportSaveBase extends QueueWorkerBase implements ContainerFactoryPluginInterface {

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
   * Provides helpers to operate on files and stream wrappers.
   *
   * @var \Drupal\Core\File\FileSystem
   */
  protected $fileSystem;

  /**
   * {@inheritdoc}
   */
  public function __construct(EntityTypeManagerInterface $entityManager, QueryFactory $entityQuery, EntityFieldManager $entityField, Messenger $messenger, FileSystem $fileSystem) {
    $this->entity_manager = $entityManager;
    $this->entity_query = $entityQuery;
    $this->entity_field = $entityField;
    $this->messenger = $messenger;
    $this->fileSystem = $fileSystem;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('entity.query'),
      $container->get('entity_field.manager'),
      $container->get('messenger'),
      $container->get('file_system')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function processItem($data) {
    if (isset($data)) {
      $type = 'open_data';
      // Column from CSV and content type field to be compared
      // to check if node already exists.
      $column = $data['public_title'];
      $field = 'title';
      $time = '-30 seconds';
      $unpublish = \Drupal::state()->get('unpublish');
      if ($unpublish === 'true') {
        $this->unpublishOldNodes($type, $time);
      }
      // Query if node exists by ID field.
      $nid = $this->getNodeId($column, $field, $type);
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

    // Map date values.
    if (!empty($mappings['date'])) {
      foreach ($mappings['date'] as $field_name => $data_name) {
        if (is_array($data_name)) {
          $start = NULL;
          $end = NULL;
          if (isset($data[$data_name['start']]) && !empty($data[$data_name['start']])) {
            $start = DrupalDateTime::createFromTimestamp((int) strtotime($data[$data_name['start']]))->format('Y-m-d\TH:i:s', ['timezone' => 'UTC']);
          }
          if (isset($data[$data_name['end']]) && !empty($data[$data_name['end']])) {
            $end = DrupalDateTime::createFromTimestamp((int) strtotime($data[$data_name['end']]))->format('Y-m-d\TH:i:s', ['timezone' => 'UTC']);
          }
          $node->{$field_name}->value = $start;
          $node->{$field_name}->end_value = $end;
          $values[$field_name] = [
            'value' => $start,
            'end_value' => $end,
          ];
        }
        else {
          $result = NULL;
          if (isset($data[$data_name]) && !empty($data[$data_name])) {
            $result = DrupalDateTime::createFromTimestamp((int) strtotime($data[$data_name]))->format('Y-m-d\TH:i:s', ['timezone' => 'UTC']);
          }
          $node->{$field_name}->value = $result;
          $values[$field_name] = $result;
        }
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
        $translation_info = [];
        if (isset($data_structure['translation']) && !empty($data_structure)) {
          $translation_info = [];
          foreach ($data_structure['translation'] as $language => $translated_fields) {
            foreach ($translated_fields['field'] as $field => $value) {
              $translation_info[$language]['field'][$field] = trim($data[$value]);
            }
          }
        }
        $delimiter = NULL;
        if (isset($data_structure['delimiter']) && !empty($data_structure['delimiter'])) {
          $delimiter = $data_structure['delimiter'];
        }
        $result = $this->setTaxonomyTerm($info, $data_structure['taxonomy'], $data_structure['check_field'], $translation_info, $delimiter);
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
        $translation_info = [];
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
        $field_value = NULL;
        if (isset($callback['field']) && !empty($callback['field'])) {
          $field_value = $data[$callback['field']];
        }
        if (isset($callback['function']['parameters']) && !empty($callback['function']['parameters'])) {
          $parameters = [];
          foreach ($callback['function']['parameters'] as $param) {
            $parameters[$param] = trim($data[$param]);
          }
          $result = $this->{$callback['function']['name']}($field_value, $parameters);
        }
        else {
          $result = $this->{$callback['function']['name']}($field_value);
        }
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

    // Map date values.
    if (!empty($mappings['date'])) {
      foreach ($mappings['date'] as $field_name => $data_name) {
        if (is_array($data_name)) {
          $start = NULL;
          $end = NULL;
          if (isset($data[$data_name['start']]) && !empty($data[$data_name['start']])) {
            $start = DrupalDateTime::createFromTimestamp((int) strtotime($data[$data_name['start']]))->format('Y-m-d\TH:i:s', ['timezone' => 'UTC']);
          }
          if (isset($data[$data_name['end']]) && !empty($data[$data_name['end']])) {
            $end = DrupalDateTime::createFromTimestamp((int) strtotime($data[$data_name['end']]))->format('Y-m-d\TH:i:s', ['timezone' => 'UTC']);
          }
          $values[$field_name] = [
            'value' => $start,
            'end_value' => $end,
          ];
        }
        else {
          $result = NULL;
          if (isset($data[$data_name]) && !empty($data[$data_name])) {
            $result = DrupalDateTime::createFromTimestamp((int) strtotime($data[$data_name]))->format('Y-m-d\TH:i:s', ['timezone' => 'UTC']);
          }
          $values[$field_name] = $result;
        }
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
        $translation_info = [];
        if (isset($data_structure['translation']) && !empty($data_structure)) {
          $translation_info = [];
          foreach ($data_structure['translation'] as $language => $translated_fields) {
            foreach ($translated_fields['field'] as $field => $value) {
              $translation_info[$language]['field'][$field] = trim($data[$value]);
            }
          }
        }
        $delimiter = NULL;
        if (isset($data_structure['delimiter']) && !empty($data_structure['delimiter'])) {
          $delimiter = $data_structure['delimiter'];
        }
        $values[$field_name] = $this->setTaxonomyTerm($info, $data_structure['taxonomy'], $data_structure['check_field'], $translation_info, $delimiter);
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
        $translation_info = [];
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
        $field_value = NULL;
        if (isset($callback['field']) && !empty($callback['field'])) {
          $field_value = $data[$callback['field']];
        }
        if (isset($callback['function']['parameters']) && !empty($callback['function']['parameters'])) {
          $parameters = [];
          foreach ($callback['function']['parameters'] as $param) {
            $parameters[$param] = trim($data[$param]);
          }
          $values[$field_name] = $this->{$callback['function']['name']}($field_value, $parameters);
        }
        else {
          $values[$field_name] = $this->{$callback['function']['name']}($field_value);
        }
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
      'title' => 'public_title',
      'field_short_description' => 'short_description',
      'body' => 'long_description_body',
      'field_title' => 'other_title',
      'field_data_custodian_email' => 'data_custodian_email',
      'field_publisher' => 'publisher',
      'field_update_frequency' => 'update_frequency',
      'field_access_level' => 'access_level',
      'field_exemption' => 'exemption',
      'field_rationale_not_to_release' => 'rationale_not_to_release',
      'field_data_url' => 'dataset_url',
      'field_file_extensions' => 'file_typesextensions',
      'field_license_type' => 'license_type',
      'field_note' => 'more_information',
    ];

    $mappings['taxonomies'] = [
      'field_subsite_context' => [
        'field' => [
          'name' => 'subsite_context',
        ],
        'taxonomy' => 'subsite_context',
        'check_field' => 'name',
      ],
      'field_data_custodian_branch' => [
        'field' => [
          'name' => 'data_custodian_branch',
        ],
        'taxonomy' => 'data_custodian_branch',
        'check_field' => 'name',
        'translation' => [
          'fr' => [
            'field' => [
              'name' => 'direction_du_gestionnaire_de_lactif_organisationnel',
            ],
          ],
        ],
      ],
      'field_tags' => [
        'field' => [
          'name' => 'tags',
        ],
        'taxonomy' => 'tags',
        'delimiter' => ',',
        'check_field' => 'name',
        'translation' => [
          'fr' => [
            'field' => [
              'name' => 'etiquettes',
            ],
          ],
        ],
      ],
    ];

    $mappings['date'] = [
      'field_date_range' => [
        'start' => 'date_range_start',
        'end' => 'date_range_end',
      ],
      'field_date_created' => 'date_created',
      'field_date' => 'date_published',
    ];

    // Map values which require any treatment (by a helper function).
    $mappings['callbacks'] = [
      'field_contains_geographic_marker' => [
        'field' => 'contains_geographic_markers',
        'function' => [
          'name' => 'setBinaryValue',
        ],
      ],
      /*
        'field_data_source' => [
          'field' => '',
          'function' => [
            'name' => 'setDataSourceOrigin',
            'parameters' => [
              'dataset_url',
              'file_typesextensions',
            ],
          ],
        ],
        */
      'field_attachments' => [
        'field' => '',
        'function' => [
          'name' => 'setDataFile',
          'parameters' => [
            'dataset_url',
            'file_typesextensions',
          ],
        ],
      ],
    ];

    $mappings['translation'] = [
      'fr' => [
        'field' => [
          'title' => 'titre_public',
          'field_short_description' => 'courte_description',
          'body' => 'longue_description_corps_du_texte',
          'field_title' => 'autre_titre',
          'field_data_custodian_email' => 'adresse_electronique_du_gestionnaire_de_lactif_informationnel',
          'field_publisher' => 'editeur',
          'field_update_frequency' => 'frequence_des_mises_a_jour',
          'field_access_level' => 'niveau_dacces',
          'field_exemption' => 'exemption_1',
          'field_rationale_not_to_release' => 'motifs_de_la_nondiffusion',
          'field_license_type' => 'type_de_licence',
          'field_note' => 'renseignements_additionnels',
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
            $tid = $this->setTaxonomyTerm($value['field'], $referenced_vocabulary, $value['check_field'], $translation_info, $value['delimiter']);
            $values[$key] = $tid;
          }
          elseif ($fields[$key]->getSetting('handler') === 'default:node') {
            $referenced_type = reset($fields[$key]->getSetting('handler_settings')['target_bundles']);
            $nid = $this->setContentReference($value['field'], $referenced_type, $value['check_field'], $translation_info);
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
              $tid = $this->setTaxonomyTerm($value['field'], $referenced_vocabulary, $value['check_field'], $translation_info, $value['delimiter']);
              $node->{$key}->setValue($tid);
              $node->save();
            }
          }
          if ($fields[$key]->getSetting('handler') === 'default:node') {
            $referenced_node = $this->entity_manager->getStorage('node')->load($node->{$key}->target_id);
            foreach (array_values($value['check_field']) as $item) {
              if ((empty($referenced_node) && !empty($value['field'][$item])) || $referenced_node->{$item}->value !== $value['field'][$item]) {
                $referenced_type = reset($node->getFieldDefinition($key)->getSetting('handler_settings')['target_bundles']);
                $nid = $this->setContentReference($value['field'], $referenced_type, $value['check_field'], $translation_info);
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
   * @param object $entity
   *   Entity to be translated.
   * @param string $language
   *   Language of new translation.
   * @param array $values
   *   Array with original entity values.
   * @param array $translated_data
   *   Array with translated values to override original ones.
   *
   * @return object
   *   Translated entity.
   */
  protected function createTranslation($entity, $language, array $values, array $translated_data) {
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
   * @param object $entity
   *   Entity which translation will be updated.
   * @param string $language
   *   Language of new translation.
   * @param array $data
   *   Array with values to be updated on current translation.
   */
  protected function updateTranslation($entity, $language, array $data) {
    $translation = $entity->getTranslation($language);
    $fields = $entity->getFields();
    $translation_fields = $translation->getFields();
    foreach ($translation_fields as $key => $value) {
      if (strpos($key, 'field_') === 0 && !isset($data['field'][$key]) && $value->getValue() !== $fields[$key]->getValue()) {
        $value->setValue($fields[$key]->getValue());
      }
    }
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
   * @param array $translation_info
   *   Array with translation languages and fields to be translated.
   * @param string $delimiter
   *   Separator character for multiple taxonomy terms.
   *
   * @return array
   *   Mapped term(s) to be set to node.
   */
  protected function setTaxonomyTerm(array $value, $vocabulary, $check_field, array $translation_info, $delimiter) {
    if ($value) {
      if ($delimiter) {
        $term_id = [];
        $term_info = [];
        foreach ($value as $field => $field_value) {
          $terms = explode($delimiter, $field_value);
          foreach ($terms as $key => $term) {
            $term_info[$key][$field] = trim($term);
          }
        }
        $multitranslation_info = [];
        if ($translation_info) {
          foreach ($translation_info as $language => $translated_values) {
            foreach ($translated_values['field'] as $field => $field_value) {
              $translated_terms = explode($delimiter, $field_value);
              foreach ($translated_terms as $key => $term) {
                $multitranslation_info[$key][$language]['field'][$field] = trim($term);
              }
            }
          }
        }
        foreach ($term_info as $key => $term) {
          array_push($term_id, $this->mapSearchableTerms($term, $vocabulary, $check_field, $multitranslation_info[$key]));
        }
      }
      else {
        $term_id = $this->mapSearchableTerms($value, $vocabulary, $check_field, $translation_info);
      }
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
   * @param array $translation_info
   *   Array with translation languages and fields to be translated.
   *
   * @return string
   *   Mapped term id.
   */
  protected function mapSearchableTerms(array $term_data, $taxonomy_tree, $check_field, array $translation_info) {
    $taxonomy = $this->entity_manager->getStorage('taxonomy_term')->loadTree($taxonomy_tree);
    if (!empty($taxonomy) && is_array($taxonomy)) {
      foreach ($taxonomy as $item) {
        $term = $this->entity_manager->getStorage('taxonomy_term')->load($item->tid);
        if ($term->{$check_field}->value === $term_data[$check_field]) {
          $this->updateTaxonomy($term, $term_data, $translation_info);
          return $term->id();
        }
      }
      // If here it means that did not find any matching taxonomy.
      $tid = $this->createSearchableTaxonomy($term_data, $taxonomy_tree, $translation_info);
      if (isset($tid)) {
        return $tid;
      }
    }
    else {
      $tid = $this->createSearchableTaxonomy($term_data, $taxonomy_tree, $translation_info);
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
   * @param array $translation_info
   *   Array with translation languages and fields to be translated.
   *
   * @return string
   *   Mapped term id.
   */
  protected function createSearchableTaxonomy(array $term_data, $taxonomy_tree, array $translation_info) {
    $values = [];
    $values['vid'] = $taxonomy_tree;
    $fields = $this->entity_field->getFieldDefinitions('taxonomy_term', $taxonomy_tree);

    foreach ($term_data as $key => $value) {
      if (is_array($value)) {
        // Check if field is an entity reference to a taxonomy term.
        if ($fields[$key]->getType() === 'entity_reference' && $fields[$key]->getSetting('handler') === 'default:taxonomy_term') {
          $referenced_vocabulary = reset($fields[$key]->getSetting('handler_settings')['target_bundles']);
          $tid = $this->setTaxonomyTerm($value['field'], $referenced_vocabulary, $value['check_field'], $translation_info, $value['delimiter']);
          $values[$key] = $tid;
        }
      }
      else {
        $values[$key] = $value;
      }
    }

    $term = $this->entity_manager->getStorage('taxonomy_term')->create($values);
    $term->save();

    if (!empty($translation_info)) {
      foreach ($translation_info as $language => $translated_data) {
        $translation = $this->createTranslation($term, $language, $values, $translated_data);
        if (!empty($translation)) {
          $translation->save();
        }
      }
    }

    return $term->id();
  }

  /**
   * Helper function to update referenced taxonomy term if necessary.
   *
   * @param \Drupal\taxonomy\Entity\Term $term
   *   Referenced taxonomy term.
   * @param array $term_data
   *   Data from CSV file to be updated on taxonomy term.
   * @param array $translation_info
   *   Array with translation languages and fields to be translated.
   */
  protected function updateTaxonomy(Term $term, array $term_data, array $translation_info) {
    foreach ($term_data as $key => $value) {
      // Check if field is an entity reference.
      if (is_array($value)) {
        $referenced_term = $this->entity_manager->getStorage('taxonomy_term')->load($term->{$key}->target_id);
        if ($referenced_term->{$value['check_field']}->value !== $value['field'][$value['check_field']]) {
          $referenced_vocabulary = reset($term->getFieldDefinition($key)->getSetting('handler_settings')['target_bundles']);
          $tid = $this->setTaxonomyTerm($value['field'], $referenced_vocabulary, $value['check_field'], $translation_info, $value['delimiter']);
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
    if (!empty($translation_info)) {
      foreach ($translation_info as $language => $translated_data) {
        if ($term->hasTranslation($language)) {
          $this->updateTranslation($term, $language, $translated_data);
        }
        else {
          $translation = $this->createTranslation($term, $language, $term_data, $translated_data);
          if (!empty($translation)) {
            $translation->save();
          }
        }
      }
    }
  }

  /**
   * Helper function to get array with matchins node(s) id(s)
   *
   * @param int $value
   *   Value from the feed.
   * @param string $comp_field
   *   Name of the field to be compared with $value.
   * @param string $type
   *   Machine name of the content type.
   *
   * @return array
   *   Array of node ids if they exist - NULL otherwise.
   */
  protected function getNodeId($value, $comp_field, $type) {
    $connection = \Drupal::database();
    $query = $connection->select('node', 'n');
    $query->fields('n', ['nid']);
    $query->leftJoin('node_field_data', 'cid', 'cid.nid = n.nid');
    $query->condition('n.type', $type)
      ->condition('cid.' . $comp_field, $value);
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

  /**
   * Helper function to set numeric binary value.
   *
   * @param string $str
   *   String with value.
   *
   * @return bool
   *   Boolean value from given string.
   */
  protected function setBinaryValue($str) {
    $value = FALSE;
    if (strtoupper($str) === 'TRUE') {
      $value = TRUE;
    }
    return $value;
  }

  /**
   * Helper function to set Data Source origin type.
   *
   * @param string $str
   *   Empty string.
   * @param array $comparison_fields
   *   Array with fields to use for comparison.
   *
   * @return int
   *   Integer value to match field list options.
   */
  protected function setDataSourceOrigin($str, array $comparison_fields) {
    $value = NULL;
    if (!empty($comparison_fields['dataset_url'])) {
      // Set as External source.
      $value = 2;
      if (!empty($comparison_fields['file_typesextensions'])) {
        $filename = explode('/', $comparison_fields['dataset_url']);
        $filename = $filename[count($filename) - 1];
        $extension = explode('.', $filename);
        $extension = $extension[count($extension) - 1];
        if (!empty($extension) && strpos($comparison_fields['file_typesextensions'], '.' . $extension) !== FALSE) {
          // Set as Internal source.
          $value = 1;
        }
      }
    }
    return $value;
  }

  /**
   * Helper function to set Data Source origin type.
   *
   * @param string $str
   *   Empty string.
   * @param array $comparison_fields
   *   Array with fields to use for comparison.
   *
   * @return int
   *   Integer value to match field list options.
   */
  protected function setDataFile($str, array $comparison_fields) {
    $id = NULL;
    if (!empty($comparison_fields['dataset_url'])) {
      if (!empty($comparison_fields['file_typesextensions'])) {
        $filename = explode('/', $comparison_fields['dataset_url']);
        $filename = $filename[count($filename) - 1];
        $extension = explode('.', $filename);
        $extension = $extension[count($extension) - 1];

        if (!empty($extension) && strpos($comparison_fields['file_typesextensions'], '.' . $extension) !== FALSE) {
          // Get file from folder, save it as media file and set relationship.
          $folder = $this->fileSystem->realpath('public://open_data_origin');
          $file_path = $folder . '/' . $filename;
          $data = file_get_contents($file_path);
          if (!empty($data)) {
            // Call function to create Media entity.
            $uri = 'public://open_data/' . $filename;
            $id = $this->setMediaEntityReference($data, $uri, 'file', $filename);
          }
          else {
            $message = 'Execution failed. File not found in filesystem: ' . $filename;
            $this->messenger->addMessage($message, 'error', FALSE);
            $this->messenger->deleteByType('status');
          }
        }
      }
    }
    return $id;
  }

  /**
   * Helper function to create Media entity.
   *
   * @param object $file_data
   *   File data to be stored as Media entity.
   * @param string $file_uri
   *   URI where Media entity file will be stored.
   * @param string $media_bundle
   *   Type of Media entity.
   * @param string $file_name
   *   Name to be set to Media entity.
   *
   * @return string
   *   Media id.
   */
  protected function setMediaEntityReference($file_data, $file_uri, $media_bundle, $file_name) {
    $media_entities = $this->entity_manager->getStorage('media')->loadByProperties(['name' => $file_name]);
    $field_name = 'field_media_' . $media_bundle;

    // If it found Media entities with given name,
    // check if any has the same file than origin.
    // If so, return Media id.
    // Otherwise, create a new Media entity and return its id.
    if (!empty($media_entities)) {
      $medias = [];
      foreach ($media_entities as $key => $value) {
        $fid = $value->get($field_name)->target_id;
        $original_file = File::load($fid);
        if (md5($file_data) === md5_file($original_file->getFileUri())) {
          $medias[$key] = $value;
        }
      }
      if (!empty($medias)) {
        $media = reset($medias);
      }
      else {
        $media = $this->createMediaEntity($file_data, $file_uri, $media_bundle, $file_name, $field_name);
      }
    }
    // If did not find any Media entity with given name,
    // create a new Media entity and return its id.
    else {
      $media = $this->createMediaEntity($file_data, $file_uri, $media_bundle, $file_name, $field_name);
    }
    return $media->id();
  }

  /**
   * Helper function to create a Media entity.
   *
   * @param object $file_data
   *   File data to be stored as Media entity.
   * @param string $file_uri
   *   URI where Media entity file will be stored.
   * @param string $media_bundle
   *   Type of Media entity.
   * @param string $file_name
   *   Name to be set to Media entity.
   * @param string $field_name
   *   Name of field to be set regarding media bundle.
   *
   * @return object
   *   Media object created.
   */
  protected function createMediaEntity($file_data, $file_uri, $media_bundle, $file_name, $field_name) {
    $file = file_save_data($file_data, $file_uri, FILE_EXISTS_REPLACE);
    $media = Media::create([
      'bundle' => $media_bundle,
      'name' => $file_name,
      $field_name => [
        'target_id' => $file->id(),
      ],
    ]);
    $media->save();
    return $media;
  }

}
