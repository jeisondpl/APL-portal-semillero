---
name: apl-semilleros-portal stack decisions
description: Key technical decisions made during scaffold that differ from original spec or have non-obvious implications
type: project
---

## Tailwind CSS 4 — CSS-native config (no tailwind.config.ts)

Tailwind CSS 4 uses `@theme {}` blocks inside `globals.css` instead of a `tailwind.config.ts` file. The `create-next-app` scaffold with `--tailwind` on Next.js 16 generates this pattern automatically. Token extension goes in `@theme {}` inside `globals.css`, NOT in a separate config file.

Custom classes exposed via `@theme`:
- `--color-petroleum`, `--color-deep-navy`, `--color-accent-green`, etc.
- `--radius-card: 12px` → `rounded-card` class available
- `--shadow-card`, `--shadow-card-hover` → `shadow-card`, `shadow-card-hover` available

**Why:** Tailwind 4 dropped config file; all theme configuration is CSS-native.
**How to apply:** When adding new design tokens, add them to `@theme {}` block in `globals.css`, not in a separate config file.

## Next.js 16 (not 15)

`create-next-app@latest` as of 2026-04-22 installs Next.js 16.2.4 (not 15 as originally specced). All App Router patterns work identically. `params` in dynamic routes must be `Promise<{...}>` and awaited (Next.js 15+ async API).

**Why:** npm latest resolves to 16 now.
**How to apply:** Dynamic page props use `params: Promise<{ slug: string }>` and `await params`.

## next-auth 5.0.0-beta.25 peer dep conflict

next-auth beta.25 declares peer dep of `next@^14 || ^15`, but project runs Next.js 16. Install with `--legacy-peer-deps`. The package works fine at runtime.

**Why:** Beta package hasn't updated peer dep range yet.
**How to apply:** Any `npm install` that touches next-auth needs `--legacy-peer-deps`.
