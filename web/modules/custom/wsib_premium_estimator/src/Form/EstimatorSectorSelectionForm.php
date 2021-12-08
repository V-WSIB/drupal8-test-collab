<?php

namespace Drupal\wsib_premium_estimator\Form;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Language\LanguageManager;
use Drupal\wsib_layouts\Services\WsibLayoutsUtilities;

/**
 * Contains Estimator Sector Selection Form.
 */
class EstimatorSectorSelectionForm extends FormBase {

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
   * Provides custom utility functions for WSIB.
   *
   * @var \Drupal\wsib_layouts\Services\WsibLayoutsUtilities
   */
  protected $wsibUtilities;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('language_manager'),
      $container->get('wsib_layouts.layouts_helpers')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function __construct(EntityTypeManagerInterface $entityManager, LanguageManager $languageManager, WsibLayoutsUtilities $wsib_utilities) {
    $this->entity_manager = $entityManager;
    $this->language_manager = $languageManager;
    $this->language = $this->language_manager->getCurrentLanguage()->getId();
    $this->wsibUtilities = $wsib_utilities;
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'wsib_premium_estimator_sector_selection_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $year = NULL) {
    $form['#cache'] = ['max-age' => 0];
    $form['help'] = [
      '#type' => 'markup',
      '#markup' => '<h3>' . $this->t("If you are not a WSIB customer or don't have your account information handy") . '</h3><p>' . $this->t('Select the industry sector that your business falls into and click continue.') . '</p>',
    ];

    $sectors = $this->entity_manager->getStorage('taxonomy_term')->loadTree('sector', 0, NULL, TRUE);
    $options = [];
    foreach ($sectors as $sector) {
      $sector = $this->wsibUtilities->translateEntity($sector);
      $options[$sector->id()] = $sector->name->value;
    }
    $options = $this->wsibUtilities->sortArrayByValue($options);

    $form['sector'] = [
      '#type' => 'select',
      '#empty_value' => '',
      '#empty_option' => $this->t('All Sector'),
      '#options' => $options,
      '#name' => $this->t('Sector'),
      '#title' => $this->t('Sector'),
      '#title_display' => 'invisible',
    ];

    $form['year'] = [
      '#type' => 'hidden',
      '#value' => $year,
    ];

    $form['actions']['#type'] = 'actions';

    $form['actions']['sector_submit'] = [
      '#type' => 'submit',
      '#name' => 'sector_submit',
      '#value' => $this->t('Continue'),
      '#button_type' => 'primary',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    if ($form_state->isMethodType('POST') && $form_state->isSubmitted()) {
      $tid = $form_state->getValue('sector');
      $year = $form_state->getValue('year');
      if (empty($tid)) {
        $tid = 'all';
      }
      $industry_route = 'wsib_premium_estimator.sector_view_page';
      if ($this->language === 'fr') {
        $industry_route = 'wsib_premium_estimator.sector_view_page_fr';
      }
      $form_state->setRedirect($industry_route, ['sector' => $tid, 'year' => $year]);
    }
  }

}
