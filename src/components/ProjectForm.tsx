"use client";

import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createProjectSchema, Technology } from "@/schemas";
import {
  createProject,
  updateProject,
  deleteProject,
} from "@/actions/project.actions";

// Import UI components from shadcn/react-aria
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { TextArea } from "@/components/ui/TextArea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "./ui/Field";
import { useRouter } from "next/navigation";

/* -------- types -------- */

type ProjectFormInput = z.input<typeof createProjectSchema>;

type ProjectFormProps = {
  mode: "create" | "edit";
  slug?: string;
  initialData?: ProjectFormInput;
  techList: Array<Technology>;
};

/* -------- Form Component -------- */
export function ProjectForm({
  mode,
  slug,
  initialData,
  techList,
}: ProjectFormProps) {
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProjectFormInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      slug: initialData?.slug ?? "",
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      summary: initialData?.summary ?? "",
      role: initialData?.role ?? "",
      imageUrl: initialData?.imageUrl ?? undefined, // convert: null → undefined
      repoUrl: initialData?.repoUrl ?? undefined, // convert: null → undefined
      liveUrl: initialData?.liveUrl ?? undefined, // convert: null → undefined
      featured: initialData?.featured ?? false,
      order: initialData?.order ?? 0,
      technologyIds: initialData?.technologyIds ?? [],
    },
  });
  console.log(watch());
  const router = useRouter();
  const onSubmit = async (data: ProjectFormInput) => {
    try {
      console.log("Form submitted:", data);

      const parsed = createProjectSchema.parse(data);

      if (mode === "create") {
        await createProject(parsed);
        reset();
        alert("Project created successfully!"); // ✅ Success alert here
        router.push("/admin");
        // Optional: redirect or reset form
        // router.push('/projects');
      }

      if (mode === "edit" && slug) {
        await updateProject(slug, parsed);
        alert("Project updated successfully!"); // ✅ Success alert here
        router.push("/admin");
        // Optional: redirect
        // router.push(`/projects/${slug}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save project. Please try again."); // ❌ Error alert
    }
  };

  const onDelete = async () => {
    console.log("Delete project:", slug);
    if (mode === "edit" && slug) {
      await deleteProject(slug);
    }
  };

  const addSelectedTech = (id: string) => {
    const currentTechIds = getValues("technologyIds");
    if (!currentTechIds.includes(id)) {
      setValue("technologyIds", [...currentTechIds, id]);
    }
  };

  const removeSelectedTech = (id: string) => {
    const currentTechIds = getValues("technologyIds");
    setValue(
      "technologyIds",
      currentTechIds.filter((techId) => techId !== id),
    );
  };

  const selectedIds = useWatch({
    control,
    name: "technologyIds",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 p-6">
      <div>
        <Button onClick={() => router.push("/admin")} variant="secondary">
          {"<-"} Back
        </Button>
      </div>
      <form onSubmit={handleFormSubmit} className="">
        {/* Slug Field */}
        <Controller
          name="slug"
          control={control}
          render={({ field }) => (
            <TextField
              label="Slug"
              isDisabled={mode === "edit"}
              errorMessage={errors.slug?.message}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        {errors.slug && (
          <span className="text-red-500">{errors.slug.message}</span>
        )}
        {/* Title Field */}
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              label="Title"
              errorMessage={errors.title?.message}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
        {/* Summary Field */}
        <Controller
          name="summary"
          control={control}
          render={({ field }) => (
            <TextArea
              label="Summary"
              placeholder="Brief project summary"
              errorMessage={errors.summary?.message}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        {errors.summary && (
          <span className="text-red-500">{errors.summary.message}</span>
        )}
        {/* Description Field */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              label="Description"
              placeholder="Detailed project description"
              errorMessage={errors.description?.message}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
        {/* Role Field */}
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <TextField
              label="Your Role"
              placeholder="e.g., Full Stack Developer"
              errorMessage={errors.role?.message}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        {errors.role && (
          <span className="text-red-500">{errors.role.message}</span>
        )}
        {/* Image URL Field */}
        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <TextField
              label="Image URL"
              placeholder="https://example.com/image.jpg"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        {/* Demo URL Field */}
        <Controller
          name="repoUrl"
          control={control}
          render={({ field }) => (
            <TextField
              label="Repo URL"
              placeholder="https://demo.example.com"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        {/* GitHub URL Field */}
        <Controller
          name="liveUrl"
          control={control}
          render={({ field }) => (
            <TextField
              label="Live URL"
              placeholder="https://github.com/username/repo"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        {/* Order Field */}
        <Controller
          name="order"
          control={control}
          render={({ field }) => (
            <TextField
              label="Display Order"
              type="number"
              errorMessage={errors.order?.message}
              value={field.value?.toString()}
              onChange={(value) => field.onChange(parseInt(value) || 0)}
              onBlur={field.onBlur}
            />
          )}
        />
        {/* Featured Checkbox */}
        <Controller
          name="featured"
          control={control}
          render={({ field }) => (
            <Checkbox isSelected={field.value} onChange={field.onChange}>
              Featured Project
            </Checkbox>
          )}
        />
        {/* Selected Technologies */}

        {selectedIds.length > 0 && (
          <div className="flex flex-col gap-2">
            <Label>Selected Technologies</Label>
            <div className="flex flex-wrap gap-2">
              {techList
                .filter((tech) => selectedIds.includes(tech.id))
                .map((tech) => (
                  <Button
                    key={tech.id}
                    variant="secondary"
                    onPress={() => removeSelectedTech(tech.id)}
                  >
                    {tech.name} ✕
                  </Button>
                ))}
            </div>
          </div>
        )}
        {/* Available Technologies */}
        {techList.filter((tech) => !selectedIds.includes(tech.id)).length >
          0 && (
          <div className="flex flex-col gap-2">
            <Label>Add Technologies</Label>
            <div className="flex flex-wrap gap-2">
              {techList
                .filter((tech) => !selectedIds.includes(tech.id))
                .map((tech) => (
                  <Button
                    key={tech.id}
                    variant="primary"
                    onPress={() => addSelectedTech(tech.id)}
                  >
                    {tech.name} +
                  </Button>
                ))}
            </div>
          </div>
        )}
        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="primary">
            {mode === "create" ? "Create Project" : "Update Project"}
          </Button>

          {mode === "edit" && (
            <Button variant="destructive" onPress={onDelete}>
              Delete Project
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
