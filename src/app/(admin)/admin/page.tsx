import AuthForm from "@/components/BasicForm";
import { auth, signOut } from "@/auth";
import { listProjects, listExperiences, deleteProject } from "@/actions";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import DeleteButton from "@/components/DeleteButton";
export default async function Home() {
  const session = await auth();
  const projects = await listProjects();
  const experiences = await listExperiences();
  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center font-sans">
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-sans">
      {session && <div>logged in</div>}

      <div className="flex w-full gap-4 p-4">
        <div className="flex flex-col justify-center gap-2">
          <span className="font-bold text-green-400">Projects</span>
          {projects.map((project) => (
            <div className="flex justify-between gap-2" key={project.slug}>
              <Link passHref href={`/admin/project/${project.slug}`}>
                <Button variant="secondary">{project.slug}</Button>
              </Link>
              <DeleteButton
                action={deleteProject} // ✅ Pass the function reference
                slug={project.slug} // ✅ Pass the slug separately
                variant="destructive"
              >
                {"X"}
              </DeleteButton>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-green-400">Experiences</span>
          {experiences.map((experience) => (
            <div key={experience.id} className="flex justify-between gap-2">
              <Link passHref href={`/admin/experience/${experience.id}`}>
                <Button variant="secondary">{experience.company}</Button>
              </Link>
            </div>
          ))}
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
