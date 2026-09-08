import { CertificationForm } from "@/components/CertificationForm";
export default async function page() {
  return (
    <div className="flex flex-col">
      <CertificationForm mode="create" />
    </div>
  );
}
