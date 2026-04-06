import { listTechnologies, getSkills } from "@/actions";
import { SkillForm } from "@/components/SkillForm";
import { TechnologyForm } from "@/components/TechnologyForm";

import SkillList from "@/features/SkillList";
export default async function page() {
  const skillsData = await getSkills();
  const technologiesList = await listTechnologies();

  const technologies = technologiesList.map((tech) => ({
    id: tech.id,
    name: tech.name,
  }));

  // Pass the skills data array to the form
  const skills =
    skillsData.data?.map((skill) => ({
      id: skill.id,
      technologyId: skill.technologyId,
      level: skill.level,
      order: skill.order,
      visible: skill.visible,
    })) ?? [];

  const currentSkills = skillsData.data?.map((skill) => ({
    id: skill.id,
    name: skill.technology.name,
  }));

  return (
    <div className="flex">
      <SkillForm skillsData={skills} technologies={technologies} />
      <SkillList
        currentTechnologies={currentSkills}
        technologies={technologies}
      />
      <TechnologyForm technologiesData={technologiesList} />
      <div></div>
    </div>
  );
}
