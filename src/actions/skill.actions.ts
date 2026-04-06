"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import {
  skillSchema,
  updateSkillSchema,
  type SkillInput,
  type UpdateSkillInput,
} from "@/schemas";

// Create a new skill
export async function createSkill(data: SkillInput) {
  try {
    const validated = skillSchema.parse(data);

    const skill = await prisma.skill.create({
      data: validated,
      include: {
        technology: true,
      },
    });

    return { success: true, data: skill };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error };
    }
    return { success: false, error: "Failed to create skill" };
  }
}

export async function upsertSkill(data: SkillInput) {
  try {
    const validated = skillSchema.parse(data);

    const skill = await prisma.skill.upsert({
      where: {
        technologyId: validated.technologyId, // or use a unique constraint
      },
      update: validated,
      create: validated,
      include: {
        technology: true,
      },
    });

    return { success: true, data: skill };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error };
    }
    return { success: false, error: "Failed to upsert skill" };
  }
}

// Get all skills
export async function getSkills() {
  try {
    const skills = await prisma.skill.findMany({
      include: {
        technology: true,
      },
      orderBy: {
        order: "asc",
      },
    });

    return { success: true, data: skills };
  } catch (_error) {
    return { success: false, error: "Failed to fetch skills" };
  }
}

// Get a single skill by ID
export async function getSkillById(id: string) {
  try {
    const skill = await prisma.skill.findUnique({
      where: { id },
      include: {
        technology: true,
      },
    });

    if (!skill) {
      return { success: false, error: "Skill not found" };
    }

    return { success: true, data: skill };
  } catch (_error) {
    return { success: false, error: "Failed to fetch skill" };
  }
}

// Get skill by technology ID
export async function getSkillByTechnologyId(technologyId: string) {
  try {
    const skill = await prisma.skill.findUnique({
      where: { technologyId },
      include: {
        technology: true,
      },
    });

    if (!skill) {
      return { success: false, error: "Skill not found" };
    }

    return { success: true, data: skill };
  } catch (_error) {
    return { success: false, error: "Failed to fetch skill" };
  }
}

// Update a skill
export async function updateSkill(id: string, data: UpdateSkillInput) {
  try {
    const validated = updateSkillSchema.parse(data);

    const skill = await prisma.skill.update({
      where: { id },
      data: validated,
      include: {
        technology: true,
      },
    });

    revalidatePath("/skills"); // Adjust path as needed
    return { success: true, data: skill };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error };
    }
    return { success: false, error: "Failed to update skill" };
  }
}

// Delete a skill
export async function deleteSkill(id: string) {
  try {
    await prisma.skill.delete({
      where: { id },
    });

    revalidatePath("/admin/skills"); // Adjust path as needed
    return { success: true };
  } catch (_error) {
    return { success: false, error: "Failed to delete skill" };
  }
}

// Toggle skill visibility
export async function toggleSkillVisibility(id: string) {
  try {
    const skill = await prisma.skill.findUnique({
      where: { id },
      select: { visible: true },
    });

    if (!skill) {
      return { success: false, error: "Skill not found" };
    }

    const updated = await prisma.skill.update({
      where: { id },
      data: { visible: !skill.visible },
      include: {
        technology: true,
      },
    });

    return { success: true, data: updated };
  } catch (_error) {
    return { success: false, error: "Failed to toggle visibility" };
  }
}

// Reorder skills
export async function reorderSkills(
  skillOrders: { id: string; order: number }[],
) {
  try {
    await prisma.$transaction(
      skillOrders.map(({ id, order }) =>
        prisma.skill.update({
          where: { id },
          data: { order },
        }),
      ),
    );

    revalidatePath("/skills"); // Adjust path as needed
    return { success: true };
  } catch (_error) {
    return { success: false, error: "Failed to reorder skills" };
  }
}
