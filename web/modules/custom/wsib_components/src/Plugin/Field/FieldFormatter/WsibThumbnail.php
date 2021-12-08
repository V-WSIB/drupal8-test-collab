<?php

namespace Drupal\wsib_components\Plugin\Field\FieldFormatter;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Url;
use Drupal\image\Entity\ImageStyle;
use Drupal\video_embed_field\ProviderManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\video_embed_field\Plugin\Field\FieldFormatter\Colorbox;
use Drupal\video_embed_field\Plugin\Field\FieldFormatter\Thumbnail;
use Drupal\video_embed_field\Plugin\Field\FieldFormatter\Video;

/**
 * Plugin implementation of the thumbnail field formatter.
 *
 * @FieldFormatter(
 *   id = "wsib_components_video_thumbnail",
 *   label = @Translation("WSIB Video Thumbnail"),
 *   field_types = {
 *     "video_embed_field"
 *   }
 * )
 */
class WsibThumbnail extends Thumbnail implements ContainerFactoryPluginInterface {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = [];
    foreach ($items as $delta => $item) {
      $provider = $this->providerManager->loadProviderFromInput($item->value);
      $url = FALSE;
      if ($this->getSetting('link_image_to') == static::LINK_CONTENT) {
        $url = $items->getEntity()->toUrl();
      }
      elseif ($this->getSetting('link_image_to') == static::LINK_PROVIDER) {
        $url = Url::fromUri($item->value);
      }
      $thumb = $item->getEntity()->field_image;
      if (isset($thumb->entity)) {
        $file = $thumb->entity->field_media_image->getValue();
        if (!empty($file)) {
          $file = reset($file);
          $file = \Drupal::EntityTypeManager()->getStorage('file')->load($file['target_id']);
          if (is_object($file)) {
            $uri = $file->getFileUri();
          }
        }
        $element[$delta] = $this->renderThumbnail($this->getSetting('image_style'), $url, $uri);
      }
      else {
        $provider->downloadThumbnail();
        $element[$delta] = $provider->renderThumbnail($this->getSetting('image_style'), $url);
      }

    }
    return $element;
  }

  /**
   * Helper function to generate thumbnails for existing images.
   */
  public function renderThumbnail($image_style, $link_url, $uri) {
    $output = [
      '#theme' => 'image',
      '#uri' => $uri,
    ];

    if (!empty($image_style)) {
      $output['#theme'] = 'image_style';
      $output['#style_name'] = $image_style;
    }

    if ($link_url) {
      $output = [
        '#type' => 'link',
        '#title' => $output,
        '#url' => $link_url,
      ];
    }
    return $output;
  }
}
