<?php

namespace Drupal\wsib_premium_estimator\Plugin\QueueWorker;

/**
 * Provides parsing and saving functionality for Premium Estimator data.
 *
 * @QueueWorker(
 *   id = "wsib_premium_estimator_import_save_data_manual",
 *   title = @Translation("Save Premium Estimator data manually"),
 * )
 */
class EstimatorImportSaveManual extends EstimatorImportSaveBase {}
