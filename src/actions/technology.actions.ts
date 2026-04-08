"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { CreateTechnologyInput, UpdateTechnologyInput } from "@/schemas";

export async function createTechnology(data: CreateTechnologyInput) {
  return prisma.$transaction(async (tx) => {
    const insertOrder = data.order ?? (await tx.technology.count()) + 1;

    // Step 1: push affected rows into temporary space
    await tx.technology.updateMany({
      where: { order: { gte: insertOrder } },
      data: { order: { increment: 1000000 } },
    });

    // Step 2: normalize back down
    await tx.technology.updateMany({
      where: { order: { gte: insertOrder + 1000000 } },
      data: { order: { decrement: 1000000 - 1 } },
    });

    // Step 3: insert
    return tx.technology.create({
      data: {
        ...data,
        order: insertOrder,
      },
    });
  });
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
  return prisma.$transaction(async (tx) => {
    const existing = await tx.technology.findUnique({
      where: { slug },
      select: { order: true },
    });

    if (!existing) throw new Error("Technology not found");

    const oldOrder = existing.order;
    const newOrder = data.order;

    if (newOrder !== undefined && newOrder !== oldOrder) {
      const direction = newOrder < oldOrder ? 1 : -1;

      const start = Math.min(oldOrder, newOrder);
      const end = Math.max(oldOrder, newOrder);

      await tx.technology.updateMany({
        where: {
          order: {
            gte: start,
            lte: end,
          },
        },
        data: {
          order: {
            increment: direction,
          },
        },
      });
    }

    return tx.technology.update({
      where: { slug },
      data,
    });
  });
}

export async function deleteTechnology(id: string) {
  await prisma.$transaction(async (tx) => {
    const tech = await tx.technology.delete({
      where: { id },
      select: { order: true },
    });

    await tx.technology.updateMany({
      where: {
        order: { gt: tech.order },
      },
      data: {
        order: { decrement: 1 },
      },
    });
  });

  return { success: true };
}
