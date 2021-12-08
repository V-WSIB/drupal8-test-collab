<?php

namespace Drupal\wsib_help_wizard\Form;

use Drupal\Core\Ajax\AjaxResponse;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Routing\TrustedRedirectResponse;
use Drupal\Core\Url;
use Drupal\wsib_layouts\Services\WsibLayoutsUtilities;

/**
 * Contains Report Fraud Form.
 */
class HelpWizardForm extends FormBase {
  /**
   * Provides an interface for entity type managers.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityManager;

  /**
   * Provides language support on language-unaware sites.
   *
   * @var \Drupal\wsib_layouts\Services\WsibLayoutsUtilities
   */
  protected $wsibUtilities;

  /**
   * {@inheritdoc}
   */
  public function __construct(EntityTypeManagerInterface $entity_manager, WsibLayoutsUtilities $wsib_utilities) {
    $this->entityManager = $entity_manager;
    $this->wsibUtilities = $wsib_utilities;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('wsib_layouts.layouts_helpers')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'wsib_help_wizard_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $vid = 'how_to_help';
    $terms = $this->entityManager->getStorage('taxonomy_term')->loadTree($vid, 0, NULL, TRUE);
    $role_options = [];
    $operation_options = [];
    foreach ($terms as $term) {
      $term = $this->wsibUtilities->translateTerm($term);
      $parents = $this->entityManager->getStorage('taxonomy_term')->loadParents($term->id());
      if (empty($parents)) {
        $role_options[$term->id()] = $term->get('name')->value;
      }
      else {
        $operation_options[$term->id()] = $term->get('name')->value;
      }
    }

    $form['#cache'] = [
      'contexts' => ['languages:language_interface'],
    ];
    $form['help'] = [
      '#type' => 'markup',
      '#markup' => '<p>' . $this->t('How can we help you?') . '</p>',
    ];

    $form['role'] = [
      '#type' => 'select',
      '#title' => $this->t('I am:'),
      '#empty_value' => '',
      '#empty_option' => $this->t('Choose an option'),
      '#options' => $role_options,
      '#required' => TRUE,
      '#ajax' => [
        'callback' => [$this, 'getOperations'],
        'event' => 'change',
        'wrapper' => 'edit-operation',
        'progress' => [
          'type' => 'throbber',
          'message' => $this->t('Please wait...'),
        ],
      ],
    ];

    $form['operation'] = [
      '#type' => 'select',
      '#title' => $this->t('I want to:'),
      '#empty_value' => '',
      '#empty_option' => $this->t('Choose an option'),
      '#options' => $operation_options,
      '#required' => TRUE,
    ];

    $form['actions'] = [
      '#type' => 'container',
      '#attributes' => [
        'id' => 'actions-wrapper',
      ],
    ];

    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Go'),
      '#name' => 'submit',
    ];
    $form_state->setCached(FALSE);

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $operation = $form_state->getValue('operation');
    $term = $this->entityManager->getStorage('taxonomy_term')->load($operation);
    $term = $this->wsibUtilities->translateTerm($term);
    if (!empty($term->get('field_link')->uri)) {
      $url = Url::fromUri($term->get('field_link')->uri);
      if ($url->isExternal()) {
        $redirect = new TrustedRedirectResponse($term->get('field_link')->uri);
        return $redirect->send();
      }
      else {
        $form_state->setRedirectUrl($url);
      }
    }
  }

  /**
   * Helper function to show/hide operations options regarding role.
   *
   * @param array $form
   *   Form element.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   Form state element.
   *
   * @return \Drupal\Core\Ajax\AjaxResponse
   *   AJAX call response.
   */
  public function getOperations(array &$form, FormStateInterface &$form_state) {
    $role = $form_state->getValue('role');
    $operations = $this->entityManager->getStorage('taxonomy_term')->loadChildren($role);
    $response = new AjaxResponse();

    $operation_options = '<option value="" selected="selected">' . $this->t('Choose an option') . '</option>';
    if (!empty($operations)) {
      foreach ($operations as $operation) {
        $operation = $this->wsibUtilities->translateTerm($operation);
        $operation_options .= '<option value="' . $operation->id() . '">' . $operation->get('name')->value . '</option>';
      }
    }

    $response->addCommand(
      new ReplaceCommand(
        '#edit-operation',
        '<select id="edit-operation" name="operation" class="form-select" data-drupal-selector="edit-operation">' . $operation_options . '</select>')
    );

    return $response;
  }

}
