<?php

namespace Drupal\wsib_menu\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Language\LanguageManager;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\taxonomy\Entity\Term;
use Drupal\Core\Url;

/**
 * Provides 'WSIB Operational Policy Menu' block.
 *
 * @Block(
 *   id = "wsib_menu_operational_policy_menu_block",
 *   admin_label = @Translation("Operational Policy Menu Block"),
 * )
 */
class OperationalPolicyMenuBlock extends BlockBase implements ContainerFactoryPluginInterface {
  /**
   * Provides an interface for entity type managers.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityManager;

  /**
   * Provides language support on language-unaware sites.
   *
   * @var \Drupal\Core\Language\LanguageManager
   */
  protected $languageManager;

  /**
   * Retrieves the currently active route match object.
   *
   * @var \Drupal\Core\Routing\RouteMatchInterface
   */
  protected $routeMatch;

  /**
   * {@inheritdoc}
   */
  public function __construct(EntityTypeManagerInterface $entity_manager, LanguageManager $language_manager, RouteMatchInterface $route_match) {
    $this->entityManager = $entity_manager;
    $this->languageManager = $language_manager;
    $this->routeMatch = $route_match;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('language_manager'),
      $container->get('current_route_match')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $route = $this->routeMatch->getRouteName();
    if ($route === 'entity.taxonomy_term.canonical') {
      $current = $this->routeMatch->getParameter('taxonomy_term');
    }
    elseif ($route === 'entity.node.canonical') {
      $current = $this->routeMatch->getParameter('node');
    }

    $vid = 'category';

    $build = [];
    $build['#cache'] = [
      'contexts' => ['url.path'],
    ];
    $build['#attached']['library'][] = 'wsib_menu/menu_accordion';

    // Link wrapper markup.
    $build['links'] = [
      '#type' => 'markup',
      '#markup' => NULL,
      '#prefix' => '<ul class="sidebar-menu">',
      '#suffix' => '</ul>',
    ];

    $terms = $this->entityManager->getStorage('taxonomy_term')->loadTree($vid, 0, NULL, TRUE);
    foreach ($terms as $term) {
      $term = $this->translateTerm($term);
      $classes = [];
      $prefix = '<li class="link-wrapper">';

      // If it is a link-only term, set URL as Link field.
      // Otherwise, set URL as term URL alias.
      if (!empty($term->get('field_is_a_link')->value) && $term->get('field_is_a_link')->value === '1') {
        $url = Url::fromUri($term->get('field_link')->uri);
        // If current page and link are same entity type and have same ID
        // add CSS class .active to link.
        if ($route === $url->getRouteName()) {
          if ($url->getRouteParameters()[$current->getEntityTypeId()] === $current->id()) {
            $classes[] = 'active';
            $prefix = '<li class="link-wrapper active">';
          }
        }
      }
      else {
        $url = Url::fromRoute('entity.taxonomy_term.canonical', ['taxonomy_term' => $term->id()]);
        // If taxonomy term and current page have same ID
        // add CSS class .active to link.
        if (isset($term) && is_object($term) && isset($current) && is_object($current) && $term->id() === $current->id()) {
          $classes[] = 'active';
          $prefix = '<li class="link-wrapper active">';
        }
      }

      // Build link itself.
      $build['links'][$term->id()] = [
        '#title' => $term->get('name')->value,
        '#type' => 'link',
        '#url' => $url,
        '#attributes' => [
          'id' => $term->id(),
          'class' => $classes,
        ],
        '#prefix' => $prefix,
        '#suffix' => '</li>',
      ];

      $child_vid = 'operational_policy_subject';
      $child_terms = $this->entityManager->getStorage('taxonomy_term')->getQuery()
        ->condition('vid', $child_vid)
        ->condition('field_oper_policy_category', $term->id())
        ->sort('weight', 'ASC')
        ->execute();

      if (!empty($child_terms)) {
        $build['links'][$term->id()]['sublinks'] = [
          '#type' => 'markup',
          '#markup' => NULL,
          '#prefix' => '<span class="accordion-arrow fa fa-caret-down" tabindex="0" role="button" aria-expanded="false" aria-controls="sublinks-' . $term->id() . '" aria-label="' . $term->get('name')->value . ' ' . $this->t('sublinks. Click to expand.') . '"></span><ul id="sublinks-' . $term->id() . '" class="sublink-wrapper">',
          '#suffix' => '</ul>',
        ];

        foreach ($child_terms as $child) {
          $child = $this->entityManager->getStorage('taxonomy_term')->load($child);
          $child = $this->translateTerm($child);

          $child_classes = [];
          $child_prefix = '<li>';
          if (isset($current) && is_object($current) && ($current->getEntityTypeId() === 'taxonomy_term' && $child->id() === $current->id()) ||
            (isset($current) && is_object($current) && $current->getEntityTypeId() === 'node' && $current->getType() === 'operational_policy' && $child->id() === $current->get('field_related_subject')->target_id)) {
            $child_classes[] = 'active';
            $build['links'][$term->id()]['#attributes']['class'][] = 'active';
            $build['links'][$term->id()]['#prefix'] = '<li class="link-wrapper active">';
            $child_prefix = '<li class="active">';
          }

          $build['links'][$term->id()]['sublinks'][$child->id()] = [
            '#title' => $child->get('name')->value,
            '#type' => 'link',
            '#url' => Url::fromRoute('entity.taxonomy_term.canonical', ['taxonomy_term' => $child->id()]),
            '#attributes' => [
              'id' => $child->id(),
              'class' => $child_classes,
            ],
            '#prefix' => $child_prefix,
            '#suffix' => '</li>',
          ];
        }
      }
    }
    return $build;
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
  protected function translateTerm(Term $term) {
    $lang = $this->languageManager->getCurrentLanguage()->getId();
    $translated_term = $term;
    if (isset($term) && $term->hasTranslation($lang)) {
      $translated_term = $term->getTranslation($lang);
    }
    return $translated_term;
  }

}
