import { auth } from "@/auth";
import { listProjects } from "@/actions/project.actions";

export default async function Home() {
  const projects = await listProjects();
  const session = await auth();
  console.log(projects);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {session && <div>logged in</div>}
      {projects[0].technologies[0].name}
      {/* {listProjects.map((project)=><div></div>)} */}
      {/* {!session ? (
        <ProjectsForm />
      ) : (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      )} */}
    </div>
  );
}
