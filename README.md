# WatchMotion Editor site

English product website, Mac feature tour, practical user guide, support, and privacy policy for WatchMotion Editor. Built with Next.js App Router, React, TypeScript, and locally served fonts. Prepared for a future Vercel Git deployment; no deployment is performed by this repository setup.

## Run locally

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev -- --port 3017
```

Open the local address printed by Next.js. To validate:

```sh
npm test
npm run build
npm run typecheck
node scripts/smoke-test.mjs
```

The smoke test expects a running server at `http://127.0.0.1:3017`. Set `TEST_BASE_URL` to check a different local or preview server. It checks HTTP routes, internal links and anchors, asset availability, security headers, English document language, and 404 behavior. It is not browser visual or interaction testing.

## Routes and content

| Route           | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `/`             | Product introduction and three-device workflow       |
| `/mac-editor`   | Actual Mac screens and feature tour                  |
| `/guide`        | Guide overview and downloadable illustrative project |
| `/guide/[slug]` | Five chapters from setup through export              |
| `/support`      | Device requirements, troubleshooting, email contact  |
| `/privacy`      | App, website, export, and support data handling      |

Edit guide content in `lib/guides.ts`. Operator and email are in `lib/site.ts`: **우상영**, **sangyoung2730@naver.com**. The support link opens the visitor’s email app; no web form or email backend is present. No advertising, analytics, account system, or unnecessary third-party embeds were added.

## Vercel deployment later

1. Push the reviewed commits to `wsysangyoung2730-debug/WatchMotion-Editor-site`.
2. In Vercel, import that GitHub repository. Choose **Next.js**, repository root, Node.js **24.x**, install `npm ci`, build `npm run build`, and the default Next.js output setting. Do not set an `out` or `dist` directory.
3. Set the production branch to `main`. Changes pushed to that branch can trigger production builds; other branches can use preview deployments.
4. Set `SITE_URL` to the verified HTTPS production origin, without a path or query. Copy `.env.example` to `.env.local` only for local configuration; never commit private environment files.
5. Keep `APP_STORE_IOS_URL` and `APP_STORE_MAC_URL` empty until the respective public listings are available. Use the iPhone listing for the companion Watch app. Blank/invalid links display a Coming to the App Store state instead of a dead download button.
6. Redeploy after changing these variables: the reading pages are prerendered. The project retains normal Next.js server/image support and can add dynamic routes later; it is not a forced static export.
7. Run the launch checks below against the final domain before adding support/privacy URLs to App Store Connect.

Missing `SITE_URL` and Vercel preview environments produce noindex metadata and a disallowing robots file. These are indexing hints, not access controls. Use Vercel deployment protection for private previews. No canonical domain, public app link, price, rating, or release availability has been invented.

## Before public release

- Confirm the operator/contact and review the privacy policy against the final app binaries, actual hosting settings, email handling/retention, applicable regions, and any legal requirements. The policy is an implementation-grounded draft, not a compliance certification.
- Confirm Vercel logging/retention, any cross-border processing disclosures and applicable processor terms. If analytics, forms, or other services are added, update the policy before enabling them.
- Keep App Store Connect privacy responses aligned with the app’s actual data practices; a website policy does not replace those responses.
- Set `SITE_URL` and verify `/privacy`, `/support`, `/robots.txt`, `/sitemap.xml`, downloads, and contact on the production domain.
- Test the site in desktop/mobile browsers, keyboard-only navigation, 200% zoom, and reduced-motion settings. This implementation includes responsive styles, but browser interaction/visual QA has not yet been performed.
- Verify wording, minimum OS versions, transfer steps, screenshots and export behavior against the final release build. Do the final three-device physical-device workflow test separately.
- Add the real App Store listing URLs after availability is confirmed. Do not imply the app is already released beforehand.

## Visual assets and sample provenance

- `public/images/app-icon.png` and `app/icon.png`: existing approved app asset from the product repository.
- `mac-editor-dark.png`, `mac-editor-light.png`, `mac-segments.png`: **actual native Mac window captures**, 3024 × 1800 pixels, captured from the local Auto Segments build on September 9, 2026. UI pixels have not been regenerated, rearranged, recolored, or cropped. The webpage adds only an outer frame, shadow, and background. The final release should refresh these if the app layout changes.
- `showcase-backdrop.webp`: original generated decorative background, no app UI or devices. Built-in Imagegen prompt: “Near-black graphite studio background, fine grain, restrained coral-red luminous waveform along lower third/edges, low graphite ledge, soft directional lighting; central and top areas empty for screenshot/text overlays. No devices, UI, text, icons, or logos.” Converted to WebP for delivery.
- `public/examples/everyday-hand-motions.watchmotion`: **synthetic illustrative data**, not personal data or a scientific benchmark. It opens in the real Mac app. Initial project has no confirmed segments; the screenshots demonstrate subsequent review and labeling.
- `scripts/create-guide-project.mjs`: reproduces the illustrative 20-second, 50 Hz, three-activity example in a new temporary directory. Requires macOS `/usr/bin/zip`. It does not touch existing user projects.

The selected generated website concept is a design reference only and is not shipped as a flattened page or represented as an app screenshot.

## Validation record — September 9, 2026

- Six automated unit/content checks passed.
- `next build`, TypeScript, and `git diff --check` passed.
- Development and production HTTP checks passed for all ten content pages, 26 internal links/anchors, screenshot/background assets, robots/sitemap, and unknown-route 404 responses.
- Production image optimization returned HTTP 200 for the real Mac capture (1920px derivative, approximately 111 KB).
- The downloadable example archive passed ZIP integrity checks and was opened in the actual Mac app for the screenshots.
- No website browser visual/interaction testing, remote push, or Vercel deployment was performed.

## Reference documentation

- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Vercel Git deployments](https://vercel.com/docs/git)
- [Vercel Privacy Notice](https://vercel.com/legal/privacy-notice)
- [Apple App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/)

Commits follow `[lowercase tag] 한글 명령형 내용`. No credentials or real participant recordings belong in this repository.
