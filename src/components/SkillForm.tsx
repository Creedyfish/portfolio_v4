"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  skillSchema,
  updateSkillSchema,
  SkillInput,
  UpdateSkillInput,
} from "@/schemas";
import { createSkill, updateSkill } from "@/actions/skill.actions";

export function CreateSkillForm() {
  const { register, handleSubmit } = useForm<SkillInput>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      order: 0,
      visible: true,
    },
  });

  const onSubmit = async (data: SkillInput) => {
    await createSkill(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("technologyId")}
        placeholder="Technology ID"
      />

      <input
        type="number"
        {...register("level", { valueAsNumber: true })}
        placeholder="Level (1–5)"
      />

      <input
        type="number"
        {...register("order", { valueAsNumber: true })}
        placeholder="Order"
      />

      <label>
        <input type="checkbox" {...register("visible")} />
        Visible
      </label>

      <button type="submit">Create Skill</button>
    </form>
  );
}

export function UpdateSkillForm({ skillId }: { skillId: string }) {
  const { register, handleSubmit } = useForm<UpdateSkillInput>({
    resolver: zodResolver(updateSkillSchema),
  });

  const onSubmit = async (data: UpdateSkillInput) => {
    await updateSkill(skillId, data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        {...register("level", { valueAsNumber: true })}
        placeholder="Level (1–5)"
      />

      <input
        type="number"
        {...register("order", { valueAsNumber: true })}
        placeholder="Order"
      />

      <label>
        <input type="checkbox" {...register("visible")} />
        Visible
      </label>

      <button type="submit">Update Skill</button>
    </form>
  );
}
