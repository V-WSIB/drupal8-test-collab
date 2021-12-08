<?php

namespace Drupal\wsib_components\Plugin\Filter;

use Drupal\filter\Plugin\FilterBase;
use Drupal\filter\FilterProcessResult;

/**
 * @Filter(
 *   id = "wsib_docs_urls_filter",
 *   title = @Translation("WSIB Documents URLs Filter"),
 *   description = @Translation("Documents URLs filter to transform urls to nodes to the download urls to file"),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_MARKUP_LANGUAGE,
 * )
 */
class WsibDocumentsUrlsFilter extends FilterBase {

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    $text = preg_replace_callback('/href=\"([^"]+)"/', [&$this, 'process_docs_urls'], $text);
    return new FilterProcessResult($text);
  }

  /**
   * Callback function for pregreplace.
   *
   * @param array $matches
   *   Array of reg exp matches.
   *
   * @return string
   *   Updated match value.
   */
  protected function process_docs_urls(array $matches) {
    if (isset($matches[1])) {
      $urls = explode('/', $matches[1]);
      unset($urls[0]);
      // Checking if the node has alias.
      $match = implode('/', $urls);
      if (strpos($match, '/node/') === FALSE) {
        $match = str_replace("en/", "/", $match);
        $match = str_replace("fr/", "/", $match);
        $match = \Drupal::service('path.alias_manager')->getPathByAlias($match);
        if (isset($match)) {
          $match = explode('/', $match);
          if (isset($match[1]) && isset($match[2])) {
            // First one is empty.
            $urls[2] = $match[1];
            $urls[3] = $match[2];
          }

        }
      }
      if (isset($urls[2]) && $urls[2] == 'node' && isset($urls[3]) && is_numeric($urls[3])) {
        $node = \Drupal::entityTypeManager()->getStorage('node')->load($urls[3]);
        $lang = \Drupal::languageManager()->getCurrentLanguage()->getId();
        if ($node->hasTranslation($lang)) {
          $node = $node->getTranslation($lang);
        }
        $bundles = ['document'];
        if (isset($node) && is_object($node) && in_array($node->bundle(), $bundles)) {
          $file = $node->field_attachment_file->getValue();
          $file = reset($file);

          if (isset($file['target_id'])) {
            $file = \Drupal::entityTypeManager()->getStorage('file')->load($file['target_id']);
            $url = $file->getFileUri();
            $url = file_create_url($url);
            if (isset($url)) {
              $matches[0] = preg_replace('/href=\"([^"]+)"/', 'href="' . $url . '"', $matches[0]);

            }
          }
        }
      }
    }
    return $matches[0];
  }

}
