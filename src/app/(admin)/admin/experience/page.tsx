import { ExperienceForm } from "@/components/ExperienceForm";
export default async function page() {
  return (
    <div className="flex flex-col">
      <ExperienceForm mode="create" />
    </div>
  );
}
