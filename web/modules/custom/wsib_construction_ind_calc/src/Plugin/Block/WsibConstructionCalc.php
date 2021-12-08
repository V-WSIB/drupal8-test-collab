<?php

namespace Drupal\wsib_construction_ind_calc\Plugin\Block;
use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'WsibConstructionCalc' block.
 *
 * @Block(
 *   id = "wsib_constr_calc",
 *   admin_label = @Translation("WSIB Construction Industry Calculator"),
 * )
 */
class WsibConstructionCalc extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $node = \Drupal::routeMatch()->getParameter('node');
    if (isset($node)) {
      $build['#cache'] = [
        'contexts' => ['url.path'],
        'max-age' => $node->getCacheMaxAge(),
      ];
    }
    $build['#theme'] = 'wsib_constr_calc';
    $build['#attached']['library'][] = 'wsib_construction_ind_calc/constr_calc';
    return $build;
  }

}
