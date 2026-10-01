<?php
/**
 * Contact form endpoint for IB-Klima (static frontend → PHP → Resend HTTPS API).
 *
 * Official Resend API: https://resend.com/docs/api-reference/emails/send-email
 * Base URL: https://api.resend.com
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function json_response(int $status, bool $success, string $message): void
{
    http_response_code($status);
    echo json_encode(
        [
            'success' => $success,
            'message' => $message,
        ],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

function client_error_log(string $message): void
{
    // Never log secrets (API keys). Strip Bearer tokens defensively.
    $safe = preg_replace('/Bearer\s+\S+/i', 'Bearer [redacted]', $message) ?? $message;
    $safe = preg_replace('/re_[A-Za-z0-9_]+/', 're_[redacted]', $safe) ?? $safe;
    error_log('[ib-klima contact] ' . $safe);
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Allow: POST, OPTIONS');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST, OPTIONS');
    json_response(405, false, 'Method not allowed.');
}

// Same-origin check (static site + PHP on the same host). Not a full CSRF token,
 // but rejects obvious cross-site browser posts when Origin/Referer are present.
$allowedHosts = ['ib-klima.pl', 'www.ib-klima.pl', 'localhost', '127.0.0.1'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$checkUrl = $origin !== '' ? $origin : $referer;

if ($checkUrl !== '') {
    $host = strtolower((string) (parse_url($checkUrl, PHP_URL_HOST) ?? ''));
    $hostOk = false;
    foreach ($allowedHosts as $allowed) {
        if ($host === $allowed) {
            $hostOk = true;
            break;
        }
    }
    if (!$hostOk) {
        json_response(403, false, 'Please provide valid information.');
    }
}

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '') {
    json_response(400, false, 'Please provide valid information.');
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    json_response(400, false, 'Please provide valid information.');
}

// Honeypot: real users leave this empty; bots often fill it.
$honeypot = trim((string) ($data['website'] ?? $data['company_url'] ?? ''));
if ($honeypot !== '') {
    // Pretend success so bots do not retry aggressively.
    json_response(200, true, 'Message sent successfully.');
}

$name = trim((string) ($data['name'] ?? ''));
$phone = trim((string) ($data['phone'] ?? ''));
$propertyType = trim((string) ($data['propertyType'] ?? ''));
$location = trim((string) ($data['location'] ?? ''));
$area = trim((string) ($data['area'] ?? ''));
$rooms = trim((string) ($data['rooms'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

$propertyTypeLabels = [
    'mieszkanie-w-bloku' => 'Mieszkanie w bloku',
    'dom-jednorodzinny' => 'Dom jednorodzinny',
    'biuro-lokal-uslugowy' => 'Biuro/lokal usługowy',
];

$propertyLabel = $propertyTypeLabels[$propertyType] ?? null;

$nameLen = mb_strlen($name);
$phoneLen = mb_strlen($phone);
$locationLen = mb_strlen($location);
$areaLen = mb_strlen($area);
$roomsLen = mb_strlen($rooms);
$messageLen = mb_strlen($message);

if (
    $nameLen < 2
    || $nameLen > 80
    || $propertyLabel === null
    || $phoneLen < 9
    || $phoneLen > 20
    || $locationLen > 120
    || $areaLen > 8
    || $roomsLen > 3
    || $messageLen > 1000
) {
    json_response(400, false, 'Please provide valid information.');
}

// Reject control characters that could be used for header injection if fields
// were ever placed into email headers (we only use them in HTML body, but still).
foreach ([$name, $phone, $propertyType, $location, $area, $rooms, $message] as $field) {
    if (preg_match('/[\r\n\0]/', $field) === 1) {
        json_response(400, false, 'Please provide valid information.');
    }
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$rows = [
    ['Imię i nazwisko', $name],
    ['Telefon', $phone],
    ['Typ nieruchomości', $propertyLabel],
    ['Lokalizacja', $location !== '' ? $location : '—'],
    ['Metraż (m2)', $area !== '' ? $area : '—'],
    ['Liczba pomieszczeń', $rooms !== '' ? $rooms : '—'],
    ['Dodatkowe informacje', $message !== '' ? $message : '—'],
];

$htmlParts = ['<p>Nowe zgłoszenie z formularza IB-Klima.</p><ul>'];
foreach ($rows as [$label, $value]) {
    $htmlParts[] = '<li><strong>' . escape_html($label) . ':</strong> ' . escape_html($value) . '</li>';
}
$htmlParts[] = '</ul>';
$html = implode('', $htmlParts);

/**
 * Load secrets from the safest available location.
 *
 * Priority:
 * 1) IB_KLIMA_CONFIG env var (absolute path to a PHP file returning an array)
 * 2) Outside httpdocs: ../private/ib-klima-config.php  (recommended on IDHosting)
 * 3) Outside httpdocs: ../ib-klima-config.php
 * 4) Last resort (discouraged): httpdocs/api/config.php — blocked by .htaccess
 *
 * On IDHosting, httpdocs/api/contact.php → parent of httpdocs is two levels up.
 */
function load_contact_config(): array
{
    $candidates = [];

    $envPath = getenv('IB_KLIMA_CONFIG');
    if (is_string($envPath) && $envPath !== '') {
        $candidates[] = $envPath;
    }

    // __DIR__ = .../httpdocs/api
    $httpdocs = dirname(__DIR__);          // .../httpdocs
    $accountRoot = dirname($httpdocs);     // .../ (parent of httpdocs)

    $candidates[] = $accountRoot . '/private/ib-klima-config.php';
    $candidates[] = $accountRoot . '/ib-klima-config.php';
    // Discouraged public fallback — keep .htaccess deny + PHP direct-access guard.
    $candidates[] = __DIR__ . '/config.php';

    foreach ($candidates as $path) {
        if (!is_string($path) || $path === '' || !is_readable($path)) {
            continue;
        }
        $loaded = require $path;
        if (is_array($loaded)) {
            return $loaded;
        }
    }

    return [];
}

$config = load_contact_config();

$apiKey = getenv('RESEND_API_KEY');
if (!is_string($apiKey) || $apiKey === '') {
    $apiKey = isset($config['resend_api_key']) ? (string) $config['resend_api_key'] : '';
}

$from = isset($config['from']) && is_string($config['from']) && $config['from'] !== ''
    ? $config['from']
    : 'kontakt@ib-klima.pl';
$to = isset($config['to']) && is_string($config['to']) && $config['to'] !== ''
    ? $config['to']
    : 'ib.wyroba@gmail.com';

if ($apiKey === '' || str_starts_with($apiKey, 're_xxxxxxxxx')) {
    client_error_log('RESEND_API_KEY is missing or still a placeholder.');
    json_response(500, false, 'Unable to send message. Please try again later.');
}

$payload = [
    'from' => $from,
    'to' => [$to],
    'subject' => 'Nowe zgłoszenie z formularza IB-Klima',
    'html' => $html,
];

$ch = curl_init('https://api.resend.com/emails');
if ($ch === false) {
    client_error_log('Failed to initialize cURL.');
    json_response(500, false, 'Unable to send message. Please try again later.');
}

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
        // Required by Resend for direct HTTPS API calls (missing UA → HTTP 403).
        'User-Agent: IB-Klima-Contact/1.0',
    ],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    CURLOPT_TIMEOUT => 20,
]);

$responseBody = curl_exec($ch);
$curlErrno = curl_errno($ch);
$curlError = curl_error($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($curlErrno !== 0 || $responseBody === false) {
    client_error_log('cURL error: ' . $curlError);
    json_response(500, false, 'Unable to send message. Please try again later.');
}

if ($httpCode < 200 || $httpCode >= 300) {
    client_error_log('Resend HTTP ' . $httpCode . ' response received (body redacted).');
    json_response(502, false, 'Unable to send message. Please try again later.');
}

json_response(200, true, 'Message sent successfully.');
