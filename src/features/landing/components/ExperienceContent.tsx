import LoadingState from "@/features/landing/components/LoadingState";
import ExperienceList from "./ExperienceList";
import { listExperiences } from "@/actions/experience.actions";
// ── Server actions ────────────────────────────────────────────────

export type Experience = {
  id: string;
  company: string;
  companyLogo?: string | null;
  position: string;
  description: string;
  contributions?: string[] | string | null;
  startDate: Date;
  endDate?: Date | null;
  published: boolean;
  order: number;
};
// ── EXPERIENCE ────────────────────────────────────────────────────

export default async function ExperienceContent() {
  const experiences = await listExperiences();

  if (experiences === undefined) return <LoadingState />;

  return <ExperienceList experiences={experiences} />;
}
