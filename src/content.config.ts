import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ------------------------------------------------------------------
// SITE CONFIG
// src/content/site/lab.yaml — single source of truth for all
// lab-wide content: name, description, hero, about, affiliations, etc.
// ------------------------------------------------------------------
const site = defineCollection({
  loader: glob({ base: './src/content/site', pattern: '**/*.{yaml,yml}' }),
  schema: z.object({
    name: z.string(),
    fullName: z.string(),
    description: z.string(),
    hero: z.object({
      headline: z.string(),
      description: z.string(),
    }),
    about: z.object({
      heroHeadline: z.string().optional(),
      tagline: z.string().optional(),
      mission: z.string().optional(),
    }),
    researchAreas: z.array(z.object({
      name: z.string(),
      description: z.string(),
    })).default([]),
    affiliations: z.array(z.string()).default([]),
    joining: z.object({
      headline: z.string(),
      blurb: z.string().optional(),
    }),
    contact: z.object({
      email: z.string().optional(),
      address: z.string().optional(),
      officeHours: z.string().optional(),
    }).optional(),
    social: z.object({
      twitter: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      googleScholar: z.string().url().optional(),
      github: z.string().url().optional(),
    }).optional(),
    nav: z.array(z.object({
      label: z.string(),
      href: z.string(),
      hidden: z.boolean().default(false),
    })).optional(),
  }),
});

// ------------------------------------------------------------------
// TEAM
// One .md file per person in src/content/team/
// Files with draft: true are excluded from the site (use for examples/templates)
// ------------------------------------------------------------------
const team = defineCollection({
  loader: glob({ base: './src/content/team', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.enum([
        'Faculty',
        'Postdoctoral Researcher',
        'PhD Student',
        "Master's Student",
        'Undergraduate Student',
        'Research Assistant',
        'Visiting Researcher',
        'Other',
      ]),
      photo: image().optional(),
      // Short bio or research interests
      bio: z.string().optional(),
      // Their degree (e.g. "BSc Computer Science, University of Alberta")
      degree: z.string().optional(),
      // Active project info
      projectTitle: z.string().optional(),
      projectDescription: z.string().optional(),
      // Contact / profile links
      website: z.string().url().optional(),
      googleScholar: z.string().url().optional(),
      github: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      startYear: z.number().optional(),
      // Free-form date strings for display, e.g. "May 2023" or "Summer 2022"
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      // Alumni fields
      alumni: z.boolean().default(false),
      // "What are you up to now?" shown on alumni cards
      currentStatus: z.string().optional(),
      // Exclude from the site (use this on template/example files)
      draft: z.boolean().default(false),
    }),
});

// ------------------------------------------------------------------
// PUBLICATIONS
// One .md file per paper in src/content/publications/
// ------------------------------------------------------------------
const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number(),
    url: z.string().url().optional(),
    pdf: z.string().url().optional(),
    code: z.string().url().optional(),
    abstract: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// ------------------------------------------------------------------
// PROJECTS
// One .md file per project in src/content/projects/
// ------------------------------------------------------------------
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      image: image().optional(),
      status: z.enum(['active', 'completed', 'archived']).default('active'),
      startDate: z.coerce.date(),
      // Leave endDate blank for ongoing projects
      endDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      url: z.string().url().optional(),
      draft: z.boolean().default(false),
    }),
});

// ------------------------------------------------------------------
// NEWS
// One .md file per news item in src/content/news/
// ------------------------------------------------------------------
const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      summary: z.string(),
      image: image().optional(),
      externalUrl: z.string().url().optional(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { site, team, publications, projects, news };
