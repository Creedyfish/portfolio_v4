import { prisma } from "@/lib/db";
import HeroMenu from "@/features/landing/components/HeroMenu";

export const revalidate = 60; // revalidate every 60s

async function getHeroContent() {
  const block = await prisma.contentBlock.findUnique({
    where: { key: "hero" },
  });
  return block;
}

export default async function HomePage() {
  const hero = await getHeroContent();

  const lore =
    hero?.content ?? "I create digital experiences one code at a time.";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050810] p-4">
      <HeroMenu lore={lore} />
    </main>
  );
}
