<?php

namespace Drupal\wsib_search\Form;

use Drupal\Core\Form\FormStateInterface;

/**
 * General Search Header Form.
 */
class GeneralSearchContentForm extends BaseSearchForm {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'general_search_content_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildForm($form, $form_state);
    $form['#suffix'] = '<a href="#" class="search-trigger">Search</a>';
    $form['#attached']['library'][] = 'wsib_search/search_trigger';
    $form['#attached']['drupalSettings']['search_form_id'] = '#' . str_replace('_', '-', $this->getFormId());
    return $form;
  }

}
