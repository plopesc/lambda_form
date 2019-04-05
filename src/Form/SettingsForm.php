<?php

namespace Drupal\lambda_form\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class SettingsForm.
 */
class SettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'lambda_form.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'lambda_form_settings';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('lambda_form.settings');
    $form['endpoint'] = [
      '#type' => 'url',
      '#title' => $this->t('Endpoint URL'),
      '#description' => $this->t('The Lambda endpoint URL'),
      '#maxlength' => 128,
      '#size' => 128,
      '#default_value' => $config->get('endpoint'),
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $this->config('lambda_form.settings')
      ->set('endpoint', $form_state->getValue('endpoint'))
      ->save();
  }

}
