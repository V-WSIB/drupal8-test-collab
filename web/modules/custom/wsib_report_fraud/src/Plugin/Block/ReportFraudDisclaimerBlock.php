<?php

namespace Drupal\wsib_report_fraud\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides 'WSIB Report Fraud Disclaimer' block.
 *
 * @Block(
 *   id = "wsib_report_fraud_disclaimer_block",
 *   admin_label = @Translation("WSIB Report Fraud Disclaimer Block"),
 * )
 */
class ReportFraudDisclaimerBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $config = \Drupal::config('wsib_report_fraud.settings');
    $build = [];
    $build['disclaimer'] = [
      '#type' => 'markup',
      '#markup' => $config->get('disclaimer')['value'],
    ];
    $build['form'] = \Drupal::formBuilder()->getForm('Drupal\wsib_report_fraud\Form\ReportFraudDisclaimerForm', $config->get('confirmation'));
    return $build;
  }

}
