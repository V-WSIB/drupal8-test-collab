<?php

namespace Drupal\wsib_help_wizard\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Form\FormBuilderInterface;

/**
 * Provides 'WSIB Help Wizard' block.
 *
 * @Block(
 *   id = "wsib_help_wizard_block",
 *   admin_label = @Translation("WSIB Help Wizard Block"),
 * )
 */
class HelpWizardBlock extends BlockBase implements ContainerFactoryPluginInterface {
  /**
   * Provides an interface for form building and processing.
   *
   * @var \Drupal\Core\Form\FormBuilderInterface
   */
  protected $formBuilder;

  /**
   * {@inheritdoc}
   */
  public function __construct(FormBuilderInterface $form_builder) {
    $this->formBuilder = $form_builder;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $container->get('form_builder')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['#cache'] = [
      'contexts' => ['languages:language_interface'],
    ];
    $build['form'] = $this->formBuilder->getForm('Drupal\wsib_help_wizard\Form\HelpWizardForm');
    $build['#attached']['library'][] = 'wsib_help_wizard/form_select_control';
    return $build;
  }

}
