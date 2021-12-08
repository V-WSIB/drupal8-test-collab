<?php

namespace Drupal\wsib_premium_estimator\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Form\FormBuilder;
use Drupal\Core\Routing\RouteMatchInterface;

/**
 * Provides 'WSIB Premium Estimator Selection' block.
 *
 * @Block(
 *   id = "wsib_premium_estimator_selection_block",
 *   admin_label = @Translation("WSIB Premium Estimator Selection Block"),
 * )
 */
class EstimatorSelectionBlock extends BlockBase implements ContainerFactoryPluginInterface {
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
      $container->get('form_builder'),
      $container->get('current_route_match')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, FormBuilder $formBuilder, RouteMatchInterface $routeMatch) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->form_builder = $formBuilder;
    $this->route_match = $routeMatch;
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $form = [];
    $node = $this->route_match->getParameter('node');
    $year = $node->field_year->value;
    $form['group'] = $this->form_builder->getForm('Drupal\wsib_premium_estimator\Form\EstimatorGroupSelectionForm', $year);
    $form['sector'] = $this->form_builder->getForm('Drupal\wsib_premium_estimator\Form\EstimatorSectorSelectionForm', $year);
    return $form;
  }

}
