import LoadingState from "@/features/landing/components/LoadingState";
import { listProjects } from "@/actions/project.actions";
import ProjectList from "./ProjectsList";

// ── Main component ────────────────────────────────────────────────
export default async function ProjectsContent() {
  const projects = await listProjects();

  if (projects === undefined) return <LoadingState />;

  return (
    <>
      <ProjectList projects={projects} />
    </>
  );
}
