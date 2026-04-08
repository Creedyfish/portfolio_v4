"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createExperienceSchema } from "@/schemas";
import {
  createExperience,
  updateExperience,
  deleteExperience,
} from "@/actions/experience.actions";

// Import UI components from shadcn/react-aria
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { TextArea } from "@/components/ui/TextArea";
import { Checkbox } from "@/components/ui/Checkbox";
import { DatePicker } from "@/components/ui/DatePicker";
import { Label } from "./ui/Field";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { parseDate, today } from "@internationalized/date";
/* -------- types -------- */

type ExperienceFormInput = z.input<typeof createExperienceSchema>;

type ExperienceFormProps = {
  mode: "create" | "edit";
  id?: string;
  initialData?: ExperienceFormInput;
};

/* -------- Form Component -------- */
export function ExperienceForm({ mode, id, initialData }: ExperienceFormProps) {
  const [contributions, setContributions] = useState<string[]>(
    initialData?.contributions ?? [],
  );
  const [contributionInput, setContributionInput] = useState("");

  const {
    handleSubmit,
    control,
    reset,

    formState: { errors },
  } = useForm<ExperienceFormInput>({
    resolver: zodResolver(createExperienceSchema),
    defaultValues: {
      company: initialData?.company ?? "",
      companyLogo: initialData?.companyLogo ?? "",
      position: initialData?.position ?? "",
      description: initialData?.description ?? "",
      contributions: initialData?.contributions ?? [],
      startDate: initialData?.startDate ?? "",
      endDate: initialData?.endDate ?? "",
      order: initialData?.order ?? 0,
      published: initialData?.published ?? false,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: ExperienceFormInput) => {
    try {
      console.log("Form submitted:", data);

      const parsed = createExperienceSchema.parse({
        ...data,
        contributions,
      });
      console.log(id);
      if (mode === "create") {
        await createExperience(parsed);
        reset();
        setContributions([]);
        alert("Experience created successfully!");
        router.push("/admin");
      }

      if (mode === "edit" && id) {
        await updateExperience(id, parsed);
        alert("Experience updated successfully!");
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save experience. Please try again.");
    }
  };

  const onDelete = async () => {
    if (mode === "edit" && id) {
      const confirmed = confirm(
        "Are you sure you want to delete this experience?",
      );
      if (confirmed) {
        try {
          await deleteExperience(id);
          alert("Experience deleted successfully!");
          router.push("/admin");
        } catch (error) {
          console.error("Error deleting experience:", error);
          alert("Failed to delete experience. Please try again.");
        }
      }
    }
  };

  const addContribution = () => {
    if (contributionInput.trim()) {
      setContributions([...contributions, contributionInput.trim()]);
      setContributionInput("");
    }
  };

  const removeContribution = (index: number) => {
    setContributions(contributions.filter((_, i) => i !== index));
  };

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

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        {/* Company Field */}
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <TextField
              label="Company"
              errorMessage={errors.company?.message}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={!!errors.company}
            />
          )}
        />

        {/* Company Logo URL Field */}
        <Controller
          name="companyLogo"
          control={control}
          render={({ field }) => (
            <TextField
              label="Company Logo URL (optional)"
              placeholder="https://example.com/logo.png"
              errorMessage={errors.companyLogo?.message}
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={!!errors.companyLogo}
            />
          )}
        />

        {/* Position Field */}
        <Controller
          name="position"
          control={control}
          render={({ field }) => (
            <TextField
              label="Position"
              placeholder="e.g., Senior Software Engineer"
              errorMessage={errors.position?.message}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={!!errors.position}
            />
          )}
        />

        {/* Description Field */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              label="Description"
              placeholder="Brief overview of your role and responsibilities"
              errorMessage={errors.description?.message}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={!!errors.description}
            />
          )}
        />

        {/* Contributions Field */}
        <div className="flex flex-col gap-2">
          <Label>Key Contributions</Label>
          <div className="flex gap-2">
            <TextField
              label="Contribution"
              className="flex-1"
              placeholder="Add a key contribution or achievement"
              value={contributionInput}
              onChange={setContributionInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addContribution();
                }
              }}
              isInvalid={!!errors.contributions}
            />
            <Button type="button" onClick={addContribution} variant="secondary">
              Add
            </Button>
          </div>
          {contributions.length > 0 && (
            <ul className="mt-2 flex flex-col gap-2">
              {contributions.map((contribution, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between rounded border bg-gray-50 px-3 py-2 text-white dark:text-black"
                >
                  <span className="flex-1">{contribution}</span>
                  <Button
                    type="button"
                    onClick={() => removeContribution(index)}
                    variant="secondary"
                    className="ml-2"
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Start Date Field */}
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Start Date"
              value={field.value ? parseDate(field.value) : today("UTC")} // string to DateValue
              onChange={(date) => {
                // DateValue to string (YYYY-MM-DD)
                const dateStr = date
                  ? `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`
                  : "";
                field.onChange(dateStr);
              }}
              errorMessage={errors.startDate?.message}
              isInvalid={!!errors.startDate}
            />
          )}
        />

        {/* End Date Field */}
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="End Date"
              value={field.value ? parseDate(field.value) : today("UTC")} // string to DateValue
              onChange={(date) => {
                // DateValue to string (YYYY-MM-DD)
                const dateStr = date
                  ? `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`
                  : "";
                field.onChange(dateStr);
              }}
              errorMessage={errors.endDate?.message}
              isInvalid={!!errors.endDate}
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

        {/* Published Checkbox */}
        <Controller
          name="published"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <Checkbox
                isSelected={field.value ?? false}
                onChange={field.onChange}
              >
                Published
              </Checkbox>
            </div>
          )}
        />

        {/* Action Buttons */}
        <div className="mt-4 flex gap-3">
          <Button type="submit" variant="primary">
            {mode === "create" ? "Create Experience" : "Update Experience"}
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
