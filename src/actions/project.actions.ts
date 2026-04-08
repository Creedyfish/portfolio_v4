"use server";
import { prisma } from "@/lib/db";
import { CreateProjectInput } from "@/schemas";
import { revalidatePath } from "next/cache";

export async function listProjects() {
  const projects = await prisma.project.findMany({
    orderBy: {
      order: "asc",
    },
    omit: {
      id: true,
      createdAt: true,
      updatedAt: true,
    },
    include: {
      technologies: {
        orderBy: { order: "asc" },
        omit: { order: true },
        include: {
          technology: {
            omit: {
              createdAt: true,
              updatedAt: true,
              order: true,
            },
          },
        },
      },
    },
  });

  return projects.map(({ technologies, ...project }) => ({
    ...project,
    technologies: technologies.map((t) => t.technology),
  }));
}

export async function createProject(data: CreateProjectInput) {
  const { technologyIds, order, ...projectData } = data;

  return await prisma.$transaction(async (tx) => {
    // shift existing
    if (order !== undefined) {
      await tx.project.updateMany({
        where: {
          order: {
            gte: order,
          },
        },
        data: {
          order: {
            increment: 1,
          },
        },
      });
    }

    const project = await tx.project.create({
      data: {
        ...projectData,
        order: order ?? 0,
        ...(technologyIds && {
          technologies: {
            create: technologyIds.map((techId, index) => ({
              technologyId: techId,
              order: index,
            })),
          },
        }),
      },
      include: {
        technologies: {
          orderBy: { order: "asc" },
          include: { technology: true },
        },
      },
    });

    return project;
  });
}

export async function updateProject(slug: string, data: CreateProjectInput) {
  const { technologyIds, order: newOrder, ...updateData } = data;

  return await prisma.$transaction(async (tx) => {
    const existing = await tx.project.findUnique({
      where: { slug },
      select: { order: true },
    });

    if (!existing) throw new Error("Project not found");

    const oldOrder = existing.order;

    if (newOrder !== undefined && newOrder !== oldOrder) {
      if (newOrder < oldOrder) {
        // move up: shift others down
        await tx.project.updateMany({
          where: {
            order: {
              gte: newOrder,
              lt: oldOrder,
            },
          },
          data: {
            order: { increment: 1 },
          },
        });
      } else {
        // move down: shift others up
        await tx.project.updateMany({
          where: {
            order: {
              gt: oldOrder,
              lte: newOrder,
            },
          },
          data: {
            order: { decrement: 1 },
          },
        });
      }
    }

    if (technologyIds) {
      await tx.projectTechnology.deleteMany({
        where: { project: { slug } },
      });
    }

    const project = await tx.project.update({
      where: { slug },
      data: {
        ...updateData,
        ...(newOrder !== undefined && { order: newOrder }),
        ...(technologyIds && {
          technologies: {
            create: technologyIds.map((techId, index) => ({
              technologyId: techId,
              order: index,
            })),
          },
        }),
      },
      include: {
        technologies: {
          orderBy: { order: "asc" },
          include: { technology: true },
        },
      },
    });

    return project;
  });
}

export async function deleteProject(slug: string) {
  await prisma.$transaction(async (tx) => {
    const project = await tx.project.delete({
      where: { slug },
      select: { order: true },
    });

    await tx.project.updateMany({
      where: {
        order: {
          gt: project.order,
        },
      },
      data: {
        order: { decrement: 1 },
      },
    });
  });

  return { success: true };
}

export async function getProjectBySlug(slug: string) {
  const project = await prisma.project.findFirst({
    where: { slug },
    include: {
      technologies: {
        orderBy: { order: "asc" },
        omit: {
          order: true,
        },
        include: {
          technology: {
            omit: {
              createdAt: true,
              updatedAt: true,
              order: true,
            },
          },
        },
      },
    },
  });

  if (!project) {
    return null;
  }

  const { technologies, ...projectWithoutTech } = project;

  return {
    ...projectWithoutTech,
    technologies: technologies.map((t) => t.technology.id),
  };
}
