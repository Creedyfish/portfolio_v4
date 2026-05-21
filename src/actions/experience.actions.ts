"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import {
  CreateExperienceInput,
  UpdateExperienceInput,
  createExperienceSchema,
  updateExperienceSchema,
} from "@/schemas";

// CREATE
export async function createExperience(data: CreateExperienceInput) {
  const parsed = createExperienceSchema.parse(data);

  const experience = await prisma.experience.create({
    data: {
      ...parsed,
      startDate: new Date(parsed.startDate), // Only convert here
      endDate: parsed.endDate ? new Date(parsed.endDate) : null,
    },
  });
  revalidatePath("/experience");
  revalidatePath("/admin");
  return experience;
}

// READ (List)
export async function listExperiences() {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });

  return experiences;
}

// READ (Single)
export async function getExperienceBySlug(id: string) {
  const experience = await prisma.experience.findUnique({
    where: { id },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });

  return experience;
}

// UPDATE
// UPDATE
export async function updateExperience(
  id: string,
  data: UpdateExperienceInput,
) {
  const parsed = updateExperienceSchema.parse(data);

  const experience = await prisma.experience.update({
    // ← was .create
    where: { id }, // ← add this
    data: {
      ...parsed,
      startDate: new Date(parsed.startDate),
      endDate: parsed.endDate ? new Date(parsed.endDate) : null,
    },
  });
  revalidatePath("/experience");
  revalidatePath("/admin");
  return experience;
}

// DELETE
export async function deleteExperience(id: string) {
  await prisma.experience.delete({
    where: { id },
  });

  revalidatePath("/experience");
  return { success: true };
}

// READ (Active/Current)
export async function getCurrentExperience() {
  const experience = await prisma.experience.findFirst({
    where: {
      endDate: null,
    },
    orderBy: { startDate: "desc" },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });

  return experience;
}

// READ (By Date Range)
export async function getExperiencesByDateRange(
  startDate: Date,
  endDate?: Date,
) {
  const experiences = await prisma.experience.findMany({
    where: {
      AND: [
        { startDate: { lte: endDate || new Date() } },
        {
          OR: [{ endDate: null }, { endDate: { gte: startDate } }],
        },
      ],
    },
    orderBy: { startDate: "desc" },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });

  return experiences;
}
