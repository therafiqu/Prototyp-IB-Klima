<?php
/**
 * SAFE EXAMPLE ONLY — placeholder values, no real secrets.
 *
 * Production placement on IDHosting (REQUIRED):
 *   Put the real file OUTSIDE the public web root, next to httpdocs:
 *
 *   /home/<account>/
 *   ├── httpdocs/                 ← public web root (upload out/ here)
 *   │   └── api/
 *   │       └── contact.php
 *   └── private/
 *       └── ib-klima-config.php   ← REAL secrets go HERE (not under httpdocs)
 *
 * Copy this example to that private path on the server, rename it, and fill in
 * the real Resend API key. Never commit the real file. Never put it under httpdocs/.
 *
 * Optional: set RESEND_API_KEY in the hosting environment instead of (or in
 * addition to) this file. Environment variables are preferred when available.
 */

declare(strict_types=1);

// Defense in depth: if this file is ever placed under a web root and requested
 // directly, refuse to run. contact.php includes this file — SCRIPT_FILENAME
 // will then be contact.php, so includes still work.
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
    // Replace with your real Resend API key on the SERVER COPY only.
    // Keep this placeholder in git. Never commit a real key.
    'resend_api_key' => 're_xxxxxxxxx',

    // Verified sender domain/address in Resend.
    'from' => 'kontakt@ib-klima.pl',

    // Inbox that receives contact form submissions.
    'to' => 'ib.wyroba@gmail.com',
];
