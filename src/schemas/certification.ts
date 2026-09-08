import { z } from "zod";

const certificationBaseSchema = {
  name: z.string().min(1, { message: "Name cannot be empty" }),
  issuer: z.string().min(1, { message: "Issuer cannot be empty" }),
  badgeUrl: z.string().min(1, { message: "Badge URL is required" }),
  credentialUrl: z.string().optional().nullable(),
  issueDate: z.string().min(1, { message: "Issue date is required" }),
  expiryDate: z.string().optional().nullable(),
  order: z.number().int().nonnegative().optional(),
  published: z.boolean().optional(),
};

export const createCertificationSchema = z.object({
  ...certificationBaseSchema,
});

export const updateCertificationSchema = z.object({
  ...certificationBaseSchema,
});

export type CreateCertificationInput = z.infer<
  typeof createCertificationSchema
>;
export type UpdateCertificationInput = z.infer<
  typeof updateCertificationSchema
>;
