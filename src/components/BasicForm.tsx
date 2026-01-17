// src/components/ProjectsForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formDataSchema } from "@/schemas";
import { FormData } from "@/schemas";
import { login } from "@/actions/admin.actions";

export default function AuthForm() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(formDataSchema),
  });

  const onSubmit = async (data: FormData) => await login(data);

  return (
    <div className="bg-red-500">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("email")} placeholder="email" />{" "}
        <input
          type="password"
          {...register("password")}
          placeholder="password"
        />
        <button type="submit">Submt</button>
      </form>
    </div>
  );
}
