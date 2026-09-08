"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import {
  CreateCertificationInput,
  UpdateCertificationInput,
  createCertificationSchema,
  updateCertificationSchema,
} from "@/schemas";

// CREATE
export async function createCertification(data: CreateCertificationInput) {
  const parsed = createCertificationSchema.parse(data);

  const certification = await prisma.certification.create({
    data: {
      ...parsed,
      issueDate: new Date(parsed.issueDate),
      expiryDate: parsed.expiryDate ? new Date(parsed.expiryDate) : null,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  return certification;
}

// READ (List)
export async function listCertifications() {
  const certifications = await prisma.certification.findMany({
    orderBy: [{ order: "asc" }, { issueDate: "desc" }],
  });

  return certifications;
}

// READ (Single)
export async function getCertificationById(id: string) {
  const certification = await prisma.certification.findUnique({
    where: { id },
  });

  return certification;
}

// UPDATE
export async function updateCertification(
  id: string,
  data: UpdateCertificationInput,
) {
  const parsed = updateCertificationSchema.parse(data);

  const certification = await prisma.certification.update({
    where: { id },
    data: {
      ...parsed,
      issueDate: new Date(parsed.issueDate),
      expiryDate: parsed.expiryDate ? new Date(parsed.expiryDate) : null,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  return certification;
}

// DELETE
export async function deleteCertification(id: string) {
  await prisma.certification.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}
