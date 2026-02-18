# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog/portfolio site for Erik Taheri, built with Astro v5 as a fully static site. Deployed on Cloudflare Pages.

## Commands

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build` (runs `astro check` then `astro build`)
- **Preview production build:** `pnpm preview`
- **Type check only:** `pnpm astro check`

Package manager is **pnpm**.

## Architecture

- **Framework:** Astro v5 with TypeScript (strict mode), MDX support
- **Styling:** Tailwind CSS v4 via Vite plugin — configured in `src/styles/global.css` using `@theme` and `@plugin` directives (no `tailwind.config.mjs`)
- **Dark mode:** Class-based (`.dark` on `<html>`), persisted via localStorage, light/dark/system toggle
- **Fonts:** Space Grotesk (sans) and Space Mono (mono), loaded via `@fontsource`
- **Icons:** `@lucide/astro`
- **Animations:** GSAP (cursor-follow on homepage), CSS `.animate` classes with IntersectionObserver
- **View Transitions:** Astro `ClientRouter` for smooth page transitions
- **Typography:** `@tailwindcss/typography` prose classes for long-form content

### Content

Content uses Astro v5 Content Layer API with `glob()` loaders, defined in `src/content.config.ts`:

- **Blog posts:** `src/content/blog/*.md` — `{ title, description, date, draft? }`
- **Work entries:** `src/content/work/*.md` — `{ company, role, dateStart, dateEnd, link? }`
- **Projects:** `src/content/projects/*.md` — `{ title, description, date, draft?, demoURL?, repoURL? }`

Site-wide config lives in `src/consts.ts` (name, socials, section metadata, homepage counts).

### Key Files

- `src/layouts/Layout.astro` — Shared layout with Header/Footer components, SEO, dark mode init, animation init
- `src/pages/index.astro` — Homepage with GSAP hover-image effect, latest posts, recent projects
- `src/pages/blog/index.astro` — Blog listing grouped by year
- `src/pages/blog/[...slug].astro` — Individual blog post with prose styling
- `src/pages/projects/index.astro` — Project listing
- `src/pages/projects/[...slug].astro` — Individual project page
- `src/pages/work/index.astro` — Work history timeline from content collection
- `src/pages/links.astro` — Linktree-style links page
- `src/pages/resume.astro` — 301 redirect to `/work`
- `src/pages/rss.xml.ts` — RSS feed from blog + projects

### Components

- `Container.astro` — `max-w-[65ch]` centered content wrapper
- `Header.astro` — "ET." logo + nav (blog, work, projects)
- `Footer.astro` — Signature, socials, copyright, ThemeToggle
- `ArrowCard.astro` — Blog/project entry card with hover arrow
- `ThemeToggle.astro` — Light/dark/system toggle
- `BackToPrev.astro` — Back navigation link
- `BackToTop.astro` — Scroll-to-top button
- `FormattedDate.astro` — `<time>` element with formatted date

### Path Aliases

- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`
- `@lib/*` → `src/lib/*`
- `@consts` → `src/consts`

### Routing

Astro file-based routing. Static pages plus dynamic `[...slug]` routes for blog posts and projects.
