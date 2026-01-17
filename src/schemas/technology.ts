import { z } from "zod";

const technologyBaseSchema = {
  name: z.string().min(1),
  slug: z.string().min(1),
  iconUrl: z.string().url(),
  category: z.string().min(1).nullish(),
  description: z.string().min(1).nullish(),
  order: z.number().int().nonnegative().optional(),
};

export const createTechnologySchema = z.object({
  ...technologyBaseSchema,
});

export const technologySchema = createTechnologySchema.extend({
  id: z.string(),
});

export type Technology = z.infer<typeof technologySchema>;

export type CreateTechnologyInput = z.infer<typeof createTechnologySchema>;

export const updateTechnologySchema = z
  .object({
    ...technologyBaseSchema,
  })
  .partial();

export type UpdateTechnologyInput = z.infer<typeof updateTechnologySchema>;

export const technologySlugSchema = z.string().min(1);
