<?php

namespace Drupal\views_infinite_scroll\Plugin\views\pager;

use Drupal\views\Plugin\views\pager\SqlBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Views pager plugin to handle infinite scrolling.
 *
 * @ViewsPager(
 *  id = "infinite_scroll",
 *  title = @Translation("Infinite Scroll"),
 *  short_title = @Translation("Infinite Scroll"),
 *  help = @Translation("A views plugin which provides infinte scroll."),
 *  theme = "views_infinite_scroll_pager"
 * )
 */
class InfiniteScroll extends SqlBase {

  /**
   * {@inheritdoc}
   */
  public function render($input) {
    // Replace tokens in the button text.
    $text = $this->options['views_infinite_scroll']['button_text'];
    if (!empty($text) && strpos($text, '@') !== FALSE) {
      $replacements = [
        '@next_page_count' => $this->getNumberItemsLeft(),
        '@total' => (int) $this->getTotalItems(),
      ];
      $this->options['views_infinite_scroll']['button_text'] = strtr($text, $replacements);
    }

    return [
      '#theme' => $this->themeFunctions(),
      '#options' => $this->options['views_infinite_scroll'],
      '#attached' => [
        'library' => ['views_infinite_scroll/views-infinite-scroll'],
      ],
      '#element' => $this->options['id'],
      '#parameters' => $input,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function defineOptions() {
    $options = parent::defineOptions();
    $options['views_infinite_scroll'] = [
      'contains' => [
        'button_text' => [
          'default' => $this->t('Load More'),
        ],
        'automatically_load_content' => [
          'default' => FALSE,
        ],
        'initial' => [
          'default' => 0,
        ],
      ],
    ];
    return $options;
  }

  /**
   * {@inheritdoc}
   */
  public function summaryTitle() {
    $action = $this->options['views_infinite_scroll']['automatically_load_content'] ? $this->t('Automatic infinite scroll') : $this->t('Click to load');
    return $this->formatPlural($this->options['items_per_page'], '@action, @count item', '@action, @count items', ['@action' => $action, '@count' => $this->options['items_per_page']]);
  }

  /**
   * {@inheritdoc}
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    parent::buildOptionsForm($form, $form_state);
    $form['tags']['#access'] = FALSE;
    $options = $this->options['views_infinite_scroll'];

    $form['views_infinite_scroll'] = [
      '#title' => $this->t('Infinite Scroll Options'),
      '#description' => $this->t('Note: The infinite scroll option overrides and requires the <em>Use AJAX</em> setting for this views display.'),
      '#type' => 'details',
      '#open' => TRUE,
      '#tree' => TRUE,
      '#input' => TRUE,
      '#weight' => -100,
      'button_text' => [
        '#type' => 'textfield',
        '#title' => $this->t('Button Text'),
        '#default_value' => $options['button_text'],
        '#description' => [
          '#theme' => 'item_list',
          '#items' => [
            '@next_page_count -- the next page record count',
            '@total -- the total amount of results returned from the view',
          ],
          '#prefix' => $this->t('The following tokens are supported:'),
        ],
      ],
      'automatically_load_content' => [
        '#type' => 'checkbox',
        '#title' => $this->t('Automatically Load Content'),
        '#description' => $this->t('Automatically load subsequent pages as the user scrolls.'),
        '#default_value' => $options['automatically_load_content'],
      ],
      'initial' => [
        '#type' => 'textfield',
        '#title' => $this->t('Initial items'),
        '#description' => $this->t('The number of items to display initially. Enter 0 for use same as items per page (show more click).'),
        '#default_value' => $options['initial'],
        '#element_validate' => [[$this, 'validateIntegerPositive']],
      ],
    ];
  }

  /**
   * Validate Form value to be integer and positive.
   *
   * @param array $element
   *   The form element to process.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state.
   * @param array $complete_form
   *   The complete form structure.
   */
  public static function validateIntegerPositive(array &$element, FormStateInterface $form_state, array &$complete_form) {
    $value = $element['#value'];
    if ($value !== '' && (!is_numeric($value) || intval($value) != $value || $value < 0)) {
      $form_state->setError($element, t('%name must be a positive integer.', array('%name' => $element['#title'])));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function query() {
    parent::query();

    // Set first page items limit.
    $options = $this->options['views_infinite_scroll'];
    $others_page = $this->options['items_per_page'];
    $limit = !empty($options['initial']) ? $options['initial'] : $others_page;
    $offset = !empty($this->options['offset']) ? $this->options['offset'] : 0;

    if ($this->current_page != 0) {
      $offset = $limit + (($this->current_page - 1) * $others_page) + $offset;
      $limit = $others_page;
    }

    $this->view->query->setLimit($limit);
    $this->view->query->setOffset($offset);
  }

  /**
   * {@inheritdoc}
   */
  public function updatePageInfo() {
    $initial_items = $this->options['views_infinite_scroll']['initial'];
    if (!$initial_items) {
      return parent::updatePageInfo();
    }

    if (!empty($this->options['total_pages'])) {
      if (($this->options['total_pages'] * $this->options['items_per_page']) < $this->total_items) {
        $this->total_items = $this->options['total_pages'] * $this->options['items_per_page'];
      }
    }

    // Don't set pager settings for items per page = 0.
    $items_per_page = $this->getItemsPerPage();
    if (!empty($items_per_page)) {
      // First calculate the total no. of pages taking $initial_items into
      // account. This calculation overrides the logic in
      // Drupal\Core\Pager\Pager::setTotalPages().
      $totalPages = ceil(($this->getTotalItems() - $initial_items) / $items_per_page) + 1;

      // Now create pager so that the result of setTotalPages() will be the same
      // as $totalPages. Very hackish but it saves us from overwriting core's
      // pager class.
      $pager = $this->pagerManager->createPager($totalPages, 1, $this->options['id']);

      if ($this->getCurrentPage() >= $pager->getTotalPages()) {
        $this->setCurrentPage($pager->getTotalPages() - 1);
      }
    }
  }

  /**
   * Returns the number of items in the next page.
   *
   * @return int
   *   The number of items in the next page.
   */
  protected function getNumberItemsLeft() {
    $initial_items = $this->options['views_infinite_scroll']['initial'];
    $items_per_page = (int) $this->view->getItemsPerPage();
    $total = (int) $this->getTotalItems();
    $current_page = (int) $this->getCurrentPage() + 1;

    // Default to the pager amount.
    $next_page_count = $items_per_page;
    // Calculate the remaining items if we are at the 2nd to last page.
    if ($current_page >= (ceil($total / $items_per_page) + $initial_items) - 1) {
      $next_page_count = $total - ($current_page * $items_per_page);
      return $next_page_count;
    }
    return $next_page_count;
  }

}
