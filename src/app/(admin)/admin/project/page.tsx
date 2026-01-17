import { listTechnologies } from "@/actions";
import { ProjectForm } from "@/components/ProjectForm";
export default async function page() {
  const technologies = await listTechnologies();
  return (
    <div className="flex flex-col">
      <ProjectForm techList={technologies} mode="create" />
    </div>
  );
}
