"use server";
import { prisma } from "@/lib/db";
import { CreateProjectInput } from "@/schemas";
import { revalidatePath } from "next/cache";
export async function listProjects() {
  const projects = await prisma.project.findMany({
    omit: {
      id: true,
      createdAt: true,
      updatedAt: true,
    },
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

  return projects.map(({ technologies, ...project }) => ({
    ...project,
    technologies: technologies.map((t) => t.technology),
  }));
}

export async function createProject(data: CreateProjectInput) {
  const { technologyIds, ...projectData } = data;

  const project = await prisma.project.create({
    data: {
      ...projectData,
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
  const { technologies, ...projectWithoutTech } = project;

  return {
    ...projectWithoutTech,
    technologies: technologies.map((t) => t.technology),
  };
}

export async function updateProject(slug: string, data: CreateProjectInput) {
  const { technologyIds, ...updateData } = data;

  // If updating technologies, delete old ones and create new ones
  if (technologyIds) {
    await prisma.projectTechnology.deleteMany({
      where: { project: { slug } },
    });
  }

  const project = await prisma.project.update({
    where: { slug },
    data: {
      ...updateData,
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

  const { technologies, ...projectWithoutTech } = project;

  return {
    ...projectWithoutTech,
    technologies: technologies.map((t) => t.technology),
  };
}

export async function deleteProject(slug: string) {
  await prisma.project.delete({
    where: { slug },
  });
  revalidatePath("/admin");
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
