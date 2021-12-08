<?php

namespace Drupal\wsib_search\Form;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * General Search Header Form.
 */
class GeneralSearchHeaderForm extends BaseSearchForm {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'general_search_header_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildForm($form, $form_state);
    unset($form['search_content']);
    $form['search_content_header'] = [
      '#type' => 'textfield',
      '#size' => 60,
      '#maxlength' => 128,
      '#title' => 'Enter search terms',
      '#placeholder' => t('What are you looking for?'),
    ];
    $form['#prefix'] = '<a href="#" class="header-search-trigger">Search</a>';
    $form['search_content_header']['#attributes']['class'][] = 'element-invisible';
    $form['#attached']['library'][] = 'wsib_search/search_trigger_header';
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
    $values = $form_state->getValues();
    $path = Url::fromRoute('entity.node.canonical', [
      'node' => 8161,
      'search' => $values['search_content_header'],
    ]);
    $path = $path->toString();
    $response = new RedirectResponse($path);
    $response->send();
  }

}
