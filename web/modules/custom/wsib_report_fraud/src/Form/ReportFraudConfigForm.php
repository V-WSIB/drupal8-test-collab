<?php

namespace Drupal\wsib_report_fraud\Form;

use Drupal\Core\Form\ConfigFormBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Contains Report Fraud Configuration Form.
 */
class ReportFraudConfigForm extends ConfigFormBase {
  /**
   * Provides an interface for entity type managers.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityManager;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function __construct(EntityTypeManagerInterface $entityManager) {
    $this->entity_manager = $entityManager;
  }

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
    return 'wsib_report_fraud_config_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('wsib_report_fraud.settings');
    $email = $config->get('destination_email');
    $disclaimer = $config->get('disclaimer');
    $disclaimer_yes_nid = $config->get('disclaimer_yes');
    $disclaimer_no_nid = $config->get('disclaimer_no');
    $confirmation = $config->get('confirmation');
    $attachment = $config->get('attachment');

    $form['help'] = [
      '#type' => 'markup',
      '#markup' => $this->t('Settings for Report Fraud Form'),
    ];

    $form['destination_email'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Email address to send reports to:'),
      '#default_value' => ($email) ? $email : '',
      '#size' => 60,
      '#maxlength' => 512,
    ];

    $form['disclaimer'] = [
      '#type' => 'text_format',
      '#title' => $this->t('Disclaimer Text:'),
      '#format' => 'full_html',
      '#default_value' => $disclaimer['value'],
    ];

    $disclaimer_yes = $this->entity_manager->getStorage('node')->load($disclaimer_yes_nid);
    $disclaimer_no = $this->entity_manager->getStorage('node')->load($disclaimer_no_nid);

    $form['disclaimer_yes'] = [
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('Page to redirect to when "Yes" chosen on Disclaimer page:'),
      '#target_type' => 'node',
      '#selection_settings' => [
        'target_bundles' => ['page'],
      ],
      '#default_value' => $disclaimer_yes,
      '#required' => TRUE,
    ];

    $form['disclaimer_no'] = [
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('Page to redirect to when "No" chosen on Disclaimer page:'),
      '#target_type' => 'node',
      '#selection_settings' => [
        'target_bundles' => ['page'],
      ],
      '#default_value' => $disclaimer_no,
      '#required' => TRUE,
    ];

    $form['confirmation'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Confirmation Text:'),
      '#default_value' => $confirmation,
    ];

    $form['attachment'] = [
      '#type' => 'text_format',
      '#title' => $this->t('Attachment Help Text:'),
      '#format' => 'full_html',
      '#default_value' => $attachment['value'],
    ];

    $form['actions']['#type'] = 'actions';

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Save configuration.
    $this->config('wsib_report_fraud.settings')
      ->set('attachment', $form_state->getValue('attachment'))
      ->set('confirmation', $form_state->getValue('confirmation'))
      ->set('disclaimer', $form_state->getValue('disclaimer'))
      ->set('disclaimer_no', $form_state->getValue('disclaimer_no'))
      ->set('disclaimer_yes', $form_state->getValue('disclaimer_yes'))
      ->set('destination_email', $form_state->getValue('destination_email'))
      ->save();

    parent::submitForm($form, $form_state);
  }

}
