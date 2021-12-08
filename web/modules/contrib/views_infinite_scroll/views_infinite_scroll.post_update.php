<?php

/**
 * @file
 * Post update functions for views_infinite_scroll module.
 */

use Drupal\Core\Config\Entity\ConfigEntityUpdater;
use Drupal\views\Entity\View;

/**
 * Resave views with VIS pager enabled to provide different items count setting.
 */
function views_infinite_scroll_post_update_different_items_count(&$sandbox = NULL) {
  \Drupal::classResolver(ConfigEntityUpdater::class)
    ->update($sandbox, 'view', function (View $view) {
      $to_update = FALSE;
      $display_ids = array_keys($view->get('display'));
      foreach ($display_ids as $display_id) {
        $display = &$view->getDisplay($display_id);
        if (isset($display['display_options']['pager']) && $display['display_options']['pager']['type'] == 'infinite_scroll') {
          $to_update = TRUE;
          $display['display_options']['pager']['options']['views_infinite_scroll']['initial'] = 0;
        }
      }

      return $to_update;
    });
}
