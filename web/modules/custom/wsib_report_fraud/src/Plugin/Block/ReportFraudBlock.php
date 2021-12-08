<?php

namespace Drupal\wsib_report_fraud\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides 'WSIB Report Fraud' block.
 *
 * @Block(
 *   id = "wsib_report_fraud_block",
 *   admin_label = @Translation("WSIB Report Fraud Block"),
 * )
 */
class ReportFraudBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $config = \Drupal::config('wsib_report_fraud.settings');
    $build = [];
    $build['form'] = \Drupal::formBuilder()->getForm('Drupal\wsib_report_fraud\Form\ReportFraudForm', $config->get('destination_email'), $config->get('attachment')['value']);
    return $build;
  }

}
