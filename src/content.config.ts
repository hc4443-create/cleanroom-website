// Defines the "Updates" collection (news posts written in Markdown).
// Posts live in src/content/updates/. See the README for how to add one.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const updates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    // Posts with draft: true are never published.
    draft: z.boolean().default(false),
  }),
});

export const collections = { updates };
