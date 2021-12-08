<?php

namespace Drupal\wsib_premium_estimator\Form;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Language\LanguageManager;

/**
 * Contains Estimator Group Selection Form.
 */
class EstimatorGroupSelectionForm extends FormBase {

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
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('language_manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function __construct(EntityTypeManagerInterface $entityManager, LanguageManager $languageManager) {
    $this->entity_manager = $entityManager;
    $this->language_manager = $languageManager;
    $this->language = $this->language_manager->getCurrentLanguage()->getId();
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'wsib_premium_estimator_group_selection_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $year = NULL) {
    $form['#cache'] = ['max-age' => 0];
    $form['help'] = [
      '#type' => 'markup',
      '#markup' => '<h3>' . $this->t('If you are already a WSIB customer') . '</h3><p>' . $this->t('If you have your Classification Unit or Rate Group information available, enter one of them and click continue.') . '</p>',
    ];

    $form['classification_unit'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Classification unit'),
    ];

    $form['customer_option'] = [
      '#type' => 'markup',
      '#markup' => '<span>' . $this->t('or') . '</span>',
    ];

    $form['rate_group'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Rate group'),
    ];

    $form['year'] = [
      '#type' => 'hidden',
      '#value' => $year,
    ];

    $form['actions']['#type'] = 'actions';

    $form['actions']['group_submit'] = [
      '#type' => 'submit',
      '#name' => 'group_submit',
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
      $cu_code = $form_state->getValue('classification_unit');
      $rg_code = $form_state->getValue('rate_group');
      $year = $form_state->getValue('year');
      $calculator_route = 'wsib_premium_estimator.calculator';
      if ($this->language === 'fr') {
        $calculator_route = 'wsib_premium_estimator.calculator_fr';
      }
      if (!empty($cu_code)) {
        $estimator_nids = $this->entity_manager->getStorage('node')->loadByProperties(['field_code' => $cu_code]);

        if (!empty($estimator_nids) && is_array($estimator_nids)) {
          foreach ($estimator_nids as $nid) {
            $nid_rg = $this->entity_manager->getStorage('node')->load($nid->field_rate_group->target_id);
            if ($nid_rg->field_year->value === $year) {
              $estimator = $nid;
              $rate_group = $nid_rg;
            }
          }
          if (!empty($estimator) && !empty($rate_group)) {
            $form_state->setRedirect($calculator_route, ['rg' => $rate_group->id(), 'cu' => $estimator->id()]);
          }
          else {
            $form_state->setRedirect($calculator_route);
          }
        }
        else {
          $form_state->setRedirect($calculator_route);
        }
      }
      else {
        if (!empty($rg_code)) {
          $rate_group = $this->entity_manager->getStorage('node')->loadByProperties(['field_code' => $rg_code, 'field_year' => $year]);
          if (!empty($rate_group) && is_array($rate_group)) {
            $rate_group = reset($rate_group);
            // Go to Rate Group calculator page.
            $form_state->setRedirect($calculator_route, ['rg' => $rate_group->id()]);
          }
          else {
            $form_state->setRedirect($calculator_route);
          }
        }
        else {
          $form_state->setRedirect($calculator_route);
        }
      }
    }
  }

}
