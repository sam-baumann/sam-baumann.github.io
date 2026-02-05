// 1. Import utilities from 'astro:content'
import { defineCollection } from "astro:content";

// 2. Import loader(s)
import { glob, file } from "astro/loaders";

// 3. Import zod
import { z } from "astro/zod";

// 4. Define collection(s)
const blog = defineCollection({
    loader: glob({
        pattern: "*.md",
        base: "./blog/",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        }),
        tags: z.array(z.string()).optional(),
    }),
});

// 5. export a single object of collections
export const collections = {
    blog,
};