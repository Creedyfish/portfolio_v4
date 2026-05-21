import { ExperienceForm } from "@/components/ExperienceForm";
import { getExperienceBySlug } from "@/actions";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = await getExperienceBySlug(id);

  if (!experience) {
    notFound();
  }
  const { startDate, endDate, ...rest } = experience;

  const initialData = {
    startDate: startDate ? new Date(startDate).toISOString().split("T")[0] : "",
    endDate: endDate ? new Date(endDate).toISOString().split("T")[0] : "",
    ...rest,
  };

  console.log(startDate);
  console.log(initialData.startDate);
  return (
    <div>
      <ExperienceForm id={id} initialData={initialData} mode="edit" />
    </div>
  );
}
