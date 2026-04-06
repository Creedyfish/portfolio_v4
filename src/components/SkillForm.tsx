"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { skillSchema } from "@/schemas";
import { upsertSkill, deleteSkill } from "@/actions/skill.actions";
import { useState } from "react";

// Import UI components from shadcn/react-aria
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "./ui/Field";
import { useRouter } from "next/navigation";

/* -------- types -------- */

type SkillFormInput = z.input<typeof skillSchema>;

type SkillData = {
  id: string;
  technologyId: string;
  level: number;
  order: number;
  visible: boolean;
};

type SkillFormProps = {
  skillsData: SkillData[]; // All skills data from server
  technologies?: Array<{ id: string; name: string }>;
};

/* -------- Form Component -------- */
export function SkillForm({ skillsData, technologies = [] }: SkillFormProps) {
  const [selectedSkill, setSelectedSkill] = useState<SkillData | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SkillFormInput>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      technologyId: "",
      level: 1,
      order: 0,
      visible: true,
    },
  });

  const router = useRouter();

  // Handle technology selection change
  const handleTechnologyChange = (technologyId: string) => {
    if (!technologyId) {
      // Reset to create mode with defaults
      setMode("create");
      setSelectedSkill(null);
      reset({
        technologyId: "",
        level: 1,
        order: 0,
        visible: true,
      });
      return;
    }

    // Find existing skill for this technology
    const existingSkill = skillsData.find(
      (skill) => skill.technologyId === technologyId,
    );

    if (existingSkill) {
      // Edit mode - populate with existing data
      setMode("edit");
      setSelectedSkill(existingSkill);
      reset({
        technologyId: existingSkill.technologyId,
        level: existingSkill.level,
        order: existingSkill.order,
        visible: existingSkill.visible,
      });
    } else {
      // Create mode - use defaults but keep selected technology
      setMode("create");
      setSelectedSkill(null);
      reset({
        technologyId,
        level: 1,
        order: 0,
        visible: true,
      });
    }
  };

  const onSubmit = async (data: SkillFormInput) => {
    try {
      console.log("Form submitted:", data);

      const result = await upsertSkill(data);

      if (result.success) {
        const message =
          mode === "create"
            ? "Skill created successfully!"
            : "Skill updated successfully!";
        alert(message);
        router.refresh();
      } else {
        alert(`Failed to save skill: ${result.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save skill. Please try again.");
    }
  };

  const onDelete = async () => {
    if (mode === "edit" && selectedSkill) {
      const confirmed = confirm("Are you sure you want to delete this skill?");
      if (confirmed) {
        try {
          const result = await deleteSkill(selectedSkill.id);

          if (result.success) {
            alert("Skill deleted successfully!");
            // Reset form to create mode
            setMode("create");
            setSelectedSkill(null);
            reset({
              technologyId: "",
              level: 1,
              order: 0,
              visible: true,
            });
            router.refresh();
          } else {
            alert(`Failed to delete skill: ${result.error}`);
          }
        } catch (error) {
          console.error("Error deleting skill:", error);
          alert("Failed to delete skill. Please try again.");
        }
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

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

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        {/* Technology Selection */}
        <Controller
          name="technologyId"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <Label>Technology</Label>
              <select
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  handleTechnologyChange(e.target.value);
                }}
                onBlur={field.onBlur}
                className={`rounded border px-3 py-2 ${
                  errors.technologyId
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-800`}
              >
                <option value="">Select a technology</option>
                {technologies.map((tech) => (
                  <option key={tech.id} value={tech.id}>
                    {tech.name}
                  </option>
                ))}
              </select>
              {errors.technologyId && (
                <span className="text-sm text-red-500">
                  {errors.technologyId.message}
                </span>
              )}
            </div>
          )}
        />

        {/* Skill Level */}
        <Controller
          name="level"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <Label>Skill Level (1-5)</Label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={field.value}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  onBlur={field.onBlur}
                  className="flex-1"
                />
                <span className="w-12 text-center font-semibold">
                  {field.value}
                </span>
              </div>
              {errors.level && (
                <span className="text-sm text-red-500">
                  {errors.level.message}
                </span>
              )}
            </div>
          )}
        />

        {/* Display Order */}
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

        {/* Visible Checkbox */}
        <Controller
          name="visible"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <Checkbox
                isSelected={field.value ?? true}
                onChange={field.onChange}
              >
                Visible
              </Checkbox>
            </div>
          )}
        />

        {/* Action Buttons */}
        <div className="mt-4 flex gap-3">
          <Button type="submit" variant="primary">
            {mode === "create" ? "Create Skill" : "Update Skill"}
          </Button>

          {mode === "edit" && (
            <Button type="button" onClick={onDelete} variant="secondary">
              Delete
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
