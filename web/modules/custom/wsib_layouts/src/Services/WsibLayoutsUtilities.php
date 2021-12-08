<?php

namespace Drupal\wsib_layouts\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Language\LanguageManager;
use Drupal\taxonomy\Entity\Term;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Contains WSIB Layout Utilities Service.
 */
class WsibLayoutsUtilities {
  use StringTranslationTrait;
  /**
   * Provides language support on language-unaware sites.
   *
   * @var \Drupal\Core\Language\LanguageManager
   */
  protected $languageManager;

  /**
   * Provides Symfpny request stack.
   *
   * @var Symfony\Component\HttpFoundation\RequestStack
   */
  protected $request;

  /**
   * {@inheritdoc}
   */
  public function __construct(LanguageManager $language) {
    $this->languageManager = $language;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('language_manager')
    );
  }

  /**
   * Helper function to add block to the region.
   *
   * @param string $id
   *   Id of the block.
   * @param string $block_plugin_id
   *   Plugin id.
   * @param string $region
   *   Region where to place   block.
   * @param string $theme
   *   Theme where the block should be used.
   */
  public function addBlockToRegion($id, $block_plugin_id, $region = 'content', $theme = 'de_theme') {
    $block_entity_manager = \Drupal::entityTypeManager()->getStorage('block');
    $values = [
      'id' => $id,
      'plugin' => $block_plugin_id,
      'theme' => $theme,
    ];
    $block = $block_entity_manager->create($values);
    $block->setRegion($region);
    $block->save();
  }

  /**
   * Helper function to renderable block region.
   *
   * @param string $id
   *   Id of the block.
   * @param string $block_plugin_id
   *   Plugin id.
   * @param string $theme
   *   Theme where the block should be used.
   *
   * @return array
   *   Renderable array of a block_content.
   */
  public function getRenderableBlockInstance($id, $block_plugin_id, $theme = 'de_theme') {
    $block_entity_manager = \Drupal::entityTypeManager()->getStorage('block');
    $values = [
      'id' => $id,
      'plugin' => $block_plugin_id,
      'theme' => $theme,
    ];
    $block = $block_entity_manager->create($values);
    $block->save();
    $block_content = \Drupal::entityTypeManager()
      ->getViewBuilder('block')
      ->view($block);
    return $block_content;
  }

  /**
   * Helper function to get term translation if it exists.
   *
   * @param \Drupal\taxonomy\Entity\Term $term
   *   Taxonomy term object.
   *
   * @return \Drupal\taxonomy\Entity\Term
   *   Translated taxonomy term object.
   */
  public function translateTerm(Term $term) {
    $lang = $this->languageManager->getCurrentLanguage()->getId();
    $translated_term = $term;
    if ($term->hasTranslation($lang)) {
      $translated_term = $term->getTranslation($lang);
    }
    return $translated_term;
  }

  /**
   * Helper function to get entity translation if it exists.
   *
   * @param object $entity
   *   Entity object.
   *
   * @return object
   *   Translated entity object.
   */
  public function translateEntity($entity) {
    $lang = $this->languageManager->getCurrentLanguage()->getId();
    $translated_entity = $entity;
    if ($entity->hasTranslation($lang)) {
      $translated_entity = $entity->getTranslation($lang);
    }
    return $translated_entity;
  }

  /**
   * Helper function to build renderable array of tabs.
   *
   * @param array $data
   *    array of data to build tabs from.
   *
   * @return array $tabs
   *    render array of tabs.
   */
  public function buildTabs(array $data) {
    $build = [];
    foreach ($data as $tab) {
      $url = Url::fromRoute('entity.node.canonical', ['node' => $tab['nid'],]);
      $title = $this->t($tab['title']);
      $attributes = ['class' => $tab['classes']];
      $build[] = [
        '#title' => $title,
        '#type' => 'link',
        '#url' => $url,
        '#attributes' => $attributes,
      ];
    }
    return $build;
  }

  /**
   * Helper function to sort associative array by value.
   *
   * @param array $data
   *   Array of elements to sort by value.
   *
   * @return array
   *   Sorted array.
   */
  public function sortArrayByValue(array $data) {
    // This function converts special characters with accents
    // to their respective regular characters for sorting.
    setlocale(LC_ALL, 'en_US.utf8');
    $temp = $data;
    $sorted = [];
    foreach ($temp as $key => $value) {
      $value = iconv('utf-8', 'ascii//TRANSLIT', $value);
      $value = strtolower($value);
      $value = preg_replace('/[^A-Za-z0-9\ ]/', '', $value);
      $temp[$key] = $value;
    }
    asort($temp);
    foreach (array_keys($temp) as $key) {
      $sorted[$key] = $data[$key];
    }
    return $sorted;
  }

}
