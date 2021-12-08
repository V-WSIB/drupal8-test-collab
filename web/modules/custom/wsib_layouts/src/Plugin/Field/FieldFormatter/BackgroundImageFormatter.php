<?php

namespace Drupal\wsib_layouts\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Url;

/**
 * Plugin implementation of Background Image URL formatter.
 *
 * @FieldFormatter(
 *   id = "background_image",
 *   label = @Translation("Background Image Formatter"),
 *   field_types = {
 *     "image"
 *   }
 * )
 */
class BackgroundImageFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];
    foreach ($items as $delta => $item) {
      $fid = $item->getValue('target_id');
      if (isset($fid['target_id'])) {
        $fid = $fid['target_id'];
        $file = \Drupal::entityTypeManager()->getStorage('file')->load($fid);
        $uri = $file->getFileUri();
        $elements[$delta]['#url'] = Url::fromUri(file_create_url($uri))->toString();
        $elements[$delta]['#theme'] = 'background_image_formatter';
        $elements[0]['#attached']['library'][] = 'wsib_layouts/blazy_init';
      }
    }
    return $elements;
  }

}
