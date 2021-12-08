<?php

namespace Drupal\wsib_search\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Base Search Form.
 */
class BaseSearchForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'base_search_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['search_content'] = [
      '#type' => 'textfield',
      '#size' => 60,
      '#maxlength' => 128,
      '#title' => 'Enter search terms',
      '#placeholder' => t('What are you looking for?'),
    ];
    $form['actions']['search'] = [
      '#type' => 'submit',
      '#value' => $this->t('Search'),
      '#button_type' => 'primary',
      '#attributes' => [
        'class' => [
          'element-invisible',
        ],
      ],
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {}

}
