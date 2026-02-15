# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** Build runs ESLint automatically (no separate lint script)

There are no tests configured.

## Architecture

Next.js 13 personal portfolio site using SSG (Static Site Generation) with TypeScript and TailwindCSS 2.0.

### Pages

Pages live in `pages/` using Next.js pages router. The home page (`index.tsx`) imports `blog.tsx`, `contact.tsx`, and `projects.tsx` as components rendered inline — they are both standalone pages and homepage sections.

### Blog System

Blog posts are markdown files in `content/blog/` with YAML frontmatter (`title`, `date`, `tags`). The dynamic route `pages/blog/[slug].tsx` generates static pages from filenames using `getStaticPaths`/`getStaticProps`. Frontmatter is parsed with regex (not a library).

**Important:** The blog listing in `pages/blog.tsx` is **hardcoded** — adding a new post requires manually adding a `<li>` entry there in addition to creating the markdown file.

Tags render as coloured pills with a colour map in `[slug].tsx` (`tagColors` object). New tag names need a colour entry or they fall back to gray.

Markdown is rendered with `react-markdown` + `remark-gfm` + `remark-breaks` (line breaks render without needing double spaces).

### Blog images

Blog post images are stored in `public/blog/<slug>/` and referenced in markdown as `/blog/<slug>/image.png`.

## Code Style

- **Prettier:** tabs, no semicolons, single quotes, 100 char print width, trailing commas (es5)
- **ESLint:** strict TypeScript, React hooks, jsx-a11y accessibility rules, prettier integration
- **Emojis in JSX:** must be wrapped in `<span role="img" aria-label="...">` for accessibility
- Build will fail on prettier/eslint violations — always run `npm run build` to verify
