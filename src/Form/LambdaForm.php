<?php

namespace Drupal\lambda_form\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class LambdaForm.
 */
class LambdaForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'lambda_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Name'),
      '#required' => TRUE,
      '#maxlength' => 64,
      '#size' => 64,
    ];

    $form['email'] = [
      '#type' => 'email',
      '#required' => TRUE,
      '#title' => $this->t('Email'),
    ];

    $form['content'] = [
      '#type' => 'textarea',
      '#required' => TRUE,
      '#title' => $this->t('Content'),
    ];

    $form['toast'] = [
      '#type' => 'container',
      '#attributes' => ['class' => ['toast']],
    ];

    $form['actions'] = ['#type' => 'actions'];
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Submit'),
    ];

    $form['#action'] = $this->config('lambda_form.settings')->get('endpoint');
    $form['#attached']['library'][] = 'lambda_form/form-handler';

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Display result.
    foreach ($form_state->getValues() as $key => $value) {
      drupal_set_message($key . ': ' . $value);
    }

  }

}
