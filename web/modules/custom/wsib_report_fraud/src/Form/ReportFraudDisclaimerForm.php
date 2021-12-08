<?php

namespace Drupal\wsib_report_fraud\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

/**
 * Contains Report Fraud Disclaimer Form.
 */
class ReportFraudDisclaimerForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['wsib_report_fraud.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'wsib_report_fraud_disclaimer_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $confirmation = NULL) {
    $form['confirmation'] = [
      '#type' => 'radios',
      '#title' => $confirmation,
      '#options' => [
        1 => $this->t('Yes'),
        0 => $this->t('No'),
      ],
    ];

    $form['actions']['#type'] = 'actions';

    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#name' => 'submit',
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
      $confirm = $form_state->getValue('confirmation');
      $config = $this->config('wsib_report_fraud.settings');
      $route_yes = $config->get('disclaimer_yes');
      $route_no = $config->get('disclaimer_no');
      if ($confirm === '1') {
        // User confirmed.
        if (!empty($route_yes)) {
          $url = Url::fromRoute('entity.node.canonical', ['node' => $route_yes]);
        }
        else {
          return $form_state->setRedirect('<front>');
        }
      }
      else {
        // User did not confirm.
        if (!empty($route_yes)) {
          $url = Url::fromRoute('entity.node.canonical', ['node' => $route_no]);
        }
        else {
          return $form_state->setRedirect('<front>');
        }
      }
      return $form_state->setRedirectUrl($url);
    }
  }

}
