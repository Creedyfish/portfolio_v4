"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createContentBlockSchema, updateContentBlockSchema } from "@/schemas";
import {
  createContentBlock,
  updateContentBlock,
  deleteContentBlock,
} from "@/actions/content.actions";

/* ---------- types ---------- */

/* create + edit share INPUT shape discipline */
type CreateInput = z.input<typeof createContentBlockSchema>;
type UpdateInput = z.input<typeof updateContentBlockSchema>;

type ContentBlockFormProps =
  | {
      mode: "create";
    }
  | {
      mode: "edit";
      blockKey: string;
      initialData: UpdateInput;
    };

export function ContentBlockForm(props: ContentBlockFormProps) {
  const isEdit = props.mode === "edit";

  const { register, handleSubmit } = useForm<CreateInput | UpdateInput>({
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
    if (isEdit) {
      await deleteContentBlock(props.blockKey);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!isEdit && (
        <input
          {...register("key" as keyof CreateInput)}
          placeholder="Block key (hero, footer, etc)"
        />
      )}

      <input
        {...register("title" as keyof (CreateInput & UpdateInput))}
        placeholder="Title"
      />

      <textarea
        {...register("content" as keyof (CreateInput & UpdateInput))}
        placeholder="Markdown content"
        rows={8}
      />

      <label>
        <input
          type="checkbox"
          {...register("published" as keyof (CreateInput & UpdateInput))}
        />
        Published
      </label>

      <button type="submit">{isEdit ? "Update Block" : "Create Block"}</button>

      {isEdit && (
        <button type="button" onClick={onDelete}>
          Delete Block
        </button>
      )}
    </form>
  );
}
