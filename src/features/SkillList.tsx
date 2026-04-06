"use client";
import { Button } from "@/components/ui/Button";
import { deleteSkill, deleteTechnology } from "@/actions";

interface SkillListProps {
  currentTechnologies:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  technologies: {
    id: string;
    name: string;
  }[];
}

export default function SkillList({
  currentTechnologies,
  technologies,
}: SkillListProps) {
  return (
    <div className="flex justify-between gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-green-400">Skills</span>
        {currentTechnologies?.map((tech) => (
          <div
            key={tech.id}
            className="flex items-center justify-between gap-2"
          >
            {tech.name}
            <Button
              type="button"
              onPress={() => {
                if (!confirm("Are you sure?")) return;
                deleteSkill(tech.id);
              }}
              variant="destructive"
            >
              X
            </Button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-green-400">Technology</span>
        {technologies?.map((tech) => (
          <div
            key={tech.id}
            className="flex items-center justify-between gap-2"
          >
            {tech.name}
            <Button
              type="button"
              onPress={() => {
                if (!confirm("Are you sure?")) return;
                deleteTechnology(tech.id);
              }}
              variant="destructive"
            >
              X
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
