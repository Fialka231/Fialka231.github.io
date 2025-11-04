<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

$ico = preg_replace('/\D/', '', $_GET['ico'] ?? '');
if (!preg_match('/^\d{8}$/', $ico)) {
  http_response_code(400);
  echo json_encode(['error' => 'Neplatné IČO. Očekáváno 8 číslic.']);
  exit;
}

$u = "https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/$ico";
$opts = ['http' => ['header' => "Accept: application/json\r\n"]];
$ctx = stream_context_create($opts);
$body = @file_get_contents($u, false, $ctx);

if ($body === false) {
  http_response_code(502);
  echo json_encode(['error' => 'Chyba při volání ARES']);
  exit;
}

echo $body;
