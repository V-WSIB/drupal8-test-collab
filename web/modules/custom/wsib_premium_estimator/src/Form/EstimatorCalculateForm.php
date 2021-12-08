<?php

namespace Drupal\wsib_premium_estimator\Form;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\BeforeCommand;
use Drupal\Core\Ajax\InvokeCommand;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Ajax\RemoveCommand;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Language\LanguageManager;
use Drupal\wsib_layouts\Services\WsibLayoutsUtilities;

/**
 * Contains Estimator Calculate Form.
 */
class EstimatorCalculateForm extends FormBase {

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
    return 'wsib_premium_estimator_calculate_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $rate_group = NULL, $estimator = NULL) {
    $form['#cache'] = ['max-age' => 0];
    if (empty($rate_group)) {
      $form['help'] = [
        '#type' => 'markup',
        '#markup' => '<h3>' . $this->t('Error') . '</p>',
      ];
      return $form;
    }
    else {
      $rate_group = $this->wsibUtilities->translateEntity($rate_group);
      $rate_group_format = number_format($rate_group->field_premium_rate->value, 2, '.', '');
      if (!empty($estimator)) {
        $estimator = $this->wsibUtilities->translateEntity($estimator);
        $info_markup = '<p><strong>' . $this->t('Rate Group: @rate_group', ['@rate_group' => $rate_group->title->value]) . '</strong></p>';
        $info_markup .= '<p><strong>' . $this->t('Title: @estimator', ['@estimator' => $estimator->title->value]) . '</strong></p>';
        $info_markup .= '<p><strong>' . $this->t('Premium Rate: @premium_rate', ['@premium_rate' => $rate_group_format]) . '</strong></p>';
      }
      else {
        $info_markup = '<p><strong>' . $this->t('Rate Group: @rate_group', ['@rate_group' => $rate_group->title->value]) . '</strong></p>';
        $info_markup .= '<p><strong>' . $this->t('Premium Rate: @premium_rate', ['@premium_rate' => $rate_group_format]) . '</strong></p>';
      }
      $form['info'] = [
        '#type' => 'markup',
        '#markup' => $info_markup,
      ];

      $form['frequency'] = [
        '#type' => 'select',
        '#title' => $this->t('What is your reporting frequency?'),
        '#description' => $this->t("Your 'reporting frequency' is your schedule for reporting and paying premiums – either annually, quarterly or monthly."),
        '#empty_value' => '',
        '#empty_option' => $this->t('Choose one'),
        '#options' => [
          'annual' => $this->t('Annual'),
          'quarterly' => $this->t('Quarterly'),
          'monthly' => $this->t('Monthly'),
        ],
      ];

      $form['insurance'] = [
        '#type' => 'number',
        '#title' => $this->t('What are the annual insurable earnings for the workers in this rate group?'),
        '#step' => '0.01',
      ];

      $form['rate'] = [
        '#type' => 'hidden',
        '#value' => $rate_group->field_premium_rate->value,
      ];

      $form['calculate'] = [
        '#type' => 'button',
        '#name' => 'calculate',
        '#value' => $this->t('Calculate'),
        '#ajax' => [
          'callback' => [$this, 'calculatePremium'],
        ],
        '#limit_validation_errors' => [],
      ];

      $form['result'] = [
        '#type' => 'markup',
        '#markup' => '<div class="estimate-result visually-hidden"></div>',
      ];

      $more_info_markup = '<div class="form-more-info visually-hidden"><p>' . $this->t('Your premium payment amounts may vary depending on your actual payroll in each payment period.') . '</p>';
      $more_info_markup .= '<p>' . $this->t('For more help calculating your exact premium, contact:') . '</p>';
      $more_info_markup .= '<p>' . $this->t('Employer Service Centre') . '</p>';
      $more_info_markup .= '<p>' . $this->t('between 7:30 a.m. and 5:00 p.m.') . '</p>';
      $more_info_markup .= '<p>' . $this->t('Telephone: <a href="@phone">416-344-1000</a>', ['@phone' => 'tel:+14163441000']) . '</p>';
      $more_info_markup .= '<p>' . $this->t('Toll Free: <a href="@toll_free">1-800-387-0750</a>', ['@toll_free' => 'tel:+18003870750']) . '</p>';
      $more_info_markup .= '<p>' . $this->t('TTY: <a href="@tty">1-800-387-0050</a>', ['@tty' => 'tel:+18003870050']) . '</p>';
      $more_info_markup .= '<p>' . $this->t('For more health and safety information, <a href="@website">www.healthandsafetyontario.ca</a>', ['@website' => 'http://www.healthandsafetyontario.ca']) . '</p></div>';

      $form['more_info'] = [
        '#type' => 'markup',
        '#markup' => $more_info_markup,
      ];

      $form['new_estimate_container'] = [
        '#type' => 'container',
        '#attributes' => [
          'class' => [
            'new-estimate-container',
          ],
        ],
      ];

      $form['new_estimate_container']['new_estimate'] = [
        '#type' => 'link',
        '#title' => $this->t('Get another estimate'),
        '#url' => Url::fromRoute('entity.node.canonical', ['node' => 8431]),
        '#attributes' => [
          'class' => [
            'new-estimate',
            'visually-hidden',
          ],
        ],
      ];

      $form['actions']['#type'] = 'actions';
      return $form;
    }
  }

  /**
   * Helper function to calculate premium value.
   *
   * @param array $form
   *   Form element.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   Form state.
   */
  public function calculatePremium(array &$form, FormStateInterface &$form_state) {
    $response = new AjaxResponse();

    $response->addCommand(new RemoveCommand('.error-message'));

    $value = $form_state->getValue('insurance');

    $validate = $this->customValidation($value);

    if (!empty($validate)) {
      $response->addCommand(
        new BeforeCommand(
          '#edit-insurance',
          '<p class="error-message">' . $validate . '</p>')
      );
      $response->addCommand(
        new ReplaceCommand(
          '.estimate-result',
          '<div class="estimate-result visually-hidden"></div>')
      );
    }
    else {
      $rate = $form_state->getValue('rate');
      $frequency = $form_state->getValue('frequency');

      $divisor = 1;
      $freq = $this->t('annual');
      if ($frequency === 'quarterly') {
        $divisor = 4;
        $freq = $this->t('quarterly');
      }
      elseif ($frequency === 'monthly') {
        $divisor = 12;
        $freq = $this->t('monthly');
      }

      $est_earnings = round($value / $divisor, 2, PHP_ROUND_HALF_EVEN);
      $est_premium = round($est_earnings * ($rate / 100), 2, PHP_ROUND_HALF_EVEN);

      $freq = ' ' . $freq;
      $freq_fr = NULL;
      $pref_currency = ' $ ';
      $suf_currency = NULL;
      $earnings = number_format($est_earnings, 2, '.', ',');
      $premium = number_format($est_premium, 2, '.', ',');
      if ($this->language === 'fr') {
        $freq_fr = $freq;
        $freq = NULL;
        $suf_currency = $pref_currency;
        $pref_currency = NULL;
        $earnings = number_format($est_earnings, 2, ',', ' ');
        $premium = number_format($est_premium, 2, ',', ' ');
      }

      $estimation_result = '<div class="estimate-result"><p class="estimated-value">' . $this->t('Estimated@freq_en insurable earnings@freq_fr: @pref_currency @earnings @suf_currency', [
        '@freq_en' => $freq,
        '@freq_fr' => $freq_fr,
        '@pref_currency' => $pref_currency,
        '@earnings' => $earnings,
        '@suf_currency' => $suf_currency,
      ]) . '</p>';

      $estimation_result .= '<p class="estimated-value">' . $this->t('Estimated@freq_en premium amount@freq_fr: @pref_currency @premium @suf_currency', [
        '@freq_en' => $freq,
        '@freq_fr' => $freq_fr,
        '@pref_currency' => $pref_currency,
        '@premium' => $premium,
        '@suf_currency' => $suf_currency,
      ]) . '</p></div>';

      $response->addCommand(
        new ReplaceCommand(
          '.estimate-result',
          $estimation_result)
      );
      $response->addCommand(new InvokeCommand('.form-more-info', 'removeClass', ['visually-hidden']));
      $response->addCommand(new InvokeCommand('.new-estimate', 'removeClass', ['visually-hidden']));
    }
    return $response;
  }

  /**
   * Helper function to validate form on AJAX calling.
   *
   * @param string $value
   *   Given value from from state.
   *
   * @return string
   *   Message if validation fails. FALSE if none fails.
   */
  protected function customValidation($value) {
    if ((float) ($value) <= 0) {
      return $this->t('Insurable earnings must be a valid number.');
    }
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
  }

}
