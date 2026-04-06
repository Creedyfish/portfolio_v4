"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createTechnologySchema } from "@/schemas";
import {
  createTechnology,
  updateTechnology,
  deleteTechnology,
} from "@/actions/technology.actions";

// Import UI components from shadcn/react-aria
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { TextArea } from "@/components/ui/TextArea";
import { Label } from "./ui/Field";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

/* -------- types -------- */

type TechnologyFormInput = z.input<typeof createTechnologySchema>;

type TechnologyData = {
  id: string;
  name: string;
  slug: string;
  iconUrl: string;
  category: string | null;
  description: string | null;
  order: number;
};

type TechnologyFormProps = {
  technologiesData: TechnologyData[]; // All technologies data from server
};

/* -------- Form Component -------- */
export function TechnologyForm({ technologiesData }: TechnologyFormProps) {
  const [selectedTechnology, setSelectedTechnology] =
    useState<TechnologyData | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [slugError, setSlugError] = useState<string>("");

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TechnologyFormInput>({
    resolver: zodResolver(createTechnologySchema),
    defaultValues: {
      name: "",
      slug: "",
      iconUrl: "",
      category: null,
      description: null,
      order: 0,
    },
  });

  const router = useRouter();

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Handle technology selection change
  const handleTechnologyChange = (technologyId: string) => {
    if (!technologyId) {
      // Reset to create mode with defaults
      setMode("create");
      setSelectedTechnology(null);
      reset({
        name: "",
        slug: "",
        iconUrl: "",
        category: null,
        description: null,
        order: 0,
      });
      setSlugError("");
      return;
    }

    // Find existing technology
    const existingTechnology = technologiesData.find(
      (tech) => tech.id === technologyId,
    );

    if (existingTechnology) {
      // Edit mode - populate with existing data
      setMode("edit");
      setSelectedTechnology(existingTechnology);
      reset({
        name: existingTechnology.name,
        slug: existingTechnology.slug,
        iconUrl: existingTechnology.iconUrl,
        category: existingTechnology.category,
        description: existingTechnology.description,
        order: existingTechnology.order,
      });
      setSlugError("");
    }
  };

  // Handle auto-slug generation
  const handleNameChange = (
    name: string,
    onChange: (value: string) => void,
  ) => {
    onChange(name);
    // Only auto-generate slug in create mode or if slug is empty
    if (mode === "create" || !watch("slug")) {
      const newSlug = generateSlug(name);
      setValue("slug", newSlug);
    }
  };

  const onSubmit = async (data: TechnologyFormInput) => {
    try {
      console.log("Form submitted:", data);

      const parsed = createTechnologySchema.parse(data);

      if (mode === "create") {
        await createTechnology(parsed);

        reset({
          name: "",
          slug: "",
          iconUrl: "",
          category: null,
          description: null,
          order: 0,
        });
        setSlugError("");
        alert("Technology created successfully!");
        router.refresh();
      }

      if (mode === "edit" && selectedTechnology) {
        await updateTechnology(selectedTechnology.slug, parsed);

        setSlugError("");
        alert("Technology updated successfully!");
        router.refresh();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save technology. Please try again.");
    }
  };

  const onDelete = async () => {
    if (mode === "edit" && selectedTechnology) {
      const confirmed = confirm(
        "Are you sure you want to delete this technology? This will also remove it from all associated projects, experiences, and skills.",
      );
      if (confirmed) {
        try {
          await deleteTechnology(selectedTechnology.id);

          alert("Technology deleted successfully!");
          // Reset form to create mode
          setMode("create");
          setSelectedTechnology(null);
          reset({
            name: "",
            slug: "",
            iconUrl: "",
            category: null,
            description: null,
            order: 0,
          });
          router.refresh();
        } catch (error) {
          console.error("Error deleting technology:", error);
          alert("Failed to delete technology. Please try again.");
        }
      }
    }
  };

  // const handleFormSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   handleSubmit(onSubmit)(e);
  // };

  // Common categories for quick selection
  const commonCategories = [
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Tool",
    "Framework",
    "Language",
    "Cloud",
    "Testing",
  ];

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <Button onClick={() => router.push("/admin")} variant="secondary">
          {"<-"} Back
        </Button>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Mode: {mode === "create" ? "Create New" : "Edit Existing"}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Technology Selection */}
        <div className="flex flex-col gap-2">
          <Label>Select Technology (optional - for editing)</Label>
          <select
            value={selectedTechnology?.id ?? ""}
            onChange={(e) => handleTechnologyChange(e.target.value)}
            className="rounded border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
          >
            <option value="">Create New Technology</option>
            {technologiesData.map((tech) => (
              <option key={tech.id} value={tech.id}>
                {tech.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500">
            Select a technology to edit, or leave empty to create a new one
          </p>
        </div>

        {/* Name Field */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              label="Technology Name"
              placeholder="e.g., Next.js, TypeScript, React"
              errorMessage={errors.name?.message}
              value={field.value}
              onChange={(value) => handleNameChange(value, field.onChange)}
              onBlur={field.onBlur}
              isInvalid={!!errors.name}
            />
          )}
        />

        {/* Slug Field */}
        <Controller
          name="slug"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <TextField
                label="Slug"
                placeholder="e.g., nextjs, typescript, react"
                errorMessage={slugError || errors.slug?.message}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                isInvalid={!!errors.slug || !!slugError}
              />
              <p className="text-sm text-gray-500">
                URL-friendly identifier (auto-generated from name)
              </p>
            </div>
          )}
        />

        {/* Icon URL Field */}
        <Controller
          name="iconUrl"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <TextField
                label="Icon URL"
                placeholder="https://cdn.simpleicons.org/nextdotjs"
                errorMessage={errors.iconUrl?.message}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                isInvalid={!!errors.iconUrl}
              />
              <p className="text-sm text-gray-500">
                Tip: Use{" "}
                <a
                  href="https://simpleicons.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Simple Icons
                </a>{" "}
                (format: https://cdn.simpleicons.org/[name])
              </p>
              {field.value && (
                <div className="flex items-center gap-2">
                  <Label>Preview:</Label>
                  <Image
                    src={field.value}
                    alt="Icon preview"
                    width={32}
                    height={32}
                    unoptimized
                    className="h-8 w-8"
                    onError={(e) => {
                      console.log(e);
                    }}
                  />
                </div>
              )}
            </div>
          )}
        />

        {/* Category Field */}
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <Label>Category (optional)</Label>
              <select
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value || null)}
                onBlur={field.onBlur}
                className="rounded border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
              >
                <option value="">Select a category</option>
                {commonCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-sm text-red-500">
                  {errors.category.message}
                </span>
              )}
            </div>
          )}
        />

        {/* Description Field */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              label="Description (optional)"
              placeholder="Brief description of this technology and how you use it"
              errorMessage={errors.description?.message}
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={!!errors.description}
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
              placeholder="0"
              errorMessage={errors.order?.message}
              value={field.value?.toString() ?? "0"}
              onChange={(value) => field.onChange(parseInt(value) || 0)}
              onBlur={field.onBlur}
              isInvalid={!!errors.order}
            />
          )}
        />

        {/* Action Buttons */}
        <div className="mt-4 flex gap-3">
          <Button onClick={handleSubmit(onSubmit)} variant="primary">
            {mode === "create" ? "Create Technology" : "Update Technology"}
          </Button>

          {mode === "edit" && (
            <Button onClick={onDelete} variant="secondary">
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
