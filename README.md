# Sam Baumann’s Personal Site

This repository is a **fully static** website built with [Astro](https://astro.build) and Tailwind CSS.

## Project Structure

```
src/
├── blog/           # Markdown blog posts
│   └── post1.md
├── pages/          # Astro pages
│   ├── index.astro
│   ├── blog/
│   │   └── [slug].astro
├── components/     # Reusable UI pieces
│   ├── Header.astro
│   └── Footer.astro
├── layouts/        # Site‑wide layout
│   └── BaseLayout.astro
└── styles/         # Global CSS / Tailwind config
    └── global.css
```

## Features

* **Blog** – Markdown posts in `src/blog/`. Each file becomes a static page under `/blog/<slug>`. The list page automatically pulls all posts.
* **Portfolio** – Markdown entries in `src/portfolio/`. Each is served under `/portfolio/<slug>`.
* **Now** – A simple `/now` page to share what you’re working on.
* **Footer** – Locked to the bottom using Tailwind Flexbox utilities.
* **No external dependencies** beyond Astro, Tailwind and the Vite plugin already present in `package.json`.

## Getting Started

```bash
pnpm install   # or npm ci
pnpm dev       # start the dev server
pnpm build     # build for production
pnpm preview   # preview the built site
```

Add or edit Markdown files in `src/blog/` or `src/portfolio/` and they’ll appear automatically.

## Todos

* **Fix blog routing** – The current `[slug].astro` file uses `import.meta.glob` to load markdown. Verify that each slug matches the filename (e.g., `post1.md` → `/blog/post1`).
* **Generate a blog index page** – Create `src/pages/blog/index.astro` that lists all posts with titles and dates.
* **Add pagination** – When the number of posts grows, implement a paginated list (optional).
* **Create an RSS feed** – Export posts as RSS for syndication.
* **Improve SEO** – Add Open Graph tags and proper meta descriptions.
* **Add unit tests** – Test the markdown loader and page generation logic.

---

Happy coding!
