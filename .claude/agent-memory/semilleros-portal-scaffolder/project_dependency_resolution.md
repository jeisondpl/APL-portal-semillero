---
name: dependency resolution decisions for apl-semilleros-portal
description: How dependency conflicts were resolved during initial scaffold
type: project
---

## next-auth@5.0.0-beta.25 on Next.js 16

next-auth@5.0.0-beta.25 peer dependency: `next@"^14.0.0-0 || ^15.0.0-0"`
Project uses: `next@16.2.4`

Resolution: `npm install ... --legacy-peer-deps`

**Why:** The beta package hasn't bumped its peer dep range to include Next.js 16, but functionally compatible.
**How to apply:** Document for all future `npm install` commands that include next-auth in this project.

## Production dependencies installed (2026-04-22)
- next-auth@5.0.0-beta.25
- @auth/prisma-adapter (latest)
- prisma@6, @prisma/client@6
- zustand@5
- zod@3
- react-hook-form@7
- @hookform/resolvers@3
- axios@1.7
- recharts@3
- @tailwindcss/typography
- react-markdown
- clsx
- tailwind-merge

## Dev dependencies added
- prettier
- prettier-plugin-tailwindcss
