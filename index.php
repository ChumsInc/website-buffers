<?php

use chums\ui\WebUI2;
use chums\user\Groups;

require_once "autoload.inc.php";

$ui = new WebUI2([
    'requiredRoles' => [Groups::PRODUCTION, Groups::CS, Groups::WEB_ADMIN],
    'title' => 'Website Items and Buffers',
    'bodyClassName' => 'container-fluid'
]);
$ui->addManifestJSON('public/js/manifest.json')
    ->render();
