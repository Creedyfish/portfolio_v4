import { prisma } from "@/lib/db";
import ParallaxScene from "@/features/landing/components/ParallaxScene";
import { Suspense } from "react";
import LoadingState from "@/features/landing/components/LoadingState";
import AboutContent from "@/features/landing/components/AboutContent";
import ProjectsContent from "@/features/landing/components/ProjectsContent";
import SkillsContent from "@/features/landing/components/SkillsContent";
import ExperienceContent from "@/features/landing/components/ExperienceContent";
import ContactContent from "@/features/landing/components/ContactContent";
export const revalidate = 60;

async function getHeroContent() {
  return prisma.contentBlock.findUnique({ where: { key: "hero" } });
}

export default async function HomePage() {
  const hero = await getHeroContent();
  const lore =
    hero?.content ?? "I create digital experiences one code at a time.";

  const contentMap: Record<string, React.ReactNode> = {
    about: (
      <Suspense fallback={<LoadingState />}>
        <AboutContent />
      </Suspense>
    ),
    projects: (
      <Suspense fallback={<LoadingState />}>
        <ProjectsContent />
      </Suspense>
    ),
    skills: (
      <Suspense fallback={<LoadingState />}>
        <SkillsContent />
      </Suspense>
    ),
    experience: (
      <Suspense fallback={<LoadingState />}>
        <ExperienceContent />
      </Suspense>
    ),
    contact: (
      <Suspense fallback={<LoadingState />}>
        <ContactContent />
      </Suspense>
    ),
  };

  return (
    <main className="h-svh overflow-hidden bg-[#050810]">
      <ParallaxScene lore={lore} contentMap={contentMap} />
    </main>
  );
}
