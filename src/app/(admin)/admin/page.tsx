import AuthForm from "@/components/BasicForm";
import { auth, signOut } from "@/auth";
import { listProjects, listExperiences } from "@/actions";

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

      <div className="flex flex-col">
        {projects.map((project) => (
          <div key={project.slug}>{project.slug}</div>
        ))}
      </div>

      <div className="flex flex-col">
        {experiences.map((experience) => (
          <div key={experience.id}>{experience.company}</div>
        ))}
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
