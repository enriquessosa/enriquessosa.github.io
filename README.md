# Carlos Jimenez — Portfolio

A minimal static portfolio built with Astro and plain CSS. It introduces my work and presents projects focused on software development, Linux, and systems-oriented tools. The site ships no client-side JavaScript, analytics, or UI framework.

## Run locally

Use Node.js 24 (22.23.4 or newer) and npm 9.6.5 or newer:

```sh
npm ci
npm run dev
```

Astro prints the local URL, usually `http://localhost:4321`.

## Build and verify

```sh
npm run build   # generate the production site in dist/
npm run check   # build and check pages, metadata, links, and sitemap
npm audit       # inspect dependency vulnerabilities
npm run preview # preview the production build locally
```

## Update content

- `src/data/site.ts` contains the name, GitHub profile, and homepage introduction.
- `src/data/projects.ts` contains project descriptions, technologies, details, and order. Each entry generates a project page and appears in the project lists and sitemap.
- `src/pages/` contains the home, About, and Projects page structure.
- `src/styles/global.css` contains the site's styles.

Review each repository before adding technical claims. Project descriptions are maintained manually and are not fetched from GitHub during the build.

## Appearance

The site follows the visitor's system color-scheme preference. CSS keeps the existing light theme and applies a restrained dark theme when dark mode is preferred. Changes to the system preference apply automatically; there is no theme toggle or client-side script.

## GitHub Pages deployment

The site is configured for `https://enriquessosa.github.io/` and static output. The workflow in `.github/workflows/deploy.yml` runs on pushes to `main` and manual dispatches. It uses Node.js 24, runs `npm ci` and `npm run check`, uploads `dist/`, then deploys it with the official GitHub Pages actions.

In the repository settings, choose **Settings → Pages → Build and deployment → Source → GitHub Actions**. Push `main` to publish; subsequent pushes redeploy automatically. The workflow requires GitHub Actions to have permission to deploy Pages.
