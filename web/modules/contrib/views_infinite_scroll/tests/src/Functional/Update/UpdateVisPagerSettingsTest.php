<?php

namespace Drupal\Tests\views_infinite_scroll\Functional\Update;

use Drupal\FunctionalTests\Update\UpdatePathTestBase;

/**
 * Tests adding default option to VIS pager.
 *
 * @group Update
 * @group views_infinite_scroll
 */
class UpdateVisPagerSettingsTest extends UpdatePathTestBase {

  /**
   * {@inheritdoc}
   */
  protected function setDatabaseDumpFiles() {
    $this->databaseDumpFiles = [
      DRUPAL_ROOT . '/core/modules/system/tests/fixtures/update/drupal-8.bare.standard.php.gz',
      __DIR__ . '/../../../fixtures/update/views_infinite_scroll.2852080.php',
    ];
  }

  /**
   * Testing of VIS pager updating.
   *
   * @see views_infinite_scroll_post_update_different_items_count()
   */
  public function testUpdateInitialItemsCountSettings() {
    $before_update = \Drupal::configFactory()->get('views.view.test_settings_updates');
    $adv_settings = $before_update->get('display.default.display_options.pager.options.views_infinite_scroll.initial');
    $this->assertNull($adv_settings, 'No initial value.');

    $this->runUpdates();

    $after_update = \Drupal::configFactory()->get('views.view.test_settings_updates');
    $adv_settings = $after_update->get('display.default.display_options.pager.options.views_infinite_scroll.initial');
    $this->assertSame(0, $adv_settings, 'Initial count on first page setting is present after update.');
  }

}
