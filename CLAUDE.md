# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static marketing site for **The Daily Benji**, an email newsletter that summarizes a user's daily spending. The site itself is informational — there is no app or backend here. Deployed via **GitHub Pages** to the custom domain `dailybenji.com` (see `CNAME`).

## Commands

```bash
bundle install            # one-time: install Jekyll + github-pages gem
bundle exec jekyll serve  # local dev server with live reload at http://localhost:4000
bundle exec jekyll build  # build into _site/ (normally GitHub Pages does this on push)
```

There are no tests, linters, or a JS build pipeline.

## Architecture

Vanilla Jekyll using the `github-pages` gem (so plugins are constrained to the GitHub Pages allowlist). Structure:

- **Pages** at the repo root — `index.html`, `about.md`, `pricing.md`, `samples.md`, `security.md`, `signup.md`. Each declares `layout: default` in front matter.
- **`_layouts/default.html`** is the only layout. It pulls in `_includes/header.html` (logo + nav) and `_includes/footer.html`, wrapped in a `.container`. Page `<title>` falls back to "The Daily Benji" if `page.title` is unset.
- **`_posts/`** exists with a single starter post but the site has no blog index page wired up — posts are not surfaced in nav.
- **`assets/css/style.css`** is the single hand-written stylesheet. The `minima` theme is declared in `_config.yml` but the custom layout overrides it; treat the stylesheet as the source of truth for styling.

When adding a new page, also add a link in `_includes/header.html` — nav is hardcoded, not generated from collections.

## Things to know

- **`_config.yml` still contains Jekyll-template placeholder values** (`title: Your awesome title`, `email: your-email@example.com`, the default twitter/github usernames, etc.). The real site title is set per-page via front matter, so these placeholders are mostly inert — but don't trust `site.title`/`site.email`/`site.description` in templates without first fixing the config.
- **The email-capture `<form>` elements in `index.html` and `signup.md` have no `action` attribute** — they are not wired to any backend yet. Submitting does nothing.
- **`_config.yml` is not auto-reloaded** by `jekyll serve`; restart the server after editing it.
- Mobile header layout was tuned recently (see recent commits); preserve the inline flex styles in `_includes/header.html` unless intentionally restyling.
