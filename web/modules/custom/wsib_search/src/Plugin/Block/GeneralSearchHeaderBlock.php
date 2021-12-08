<?php

namespace Drupal\wsib_search\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Wsib Search Header Trigger' block.
 *
 * @Block(
 *   id = "general_search_header_block",
 *   admin_label = @Translation("WSIB General Search Header Trigger Block"),
 * )
 */
class GeneralSearchHeaderBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $form = \Drupal::formBuilder()->getForm('Drupal\wsib_search\Form\GeneralSearchHeaderForm');
    return $form;
  }

}
