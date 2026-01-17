// src/components/TechnologyForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTechnologyInput, createTechnologySchema } from "@/schemas";
import {
  createTechnology,
  updateTechnology,
} from "@/actions/technology.actions";

export function CreateTechnologyForm() {
  const { register, handleSubmit } = useForm<CreateTechnologyInput>({
    resolver: zodResolver(createTechnologySchema),
  });

  const onSubmit = async (data: CreateTechnologyInput) => {
    await createTechnology(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("name")} placeholder="Name" />
      <input type="text" {...register("slug")} placeholder="Slug" />
      <input type="text" {...register("category")} placeholder="Category" />
      <input
        type="text"
        {...register("iconUrl")}
        placeholder="Icon (optional)"
      />
      <input type="number" {...register("order")} placeholder="Order" />
      <button type="submit">Create Technology</button>
    </form>
  );
}

export function UpdateTechnologyForm({
  technologySlug,
}: {
  technologySlug: string;
}) {
  const { register, handleSubmit } = useForm<CreateTechnologyInput>({
    resolver: zodResolver(createTechnologySchema),
  });

  const onSubmit = async (data: CreateTechnologyInput) => {
    await updateTechnology(technologySlug, data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("name")} placeholder="Name" />
      <input type="text" {...register("category")} placeholder="Category" />
      <input
        type="text"
        {...register("iconUrl")}
        placeholder="Icon (optional)"
      />
      <input type="number" {...register("order")} placeholder="Order" />
      <button type="submit">Update Technology</button>
    </form>
  );
}
