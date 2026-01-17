import { z } from "zod";

export const skillSchema = z.object({
  technologyId: z.string().min(1, "Technology is required"),
  level: z.number().int().min(1).max(5),
  order: z.number().int(),
  visible: z.boolean(),
});

export const updateSkillSchema = skillSchema.partial();

export type SkillInput = z.infer<typeof skillSchema>;
export type UpdateSkillInput = z.infer<typeof updateSkillSchema>;
