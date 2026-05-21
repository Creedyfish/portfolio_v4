import { getProjectBySlug, listTechnologies } from "@/actions";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/ProjectForm";
export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const technologiesList = await listTechnologies();
  console.log(slug);
  if (!project) {
    notFound();
  }

  const { technologies: technologyIds, ...rest } = project;

  const initialData = {
    ...rest,
    technologyIds,
    imageUrl: rest.imageUrl ?? undefined,
    repoUrl: rest.repoUrl ?? undefined,
    liveUrl: rest.liveUrl ?? undefined,
  };

  return (
    <div className="flex flex-col">
      <ProjectForm
        slug={slug}
        initialData={initialData}
        techList={technologiesList}
        mode="edit"
      />
    </div>
  );
}
