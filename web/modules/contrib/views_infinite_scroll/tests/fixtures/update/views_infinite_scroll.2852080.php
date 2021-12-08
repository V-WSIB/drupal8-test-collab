<?php

/**
 * @file
 * Test fixture for 2852080.
 *
 * @see https://www.drupal.org/project/views_infinite_scroll/issues/2852080
 */

use Drupal\Core\Database\Database;
use Drupal\Core\Serialization\Yaml;

$connection = Database::getConnection();

/** @var Drupal\Core\Database\Driver\sqlite\Statement $ext */
$ext = $connection->select('config')
  ->fields('config', ['data'])
  ->where("name = 'core.extension'")
  ->execute();

$ext = unserialize($ext->fetchObject()->data);
$ext['module']['views_infinite_scroll'] = 0;

$connection->update('config')
  ->fields([
    'data' => serialize($ext),
  ])
  ->where("name = 'core.extension'")
  ->execute();

$connection->insert('config')
  ->fields([
    'collection' => '',
    'name' => 'views.view.test_settings_updates',
    'data' => serialize(Yaml::decode(file_get_contents(__DIR__ . '/views.view.test_settings_updates.yml'))),
  ])
  ->execute();
