import { z } from "zod";

export const createProjectSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  summary: z.string().min(1, "Summary is required"),
  role: z.string().min(1, "Role is required"),

  imageUrl: z.string().optional(),
  repoUrl: z.string().optional(),
  liveUrl: z.string().optional(),

  featured: z.boolean().optional().default(false),
  order: z.number().int().nonnegative().optional(),

  technologyIds: z.array(z.string().min(1)),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
