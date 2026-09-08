import { CertificationForm } from "@/components/CertificationForm";
import { getCertificationById } from "@/actions";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const certification = await getCertificationById(id);

  if (!certification) {
    notFound();
  }
  const { issueDate, expiryDate, credentialUrl, ...rest } = certification;

  const initialData = {
    issueDate: issueDate ? new Date(issueDate).toISOString().split("T")[0] : "",
    expiryDate: expiryDate
      ? new Date(expiryDate).toISOString().split("T")[0]
      : "",
    credentialUrl: credentialUrl ?? "",
    ...rest,
  };

  return (
    <div>
      <CertificationForm id={id} initialData={initialData} mode="edit" />
    </div>
  );
}
