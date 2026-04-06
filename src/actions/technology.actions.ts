"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { CreateTechnologyInput, UpdateTechnologyInput } from "@/schemas";

export async function createTechnology(data: CreateTechnologyInput) {
  const technology = await prisma.technology.create({
    data,
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });

  revalidatePath("/technologies");
  return technology;
}

export async function listTechnologies() {
  return prisma.technology.findMany({
    orderBy: { order: "asc" },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getTechnologyBySlug(slug: string) {
  return prisma.technology.findUnique({
    where: { slug },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function updateTechnology(
  slug: string,
  data: UpdateTechnologyInput,
) {
  const technology = await prisma.technology.update({
    where: { slug },
    data,
    omit: {
      id: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  revalidatePath("/technologies");
  revalidatePath(`/technologies/${slug}`);
  return technology;
}

export async function deleteTechnology(id: string) {
  await prisma.technology.delete({
    where: { id },
  });

  revalidatePath("/admin/technologies");
  return { success: true };
}
