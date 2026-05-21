import AuthForm from "@/components/BasicForm";
import { auth, signOut } from "@/auth";
import { listProjects, listExperiences, deleteProject } from "@/actions";
import {
  listContentBlocks,
  deleteContentBlock,
} from "@/actions/content.actions";
import { deleteExperience } from "@/actions/experience.actions";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import DeleteButton from "@/components/DeleteButton";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center font-sans">
        <AuthForm />
      </div>
    );
  }

  const [projects, experiences, contentBlocks] = await Promise.all([
    listProjects(),
    listExperiences(),
    listContentBlocks(),
  ]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-sans">
      <div className="flex w-full flex-wrap gap-4 p-4">
        {/* Projects */}
        <div className="flex flex-col gap-2">
          <span className="font-bold text-green-400">Projects</span>
          {projects.map((project) => (
            <div
              className="flex items-center justify-between gap-2"
              key={project.slug}
            >
              <Link passHref href={`/admin/project/${project.slug}`}>
                <Button variant="secondary">{project.slug}</Button>
              </Link>
              <DeleteButton
                action={deleteProject}
                slug={project.slug}
                variant="destructive"
              />
            </div>
          ))}
        </div>

        {/* Experiences */}
        <div className="flex flex-col gap-2">
          <span className="font-bold text-green-400">Experiences</span>
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="flex items-center justify-between gap-2"
            >
              <Link passHref href={`/admin/experience/${experience.id}`}>
                <Button variant="secondary">{experience.company}</Button>
              </Link>
              <DeleteButton
                action={deleteExperience}
                slug={experience.id}
                variant="destructive"
              />
            </div>
          ))}
        </div>

        {/* Content Blocks */}
        <div className="flex flex-col gap-2">
          <span className="font-bold text-green-400">Content Blocks</span>
          {contentBlocks.length === 0 && (
            <span className="text-sm text-gray-400">No blocks yet.</span>
          )}
          {contentBlocks.map((block) => (
            <div
              key={block.key}
              className="flex items-center justify-between gap-2"
            >
              <Link passHref href={`/admin/content/${block.key}`}>
                <Button variant="secondary">
                  <span className="font-mono">{block.key}</span>
                  {!block.published && (
                    <span className="ml-2 text-xs text-yellow-400">
                      (draft)
                    </span>
                  )}
                </Button>
              </Link>
              <DeleteButton
                action={deleteContentBlock}
                slug={block.key}
                variant="destructive"
              />
            </div>
          ))}
          <Link passHref href="/admin/content">
            <Button variant="primary">+ New Block</Button>
          </Link>
        </div>
      </div>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
