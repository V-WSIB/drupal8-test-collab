<?php

namespace Drupal\wsib_open_data_import\Plugin\QueueWorker;

/**
 * Provides parsing and saving functionality for Open Data.
 *
 * @QueueWorker(
 *   id = "wsib_open_data_import_save_manual",
 *   title = @Translation("Save Open Data manually"),
 * )
 */
class OpenDataImportSaveManual extends OpenDataImportSaveBase {}
