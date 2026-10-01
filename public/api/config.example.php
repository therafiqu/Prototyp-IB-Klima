<?php
/**
 * DEPRECATED location for secrets.
 *
 * Do NOT put the real RESEND_API_KEY in httpdocs/api/config.php.
 * Place secrets outside the public web root instead:
 *
 *   ../private/ib-klima-config.php   (relative to httpdocs/)
 *
 * See: private/ib-klima-config.example.php and DEPLOYMENT.md
 *
 * This file remains only as a documented fallback example with placeholders.
 * If a public config.php exists, Apache .htaccess denies HTTP access to it,
 * and the direct-access guard below refuses to leak contents.
 */

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    $script = realpath((string) ($_SERVER['SCRIPT_FILENAME'] ?? ''));
    $self = realpath(__FILE__);
    if ($script !== false && $self !== false && $script === $self) {
        http_response_code(403);
        header('Content-Type: text/plain; charset=utf-8');
        header('X-Content-Type-Options: nosniff');
        echo 'Forbidden';
        exit;
    }
}

return [
    'resend_api_key' => 're_xxxxxxxxx',
    'from' => 'kontakt@ib-klima.pl',
    'to' => 'ib.wyroba@gmail.com',
];
