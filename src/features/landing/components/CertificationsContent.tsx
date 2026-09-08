import EmptyState from "./EmptyState";
import CertificationsList from "./CertificationsList";
import { listCertifications } from "@/actions/certification.actions";

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  badgeUrl: string;
  credentialUrl?: string | null;
  issueDate: Date;
  expiryDate?: Date | null;
  order: number;
  published: boolean;
};

export default async function CertificationsContent() {
  const certifications = await listCertifications();

  const visible = certifications.filter((c) => c.published);
  if (visible.length === 0)
    return <EmptyState label="No certifications yet" />;

  return <CertificationsList certifications={visible} />;
}
