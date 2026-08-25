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
    if (order !== undefined) {
      // Get affected projects ordered DESC
      const projectsToShift = await tx.project.findMany({
        where: {
          order: {
            gte: order,
          },
        },
        orderBy: {
          order: "desc",
        },
      });

      // Shift one by one
      for (const project of projectsToShift) {
        await tx.project.update({
          where: {
            id: project.id,
          },
          data: {
            order: project.order + 1,
          },
        });
      }
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
      const direction = newOrder < oldOrder ? 1 : -1;
      const start = Math.min(oldOrder, newOrder);
      const end = Math.max(oldOrder, newOrder);

      await tx.project.updateMany({
        where: {
          order: { gte: start, lte: end },
        },
        data: {
          order: { increment: direction },
        },
      });
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
