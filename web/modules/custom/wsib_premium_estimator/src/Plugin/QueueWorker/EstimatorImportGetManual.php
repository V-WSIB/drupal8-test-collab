<?php

namespace Drupal\wsib_premium_estimator\Plugin\QueueWorker;

/**
 * Provides read functionality for the CSV file of Premium Estimator data.
 *
 * @QueueWorker(
 *   id = "wsib_premium_estimator_import_get_manual",
 *   title = @Translation("Get Premium Estimator data manually"),
 * )
 */
class EstimatorImportGetManual extends EstimatorImportGetBase {}
