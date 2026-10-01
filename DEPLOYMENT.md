# Deployment — IDHosting (static + PHP)

This project builds to a static website. Production does **not** need Node.js or `npm start`. Upload the contents of `out/` to the public web root (usually `httpdocs/`).

## 1. Build locally

```bash
npm install
npm run build
```

The build generates:

```text
out/
```

Do **not** upload `.next/`. Only upload the contents of `out/`.

## 2. What to upload to IDHosting

Upload **everything inside** `out/` into the public web directory, for example:

```text
httpdocs/
├── index.html
├── 404.html
├── .htaccess
├── llms.txt
├── robots.txt
├── sitemap.xml
├── _next/
├── polityka-prywatnosci/
├── icons / OG images (as generated)
└── api/
    ├── contact.php
    ├── config.example.php   ← placeholders only; HTTP access denied
    └── .htaccess            ← denies config.php if misplaced here
```

**Do not put the real API key under `httpdocs/`.**

## 3. Where to place production `config.php` (IDHosting)

Preferred layout on IDHosting / typical Plesk-style accounts:

```text
/home/<account>/
├── httpdocs/                          ← public web root (site files from out/)
│   └── api/
│       └── contact.php                ← publicly reachable endpoint
└── private/
    └── ib-klima-config.php            ← REAL secrets HERE (not web-accessible)
```

Exact steps:

1. In the hosting file manager (or FTP/SFTP), go to the parent of `httpdocs` (your account root).
2. Create a folder named `private` if it does not exist (sibling of `httpdocs`, not inside it).
3. Upload / create:
   `private/ib-klima-config.php`
4. Base it on the repo file `private/ib-klima-config.example.php`.
5. Put the real Resend key only in that private server file.
6. Permissions: readable by PHP (e.g. `640` or `600`), never world-writable.

Example private file contents (server only — never commit the real key):

```php
<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    $script = realpath((string) ($_SERVER['SCRIPT_FILENAME'] ?? ''));
    $self = realpath(__FILE__);
    if ($script !== false && $self !== false && $script === $self) {
        http_response_code(403);
        header('Content-Type: text/plain; charset=utf-8');
        echo 'Forbidden';
        exit;
    }
}

return [
    'resend_api_key' => 're_xxxxxxxxxxxxxxxxx',
    'from' => 'kontakt@ib-klima.pl',
    'to' => 'ib.wyroba@gmail.com',
];
```

`contact.php` resolves that path automatically as:

```text
dirname(httpdocs) + /private/ib-klima-config.php
```

Alternative absolute path via environment variable:

```text
IB_KLIMA_CONFIG=/home/<account>/private/ib-klima-config.php
```

Optional instead of (or in addition to) the file:

```text
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
```

### If the key is currently under `httpdocs/api/config.php`

1. Move it to `/home/<account>/private/ib-klima-config.php`.
2. Delete `httpdocs/api/config.php`.
3. Confirm `https://ib-klima.pl/api/config.php` returns **403 Forbidden** or **404** (never the key).
4. Confirm the contact form still sends email.

`httpdocs/api/.htaccess` denies HTTP access to `config.php` as a fallback, but **outside the web root is the required production placement**.

## 4. Contact form endpoint

- Frontend posts JSON to: `/api/contact.php`
- PHP calls Resend over HTTPS (`https://api.resend.com/emails`) with cURL
- Composer / `vendor/` is **not** required
- The Resend API key must stay on the server only and must never appear in JSON/HTML responses

## 5. Configure `RESEND_API_KEY`

Order used by `contact.php`:

1. `RESEND_API_KEY` environment variable (if set)
2. Config array from `IB_KLIMA_CONFIG` path / `../private/ib-klima-config.php` / `../ib-klima-config.php`
3. Discouraged fallback: `httpdocs/api/config.php` (Apache-denied)

Notes:

- `from` must use a domain/address verified in Resend.
- Never put the key in `NEXT_PUBLIC_*`, JavaScript, TypeScript, or HTML.
- Never commit real keys; repo examples use only `re_xxxxxxxxx`.

## 6. PHP requirements

- **PHP 8.1+** recommended (code uses `declare(strict_types=1)` and `str_starts_with`)
- Extensions: **cURL**, **JSON**, **mbstring**
- Composer is **not** required for this deployment

## 7. Test the contact form

1. Open the live site and submit a valid form.
2. Confirm the success dialog appears.
3. Confirm the email arrives at the configured `to` address.
4. Confirm secrets are not downloadable:

```bash
curl -i 'https://ib-klima.pl/api/config.php'
# Expect 403 or 404 — body must NOT contain re_…
```

5. Optional API check:

```bash
curl -i -X POST 'https://ib-klima.pl/api/contact.php' \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://ib-klima.pl' \
  -d '{"name":"Jan Test","phone":"500600700","propertyType":"dom-jednorodzinny","location":"Kraków","area":"45","rooms":"2","message":"Test","website":""}'
```

Expected success body:

```json
{"success":true,"message":"Message sent successfully."}
```

## 8. Troubleshoot HTTP 403 / PHP errors

| Symptom | Likely cause | What to check |
| --- | --- | --- |
| HTTP 403 from Resend / email fails | Missing `User-Agent` on the Resend request | `contact.php` already sets `User-Agent: IB-Klima-Contact/1.0` — do not remove it |
| HTTP 403 from your host | Apache/mod_security blocking POSTs to `.php` | Ask IDHosting support; ensure `api/contact.php` is allowed |
| HTTP 405 | Non-POST method | Endpoint accepts POST only |
| HTTP 400 | Validation failed | Required: name, phone, propertyType |
| HTTP 500 “Unable to send…” | Missing/placeholder API key | Create `private/ib-klima-config.php` or set `RESEND_API_KEY` |
| HTTP 502 | Resend rejected the request | Verify sender domain, API key, and PHP error log (secrets are redacted) |
| Form works locally in `next dev` but not on host | Local static preview has no PHP | Test against the real host or a PHP-capable local server |
| Blank / download of `.php` | PHP not enabled for that directory | Enable PHP in the hosting panel for `httpdocs` |

Also check:

- PHP error log in the hosting panel
- That the real config is **outside** `httpdocs` and `/api/config.php` does not serve secrets
- That `cURL` can reach `https://api.resend.com` (outbound HTTPS)

## 9. Local development notes

- `npm run dev` still works for UI work.
- The contact form posts to `/api/contact.php`, which only exists after deploy (or if you serve `public/api` with PHP).
- For local email testing, run a PHP-capable server or deploy to a staging host.

## 10. Security notes

- Server-side validation mirrors the previous Next.js rules.
- HTML email content is escaped.
- Honeypot field `website` rejects common bots silently.
- Origin/Referer is checked against `ib-klima.pl` / `www.ib-klima.pl` (and localhost for tests).
- Full CSRF tokens are not used: the form is same-origin static HTML → PHP. Origin checks + honeypot are the practical shared-hosting controls.
- Secrets live outside the public web root; Apache denies public `config.php`; PHP refuses direct execution of the config file; API responses never include the key.
