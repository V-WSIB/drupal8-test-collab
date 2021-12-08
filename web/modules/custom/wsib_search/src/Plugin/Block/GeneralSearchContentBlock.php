<?php

namespace Drupal\wsib_search\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Wsib Search Content Trigger' block.
 *
 * @Block(
 *   id = "general_search_content_block",
 *   admin_label = @Translation("WSIB General Search Content Trigger Block"),
 * )
 */
class GeneralSearchContentBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $form = \Drupal::formBuilder()->getForm('Drupal\wsib_search\Form\GeneralSearchContentForm');
    $helper = \Drupal::service('wsib_layouts.layouts_helpers');
    $data[] = [
      'nid' => 8161,
      'title' => 'Web pages',
      'classes' => [
        'tab',
        'active',
      ],
    ];
    $data[] = [
      'nid' => 8166,
      'title' => 'PDFs',
      'classes' => [
        'tab',
      ],
    ];
    $tabs = $helper->buildTabs($data);
    $build['#form'] = $form;
    $build['#tabs'] = $tabs;
    $build['#theme'] = 'wsib_search_block';
    return $build;
  }

}
