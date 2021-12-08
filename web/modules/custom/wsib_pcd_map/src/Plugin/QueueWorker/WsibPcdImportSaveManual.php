<?php

namespace Drupal\wsib_pcd_map\Plugin\QueueWorker;

/**
 * Provides save functionality for content.
 *
 * @QueueWorker(
 *   id = "wsib_pcd_import_save_manual",
 *   title = @Translation("Manually Save Programs Translation Data")
 * )
 */
class WsibPcdImportSaveManual extends WsibPcdImportSaveBase {}
