import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(2),
    description: z.string().min(10),
    techStack: z.array(z.string().min(1)).min(1),
    githubUrl: z.string().url(),
    image: z.string().min(1),
    date: z.coerce.date()
  })
});

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string().min(2),
      excerpt: z.string().min(10),
      date: z.coerce.date(),
      cover: image(),
      coverAlt: z.string().min(5),
      tags: z.array(z.string().min(1)).default([]),
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string().min(5),
            caption: z.string().min(2).optional()
          })
        )
        .default([])
    })
});

export const collections = { projects, blog };
