import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const apps = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/apps' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    status: z.enum(['in-entwicklung', 'beta', 'veroeffentlicht']).default('in-entwicklung'),
    platforms: z.array(z.string()).default([]),
    appStoreUrl: z.url().optional(),
    playStoreUrl: z.url().optional(),
    supportEmail: z.email().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { blog, apps };
