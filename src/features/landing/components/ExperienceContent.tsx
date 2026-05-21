import LoadingState from "@/features/landing/components/LoadingState";
import ExperienceList from "./ExperienceList";
import { listExperiences } from "@/actions/experience.actions";

export type ExperienceTech = {
  technology: {
    id: string;
    name: string;
    iconUrl: string;
    slug: string;
  };
};

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
  technologies?: ExperienceTech[];
};

export default async function ExperienceContent() {
  const experiences = await listExperiences();

  if (experiences === undefined) return <LoadingState />;

  return <ExperienceList experiences={experiences} />;
}
