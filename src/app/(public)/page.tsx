import { prisma } from "@/lib/db";

export default async function Home() {
  const projects = await prisma.project.findMany();
  console.log(projects);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {projects[0].title}
    </div>
  );
}
