<?php

namespace Drupal\wsib_report_fraud\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\file\Entity\File;
use Drupal\Core\File\FileSystem;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Language\LanguageManager;
use Drupal\Core\Routing\RouteProvider;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Containd Report Fraud Form.
 */
class ReportFraudForm extends ConfigFormBase {

  /**
   * Provides helpers to operate on files and stream wrappers.
   *
   * @var \Drupal\Core\File\FileSystem
   */
  protected $fileSystem;

  /**
   * Provides language support on language-unaware sites.
   *
   * @var \Drupal\Core\Language\LanguageManager
   */
  protected $languageManager;

  /**
   * A Route Provider front-end for all Drupal-stored routes.
   *
   * @var \Drupal\Core\Routing\RouteProvider
   */
  protected $routeProvider;

  /**
   * {@inheritdoc}
   */
  public function __construct(FileSystem $file_system, LanguageManager $language_manager, RouteProvider $route_provider) {
    $this->fileSystem = $file_system;
    $this->languageManager = $language_manager;
    $this->routeProvider = $route_provider;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('file_system'),
      $container->get('language_manager'),
      $container->get('router.route_provider')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'wsib_report_fraud_form';
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
  public function buildForm(array $form, FormStateInterface $form_state, $email = NULL, $attachment = NULL) {



    $form['subject'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Subject'),
    ];

    $form['message'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Your message to sileads@wsib.on.ca'),
    ];

    $form['help'] = [
      '#type' => 'markup',
      '#markup' => $attachment,
    ];

    $form['file'] = [
      '#type' => 'managed_file',
      '#title' => 'Upload Files',
      '#multiple' => TRUE,
      '#size' => 10,
      '#upload_location' => 'private://report_fraud',
      '#upload_validators' => [
        'file_validate_extensions' => ['csv xls xlsx pdf txt jpg png'],
        'file_validate_size' => [10485760],
      ],
    ];

    $form['actions']['#type'] = 'actions';

    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#name' => 'submit',
      '#value' => $this->t('Send'),
      '#button_type' => 'primary',
    ];

    $form['actions']['cancel'] = [
      '#type' => 'link',
      '#title' => $this->t('Cancel'),
      '#url' => Url::fromRoute('<front>'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    if ($form_state->isMethodType('POST') && $form_state->isSubmitted()) {
      $subject = $form_state->getValue('subject');
      $message = $form_state->getValue('message');
      $files = $form_state->getValue('file');

      $attachments = [];

      foreach ($files as $fid) {
        $file = File::load($fid);
        $file_data = [
          'filepath' => \Drupal::service('file_system')->realpath($file->uri->value),
          'filename' => $file->get('filename')->value,
          'filemime' => $file->get('filemime')->value,
        ];
        $attachments[] = $file_data;
      }

      $result = $this->sendEmail($subject, $message, $attachments);

      if ($result) {
        // Redirect to Fraund info page.
        $lang = $this->languageManager->getCurrentLanguage()->getId();
        $redirect_route = 'wsib_report_fraud.info_page_' . $lang;
        $check_route = $this->routeProvider->getRoutesByNames([$redirect_route]);
        if (count($check_route) === 1 && !empty($check_route[$redirect_route])) {
          $form_state->setRedirect($redirect_route);
        }
        else {
          $form_state->setRedirect('wsib_report_fraud.info_page');
        }
        drupal_set_message($this->t('Your report has been successfully sent.'), 'status');
      }
      // If error on sending email.
      else {
        drupal_set_message($this->t('An error occurred while sending your report. Please try again later.'), 'error');
      }
    }
  }

  /**
   * Helper function to send report by email.
   *
   * @param string $subject
   *   Field Subject content from form.
   * @param string $body
   *   Field Message content from form.
   * @param array $attachments
   *   Attachments information.
   *
   * @return bool
   *   Result of sending email - TRUE if success, FALSE if error.
   */
  protected function sendEmail($subject, $body, array $attachments) {
    $config = $this->config('wsib_report_fraud.settings');
    $mailManager = \Drupal::service('plugin.manager.mail');
    $module = 'wsib_report_fraud';
    $key = 'report_fraud_submission';
    $to = $config->get('destination_email');
    $params = [
      'subject' => $subject,
      'message' => $body,
      'attachments' => $attachments,
    ];
    $langcode = \Drupal::currentUser()->getPreferredLangcode();
    $send = TRUE;
    $result = $mailManager->mail($module, $key, $to, $langcode, $params, NULL, $send);

    if ($result['result'] !== TRUE) {
      \Drupal::logger('report_fraud_submission')->notice('Error sending email');
      return FALSE;
    }
    else {
      \Drupal::logger('report_fraud_submission')->notice('Email sent successfully');
      return TRUE;
    }
  }

}
