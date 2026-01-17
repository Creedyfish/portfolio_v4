import { z } from "zod";

const contentBlockBaseSchema = {
  key: z.string().min(1),
  title: z.string().min(1).optional(),
  content: z.string().min(1), // markdown
  published: z.boolean().optional(),
};

export const createContentBlockSchema = z.object({
  ...contentBlockBaseSchema,
});

export type CreateContentBlockInput = z.infer<typeof createContentBlockSchema>;

export const updateContentBlockSchema = z
  .object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    published: z.boolean().optional(),
  })
  .strict();

export type UpdateContentBlockInput = z.infer<typeof updateContentBlockSchema>;

export const contentBlockKeySchema = z.string().min(1);
