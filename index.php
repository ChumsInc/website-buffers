<?php
/**
 * @package Chums
 * @subpackage 3point5
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2011, steve
 */
require_once "autoload.inc.php";
require_once iUI::ACCESS_FILE;

$bodyPath = "apps/website-buffers";
$title = "Website Items & Buffers";


$ui = new WebUI($bodyPath, $title, '', true, 5);
$ui->bodyClassName = 'container-fluid';

$ui->addManifest('public/js/manifest.json');
$ui->AddCSS("public/styles.css", false, true);

$ui->Send();
