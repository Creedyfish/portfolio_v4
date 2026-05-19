"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createContentBlockSchema, updateContentBlockSchema } from "@/schemas";
import {
  createContentBlock,
  updateContentBlock,
  deleteContentBlock,
} from "@/actions/content.actions";
import { Form } from "@/components/ui/Form";
import { TextField } from "@/components/ui/TextField";
import { TextArea } from "@/components/ui/TextArea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

/* ---------- types ---------- */
type CreateInput = z.input<typeof createContentBlockSchema>;
type UpdateInput = z.input<typeof updateContentBlockSchema>;

type ContentBlockFormProps =
  | { mode: "create" }
  | { mode: "edit"; blockKey: string; initialData: UpdateInput };

export function ContentBlockForm(props: ContentBlockFormProps) {
  const isEdit = props.mode === "edit";

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateInput | UpdateInput>({
    resolver: zodResolver(
      isEdit ? updateContentBlockSchema : createContentBlockSchema,
    ),
    defaultValues: isEdit
      ? {
          title: props.initialData.title ?? "",
          content: props.initialData.content ?? "",
          published: props.initialData.published ?? false,
        }
      : {
          key: "",
          title: "",
          content: "",
          published: false,
        },
  });

  const onSubmit = async (data: CreateInput | UpdateInput) => {
    if (!isEdit) {
      await createContentBlock(
        createContentBlockSchema.parse(data as CreateInput),
      );
      return;
    }
    await updateContentBlock(
      props.blockKey,
      updateContentBlockSchema.parse(data as UpdateInput),
    );
  };

  const onDelete = async () => {
    if (isEdit) await deleteContentBlock(props.blockKey);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Key field — create mode only */}
      {!isEdit && (
        <Controller
          name={"key" as keyof CreateInput}
          control={control}
          render={({ field }) => (
            <TextField
              label="Block Key"
              placeholder="hero, about, footer…"
              value={field.value as string}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={!!errors["key" as keyof typeof errors]}
              errorMessage={
                (errors["key" as keyof typeof errors]?.message as string) ?? ""
              }
            />
          )}
        />
      )}

      {/* Title */}
      <Controller
        name={"title" as keyof (CreateInput & UpdateInput)}
        control={control}
        render={({ field }) => (
          <TextField
            label="Title"
            placeholder="Optional heading override"
            value={field.value as string}
            onChange={field.onChange}
            onBlur={field.onBlur}
            isInvalid={!!errors["title" as keyof typeof errors]}
            errorMessage={
              (errors["title" as keyof typeof errors]?.message as string) ?? ""
            }
          />
        )}
      />

      {/* Content (Markdown) */}
      <Controller
        name={"content" as keyof (CreateInput & UpdateInput)}
        control={control}
        render={({ field }) => (
          <TextArea
            label="Content"
            placeholder="Markdown content…"
            value={field.value as string}
            onChange={field.onChange}
            onBlur={field.onBlur}
            isInvalid={!!errors["content" as keyof typeof errors]}
            errorMessage={
              (errors["content" as keyof typeof errors]?.message as string) ??
              ""
            }
            className="min-h-32"
          />
        )}
      />

      {/* Published toggle */}
      <Controller
        name={"published" as keyof (CreateInput & UpdateInput)}
        control={control}
        render={({ field }) => (
          <Checkbox
            isSelected={field.value as boolean}
            onChange={field.onChange}
          >
            Published
          </Checkbox>
        )}
      />

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button type="submit" variant="primary" isDisabled={isSubmitting}>
          {isSubmitting ? "Saving…" : isEdit ? "Update Block" : "Create Block"}
        </Button>

        {isEdit && (
          <Button type="button" variant="destructive" onPress={onDelete}>
            Delete Block
          </Button>
        )}
      </div>
    </Form>
  );
}
