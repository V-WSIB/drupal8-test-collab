<?php

namespace Drupal\wsib_search\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Wsib Search Files Trigger' block.
 *
 * @Block(
 *   id = "general_search_files_block",
 *   admin_label = @Translation("WSIB General Search Files Trigger Block"),
 * )
 */
class FilesSearchContentBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $form = \Drupal::formBuilder()->getForm('Drupal\wsib_search\Form\FilesSearchContentForm');
    $helper = \Drupal::service('wsib_layouts.layouts_helpers');
    $data[] = ['nid' => 8161, 'title' => 'Web pages', 'classes' => ['tab']];
    $data[] = ['nid' => 8166, 'title' => 'PDFs', 'classes' => ['tab', 'active']];
    $tabs = $helper->buildTabs($data);
    $build['#form'] = $form;
    $build['#tabs'] = $tabs;
    $build['#theme'] = 'wsib_search_block';
    return $build;
  }

}
