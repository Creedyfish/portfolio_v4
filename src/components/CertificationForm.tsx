"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createCertificationSchema } from "@/schemas";
import {
  createCertification,
  updateCertification,
  deleteCertification,
} from "@/actions/certification.actions";

import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { Checkbox } from "@/components/ui/Checkbox";
import { DatePicker } from "@/components/ui/DatePicker";
import { useRouter } from "next/navigation";
import { parseDate } from "@internationalized/date";

// Fixed placeholder (not derived from "now") so the empty DatePicker renders
// identically on the server and the client regardless of each one's timezone —
// react-aria falls back to today()'s local timezone internally otherwise, which
// causes a hydration mismatch whenever server/client disagree on the date.
const DATE_PLACEHOLDER = parseDate("2000-01-01");

/* -------- types -------- */

type CertificationFormInput = z.input<typeof createCertificationSchema>;

type CertificationFormProps = {
  mode: "create" | "edit";
  id?: string;
  initialData?: CertificationFormInput;
};

/* -------- Form Component -------- */
export function CertificationForm({
  mode,
  id,
  initialData,
}: CertificationFormProps) {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<CertificationFormInput>({
    resolver: zodResolver(createCertificationSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      issuer: initialData?.issuer ?? "",
      badgeUrl: initialData?.badgeUrl ?? "",
      credentialUrl: initialData?.credentialUrl ?? "",
      issueDate: initialData?.issueDate ?? "",
      expiryDate: initialData?.expiryDate ?? "",
      order: initialData?.order ?? 0,
      published: initialData?.published ?? true,
    },
  });

  const router = useRouter();
  const badgeUrl = watch("badgeUrl");

  const onSubmit = async (data: CertificationFormInput) => {
    try {
      const parsed = createCertificationSchema.parse(data);

      if (mode === "create") {
        await createCertification(parsed);
        reset();
        alert("Certification created successfully!");
        router.push("/admin");
      }

      if (mode === "edit" && id) {
        await updateCertification(id, parsed);
        alert("Certification updated successfully!");
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save certification. Please try again.");
    }
  };

  const onDelete = async () => {
    if (mode === "edit" && id) {
      const confirmed = confirm(
        "Are you sure you want to delete this certification?",
      );
      if (confirmed) {
        try {
          await deleteCertification(id);
          alert("Certification deleted successfully!");
          router.push("/admin");
        } catch (error) {
          console.error("Error deleting certification:", error);
          alert("Failed to delete certification. Please try again.");
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
      <div>
        <Button onClick={() => router.push("/admin")} variant="secondary">
          {"<-"} Back
        </Button>
      </div>

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        {/* Name Field */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              label="Certification Name"
              placeholder="e.g., AWS Certified AI Practitioner"
              errorMessage={errors.name?.message}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={!!errors.name}
            />
          )}
        />

        {/* Issuer Field */}
        <Controller
          name="issuer"
          control={control}
          render={({ field }) => (
            <TextField
              label="Issuer"
              placeholder="e.g., Amazon Web Services"
              errorMessage={errors.issuer?.message}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={!!errors.issuer}
            />
          )}
        />

        {/* Badge URL Field */}
        <Controller
          name="badgeUrl"
          control={control}
          render={({ field }) => (
            <TextField
              label="Badge Image URL"
              placeholder="https://images.credly.com/..."
              errorMessage={errors.badgeUrl?.message}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={!!errors.badgeUrl}
            />
          )}
        />

        {badgeUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={badgeUrl}
            alt="Badge preview"
            className="size-24 self-start object-contain"
          />
        )}

        {/* Credential URL Field */}
        <Controller
          name="credentialUrl"
          control={control}
          render={({ field }) => (
            <TextField
              label="Verification URL (optional)"
              placeholder="https://www.credly.com/badges/..."
              errorMessage={errors.credentialUrl?.message}
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={!!errors.credentialUrl}
            />
          )}
        />

        {/* Issue Date Field */}
        <Controller
          name="issueDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Issue Date"
              value={field.value ? parseDate(field.value) : null}
              placeholderValue={DATE_PLACEHOLDER}
              onChange={(date) => {
                const dateStr = date
                  ? `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`
                  : "";
                field.onChange(dateStr);
              }}
              errorMessage={errors.issueDate?.message}
              isInvalid={!!errors.issueDate}
            />
          )}
        />

        {/* Expiry Date Field */}
        <Controller
          name="expiryDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Expiry Date (optional)"
              value={field.value ? parseDate(field.value) : null}
              placeholderValue={DATE_PLACEHOLDER}
              onChange={(date) => {
                const dateStr = date
                  ? `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`
                  : "";
                field.onChange(dateStr);
              }}
              errorMessage={errors.expiryDate?.message}
              isInvalid={!!errors.expiryDate}
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
                isSelected={field.value ?? true}
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
            {mode === "create" ? "Create Certification" : "Update Certification"}
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
