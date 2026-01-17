"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import {
  CreateContentBlockInput,
  UpdateContentBlockInput,
} from "@/schemas/content";

export async function createContentBlock(data: CreateContentBlockInput) {
  const block = await prisma.contentBlock.create({
    data,
    omit: {
      id: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  revalidatePath("/");
  return block;
}

export async function listContentBlocks() {
  return prisma.contentBlock.findMany({
    orderBy: { key: "asc" },
    omit: {
      id: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getContentBlockByKey(key: string) {
  return prisma.contentBlock.findUnique({
    where: { key },
    omit: {
      id: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function updateContentBlock(
  key: string,
  data: UpdateContentBlockInput,
) {
  const block = await prisma.contentBlock.update({
    where: { key },
    data,
    omit: {
      id: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  revalidatePath("/");
  return block;
}

export async function deleteContentBlock(key: string) {
  await prisma.contentBlock.delete({
    where: { key },
  });

  revalidatePath("/");
  return { success: true };
}
