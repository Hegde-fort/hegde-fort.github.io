# FORT Lab Website

The website for the FORT Lab at the University of Alberta. Built with [Astro](https://astro.build) and deployed to GitHub Pages automatically whenever you push to `main`.

## How to update the site

Everything you need to change lives in **`src/content/`**. You never need to touch pages, components, or config files for routine updates. Just edit files in that folder and push.

---

### Lab-wide info (name, description, affiliations, etc.)

**`src/content/site/lab.yaml`** is the one file for anything that shows up across multiple pages. Update it for:

- Lab name and full name
- Hero headline and description (home page)
- About page mission statement, tagline, and research areas
- Affiliations shown on the About page and footer
- Joining section headline and blurb (home page)
- Contact info (About page)
- Social links (footer)

---

### Adding or updating a team member

Each person gets their own folder inside `src/content/team/`. Name the folder after them (e.g. `firstname-lastname`). Inside the folder, put:

1. `index.md` with their profile data
2. Their photo (optional) -- any filename works (`photo.jpg`, `headshot.png`, etc.)

```
src/content/team/
└── jane-doe/
    ├── index.md
    └── photo.jpg
```

To add someone, copy one of the `_example-*` template folders, rename it, and fill out `index.md`. The `_example-*` folders have `draft: true` so they never show up on the site.

```yaml
---
name: "Full Name"
role: "PhD Student"               # must match one of the allowed roles exactly (see below)
photo: ./photo.jpg                # path to photo in this folder; remove this line if no photo
bio: "Short research interests or bio."   # optional, for members without discrete projects
degree: "BSc Computer Science, University of Alberta (2022)"
projects:                         # list their research projects; each entry needs a title
  - title: "Project Title"
    description: "Brief description of what they're working on."
  - title: "Second Project"       # add as many as needed; description is optional
website: "https://..."
googleScholar: "https://scholar.google.com/..."
github: "https://github.com/..."
linkedin: "https://linkedin.com/in/username"
startDate: "September 2022"       # free-form string, e.g. "Fall 2022" or "May 2023"
endDate: "April 2024"             # only for alumni
alumni: false                     # set to true to move them to the Alumni section
# currentStatus: "..."            # only shown for alumni -- "what are you up to now?"
---
```

Allowed values for `role`: `Faculty`, `Postdoctoral Researcher`, `PhD Student`, `Master's Student`, `Undergraduate Student`, `Research Assistant`, `Visiting Researcher`, `Other`.

To mark someone as an alumnus, set `alumni: true`. They automatically move to the Alumni section, grouped by their former role and sorted alphabetically.

---

### Adding a publication

Go to `src/content/publications/` and create a new `.md` file. I usually name it something like `short-title-year.md`. Copy `0example-paper.md` as a starting point.

```yaml
---
title: "Full Paper Title"
authors:
  - "First Author"
  - "Second Author"
  - "PI Name"
venue: "Full Conference or Journal Name (CONF 2025)"
year: 2025
url: "https://arxiv.org/abs/..."  # link to the paper; arXiv is fine
code: "https://github.com/..."    # optional
featured: false                   # set to true to show it on the home page
---
```

Publications are automatically grouped by year, newest first. Use the full venue name (e.g. "Proceedings of the 42nd International Conference on Machine Learning (ICML 2025)"), not just the abbreviation.

---

### Adding a project

Go to `src/content/projects/` and create a new `.md` file. Copy `example-project.md` as a starting point. The body of the file (below the `---`) is a longer description that supports full Markdown.

```yaml
---
title: "Project Title"
summary: "One or two sentence summary shown on the projects listing."
status: "active"                  # active, completed, or archived
startDate: 2024-09-01
# endDate: 2025-08-31            # uncomment when the project ends; leave out for ongoing
tags:
  - "fairness"
---

Longer description here. Supports **bold**, lists, links, etc.
```

Active projects sort by start date (newest first). Completed and archived projects sort by end date.

---

### Adding a news item

Each news item gets its own folder inside `src/content/news/`. Inside the folder, put:

1. `index.md` with the news data and article body
2. A cover image (optional) -- any filename works (`cover.jpg`, `hero.png`, etc.)

```
src/content/news/
└── cifar-announcement-2025/
    ├── index.md
    └── cover.jpg
```

To add a news item, copy the `_example-news-item` folder, rename it, and fill out `index.md`.

```yaml
---
title: "News Title"
date: 2025-06-01
summary: "One sentence teaser shown on the news listing page."
image: ./cover.jpg                # path to cover image in this folder; remove if no image
imageAlt: "Short description of the image for accessibility"
featured: false                   # set to true to make it the big hero card at the top of /news
# externalUrl: "https://..."      # uncomment if this should link out instead of having its own page
---

Full article body here (optional). Leave this empty if you only want a teaser card.
```

If you set `externalUrl`, clicking the card opens that link directly and no internal article page is created. If you leave it out, a full page is generated at `/news/your-folder-name`.

Only one item should have `featured: true` at a time. If nothing is flagged, the most recent item becomes the hero automatically.

---

## Running it locally

You need Node.js 22 or newer. Then:

```sh
npm install
npm run dev
```

The site will be at `http://localhost:4321`. It hot-reloads as you edit files, so you can preview changes before pushing.

To do a full production build locally (useful for catching errors before they hit CI):

```sh
npm run build
npm run preview
```

---

## How deployment works

The deploy workflow in `.github/workflows/deploy.yml` runs automatically on every push to `main` that touches `src/`, `public/`, or config files. It has three jobs that run in sequence:

**1. test** -- runs `astro check`, which type-checks all `.astro` files and validates that every content file matches its Zod schema. If a content file has a typo in a required field (e.g. a bad date format or a missing `title`), the build stops here and the live site is untouched.

**2. build** -- installs dependencies, then runs `astro build` to generate the static site into the `dist/` folder. If the build succeeds, it uploads `dist/` as an artifact.

**3. deploy** -- only runs when the push is to `main` (not on pull requests). It takes the artifact from the build job and pushes it to GitHub Pages using the official `deploy-pages` action.

On pull requests, only the `test` and `build` jobs run -- no deployment happens, but you can see whether the build would succeed before merging.

To trigger a deploy without changing any content, go to **Actions** > **Deploy to GitHub Pages** > **Run workflow**.

If a build fails, the old site stays up and nothing breaks. Fix the file and push again.

---

## Project structure (for reference)

```
src/
├── content/                      <-- edit here for all content updates
│   ├── site/
│   │   └── lab.yaml              <-- lab name, description, affiliations, etc.
│   ├── team/                     <-- one folder per person
│   ├── publications/             <-- one .md file per paper
│   ├── projects/                 <-- one .md file per project
│   └── news/                     <-- one folder per news item
├── content.config.ts             <-- schemas that validate all content files
├── components/                   <-- shared UI pieces
├── layouts/
│   └── Layout.astro              <-- site-wide shell (nav, footer, head)
└── pages/                        <-- routing; rarely needs editing
    ├── index.astro
    ├── about.astro
    ├── team.astro
    ├── projects.astro
    ├── publications.astro
    └── news/
        ├── index.astro
        └── [slug].astro
```
