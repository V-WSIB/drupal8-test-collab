<?php

namespace Drupal\wsib_premium_estimator\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Form\FormBuilder;
use Drupal\Core\Routing\RouteMatchInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\Core\Language\LanguageManager;
use Drupal\Core\Url;

/**
 * Provides 'WSIB Premium Estimator Calculate' block.
 *
 * @Block(
 *   id = "wsib_premium_estimator_calculate_block",
 *   admin_label = @Translation("WSIB Premium Estimator Calculate Block"),
 * )
 */
class EstimatorCalculateBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * Provides an interface for entity type managers.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityManager;

  /**
   * HTTP request stack object.
   *
   * @var \Symfony\Component\HttpFoundation\RequestStack
   */
  protected $requestStack;

  /**
   * HTTP request object.
   *
   * @var \Symfony\Component\HttpFoundation\Request
   */
  protected $request;

  /**
   * Provides language support on language-unaware sites.
   *
   * @var \Drupal\Core\Language\LanguageManager
   */
  protected $languageManager;

  /**
   * Provides form building and processing.
   *
   * @var \Drupal\Core\Form\FormBuilder
   */
  protected $formBuilder;

  /**
   * Provides an interface for classes representing the result of routing.
   *
   * @var \Drupal\Core\Routing\RouteMatchInterface
   */
  protected $routeMatch;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('entity_type.manager'),
      $container->get('request_stack'),
      $container->get('request_stack')->getCurrentRequest(),
      $container->get('language_manager'),
      $container->get('form_builder'),
      $container->get('current_route_match')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entityManager, RequestStack $requestStack, Request $request, LanguageManager $languageManager, FormBuilder $formBuilder, RouteMatchInterface $routeMatch) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entity_manager = $entityManager;
    $this->request_stack = $requestStack;
    $this->request = $request;
    $this->language_manager = $languageManager;
    $this->language = $this->language_manager->getCurrentLanguage()->getId();
    $this->form_builder = $formBuilder;
    $this->route_match = $routeMatch;
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $rg_code = $this->request->query->get('rg');
    $cu_code = $this->request->query->get('cu');
    $build = [];
    $build['#cache'] = ['max-age' => 0];

    $node = $this->route_match->getParameter('node');
    $node_title = $node->title->value;
    $build['title'] = [
      '#type' => 'markup',
      '#markup' => '<h1>' . $node_title . '</h1>',
    ];

    if (!empty($rg_code)) {
      $rate_group = $this->entity_manager->getStorage('node')->load($rg_code);
      if (!empty($rate_group)) {
        $year = $rate_group->field_year->value;
        $prefix = '';
        $suffix = '';
        if ($this->language === 'en') {
          $prefix = $year . ' ';
        }
        else {
          $suffix = ' ' . $year;
        }
        $build['title'] = [
          '#type' => 'markup',
          '#markup' => '<h1>' . $prefix . $node_title . $suffix . '</h1>',
        ];
        if (!empty($cu_code)) {
          $estimator = $this->entity_manager->getStorage('node')->load($cu_code);
          if (!empty($estimator) && $estimator->bundle() === 'estimator' && $rate_group->id() === $estimator->field_rate_group->target_id) {
            $build['form'] = $this->form_builder->getForm('Drupal\wsib_premium_estimator\Form\EstimatorCalculateForm', $rate_group, $estimator);
          }
          else {
            $build['error'] = [
              '#type' => 'markup',
              '#markup' => '<p>' . $this->t('The classification unit or rate group information you entered does not exist. Please try your search again.') . '</p>',
            ];
            $build['new_estimate_container'] = [
              '#type' => 'container',
              '#attributes' => [
                'class' => [
                  'new-estimate-container',
                ],
              ],
            ];
            $build['new_estimate_container']['new_estimate'] = [
              '#type' => 'link',
              '#title' => $this->t('Get another estimate'),
              '#url' => Url::fromRoute('entity.node.canonical', ['node' => 8431]),
              '#attributes' => [
                'class' => [
                  'new-estimate',
                ],
              ],
            ];
          }
        }
        else {
          $build['form'] = $this->form_builder->getForm('Drupal\wsib_premium_estimator\Form\EstimatorCalculateForm', $rate_group);
        }
        return $build;
      }
    }

    $build['error'] = [
      '#type' => 'markup',
      '#markup' => '<p>' . $this->t('The classification unit or rate group information you entered does not exist. Please try your search again.') . '</p>',
    ];
    $build['new_estimate_container'] = [
      '#type' => 'container',
      '#attributes' => [
        'class' => [
          'new-estimate-container',
        ],
      ],
    ];
    $build['new_estimate_container']['new_estimate'] = [
      '#type' => 'link',
      '#title' => $this->t('Get another estimate'),
      '#url' => Url::fromRoute('entity.node.canonical', ['node' => 8431]),
      '#attributes' => [
        'class' => [
          'new-estimate',
        ],
      ],
    ];

    return $build;
  }

}
