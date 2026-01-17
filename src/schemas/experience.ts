import { z } from "zod";

const experienceBaseSchema = {
  company: z.string().min(1, { message: "Company name cannot be empty" }),
  companyLogo: z.string().url().optional(),
  position: z.string().min(1, { message: "Position cannot be empty" }),
  description: z.string().min(1, { message: "Description cannot be empty" }),
  contributions: z.array(z.string()).optional(),
  startDate: z.string().min(1, { message: "Start date is required" }), // Just a string
  endDate: z.string().optional().nullable(),
  order: z.number().int().nonnegative().optional(),
  published: z.boolean().optional(),
};

export const createExperienceSchema = z.object({
  ...experienceBaseSchema,
});

export const updateExperienceSchema = z.object({
  ...experienceBaseSchema,
});

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;
