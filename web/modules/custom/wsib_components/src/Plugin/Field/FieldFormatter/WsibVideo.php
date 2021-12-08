<?php

namespace Drupal\wsib_components\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Render\RendererInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\video_embed_field\Plugin\Field\FieldFormatter\Colorbox;
use Drupal\video_embed_field\Plugin\Field\FieldFormatter\Thumbnail;
use Drupal\video_embed_field\Plugin\Field\FieldFormatter\Video;
use Drupal\fiera_video\Plugin\Field\FieldFormatter\FieraThumbnail;
use Drupal\video_embed_field\ProviderManagerInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Component\Utility\Html;
use Drupal\field\Entity\FieldConfig;
use Drupal\Core\Link;
use Drupal\Core\Url;

/**
 * Plugin implementation of the special video field formatter.
 *
 * @FieldFormatter(
 *   id = "wsib_components_video_colorbox",
 *   label = @Translation("Wsib Video Colorbox Modal or Embed"),
 *   field_types = {
 *     "video_embed_field"
 *   }
 * )
 */
class WsibVideo extends Colorbox implements ContainerFactoryPluginInterface {
  /**
   * The field formatter plugin instance for thumbnails.
   *
   * @var \Drupal\Core\Field\FormatterInterface
   */
  protected $thumbnailFormatter;

  /**
   * The field formatterp plguin instance for videos.
   *
   * @var \Drupal\Core\Field\FormatterInterface
   */
  protected $videoFormatter;

  /**
   * Allow us to attach colorbox settings to our element.
   *
   * @var \Drupal\colorbox\ElementAttachmentInterface
   */
  protected $colorboxAttachment;

  /**
   * The renderer.
   *
   * @var \Drupal\Core\Render\RendererInterface
   */
  protected $renderer;

  /**
   * The embed provider plugin manager.
   *
   * @var \Drupal\video_embed_field\ProviderManagerInterface
   */
  protected $providerManager;

  /**
   * The logged in user.
   *
   * @var \Drupal\Core\Session\AccountInterface
   */
  protected $currentUser;


  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = [];
    $thumbnails = $this->thumbnailFormatter->viewElements($items, $langcode);
    $videos = $this->videoFormatter->viewElements($items, $langcode);
    if (!empty($items)) {
      $main = reset($items);
      $main = reset($main);
      if (isset($main) && is_object($main)) {
        $node = $main->getEntity();
        if (isset($node->field_video_display)) {
          $display_mode = $node->field_video_display->getValue();
        }
        if (!empty($display_mode)) {
          $display_mode = reset($display_mode);
          $display_mode = $display_mode['value'];
        }
      }
    }
    if ((isset($display_mode) && $display_mode == 'modal') || !isset($display_mode)) {
      foreach ($items as $delta => $item) {
        // Support responsive videos within the colorbox modal.
        if ($this->getSetting('responsive')) {
          $videos[$delta]['#attributes']['class'][] = 'video-embed-field-responsive-modal';
          $videos[$delta]['#attributes']['style'] = sprintf('width:%dpx;', $this->getSetting('modal_max_width'));
        }
        $element[$delta] = [
          '#type' => 'link',
          '#title' => '',
          '#url' => Url::fromUserInput('#modal-launch'),
          '#attributes' => [
            'data-video-embed-field-modal' => (string) $this->renderer->render($videos[$delta]),
            'class' => ['video-embed-field-launch-modal'],
            'role' => 'button',
            'aria-label' => $this->t('Embedded Video, opens a pop up dialog'),
          ],
          '#attached' => [
            'library' => [
              'video_embed_field/colorbox',
              'video_embed_field/responsive-video',
              'wsib_components/video-button',
            ],
          ],
          // Ensure the cache context from the video formatter which was rendered
          // early still exists in the renderable array for this formatter.
          '#cache' => [
            'contexts' => ['user.permissions'],
          ],
          'children' => $thumbnails[$delta],
        ];
      }
      $this->colorboxAttachment->attach($element);
    }
    elseif ((isset($display_mode) && $display_mode == 'embedded')) {
      foreach ($items as $delta => $item) {
        $provider = $this->providerManager->loadProviderFromInput($item->value);

        if (!$provider) {
          $element[$delta] = ['#theme' => 'video_embed_field_missing_provider'];
        }
        else {
          $autoplay = $this->currentUser->hasPermission('never autoplay videos') ? FALSE : $this->getSetting('autoplay');
          $element[$delta] = $provider->renderEmbedCode($this->getSetting('width'), $this->getSetting('height'), $autoplay);
          $element[$delta]['#cache']['contexts'][] = 'user.permissions';

          $element[$delta] = [
            '#type' => 'container',
            '#attributes' => ['class' => [Html::cleanCssIdentifier(sprintf('video-embed-field-provider-%s', $provider->getPluginId()))]],
            'children' => $element[$delta],
          ];

          // For responsive videos, wrap each field item in it's own container.
          if ($this->getSetting('responsive')) {
            $element[$delta]['#attached']['library'][] = 'video_embed_field/responsive-video';
            $element[$delta]['#attributes']['class'][] = 'video-embed-field-responsive-video';
          }
        }
      }
    }

    return $element;
  }

  /**
   * Constructs a new instance of the plugin.
   *
   * @param string $plugin_id
   *   The plugin_id for the formatter.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Field\FieldDefinitionInterface $field_definition
   *   The definition of the field to which the formatter is associated.
   * @param array $settings
   *   The formatter settings.
   * @param string $label
   *   The formatter label display setting.
   * @param string $view_mode
   *   The view mode.
   * @param array $third_party_settings
   *   Third party settings.
   * @param \Drupal\Core\Render\RendererInterface $renderer
   *   The renderer.
   * @param \Drupal\Core\Field\FormatterInterface $thumbnail_formatter
   *   The field formatter for thumbnails.
   * @param \Drupal\Core\Field\FormatterInterface $video_formatter
   *   The field formatter for videos.
   * @param \Drupal\colorbox\ElementAttachmentInterface|null $colorbox_attachment
   *   The colorbox attachment if colorbox is enabled.
   * @param \Drupal\video_embed_field\ProviderManagerInterface $provider_manager
   *   The video embed provider manager.
   * @param \Drupal\Core\Session\AccountInterface $current_user
   *   The logged in user.
   */
  public function __construct($plugin_id, $plugin_definition, FieldDefinitionInterface $field_definition, $settings, $label, $view_mode, $third_party_settings, RendererInterface $renderer, FormatterInterface $thumbnail_formatter, FormatterInterface $video_formatter, $colorbox_attachment, ProviderManagerInterface $provider_manager, AccountInterface $current_user) {
    parent::__construct($plugin_id, $plugin_definition, $field_definition, $settings, $label, $view_mode, $third_party_settings, $renderer, $thumbnail_formatter, $video_formatter, $colorbox_attachment);
    $this->providerManager = $provider_manager;
    $this->currentUser = $current_user;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    $formatter_manager = $container->get('plugin.manager.field.formatter');
    return new static(
      $plugin_id,
      $plugin_definition,
      $configuration['field_definition'],
      $configuration['settings'],
      $configuration['label'],
      $configuration['view_mode'],
      $configuration['third_party_settings'],
      $container->get('renderer'),
      $formatter_manager->createInstance('wsib_components_video_thumbnail', $configuration),
      $formatter_manager->createInstance('video_embed_field_video', $configuration),
      $container->get('colorbox.attachment'),
      $container->get('video_embed_field.provider_manager'),
      $container->get('current_user')
    );
  }
}
