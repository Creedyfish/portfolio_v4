import { getContentBlockByKey } from "@/actions/content.actions";
import { ContentBlockForm } from "@/components/ContentForm";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ key: string }>;
}

export default async function EditContentBlockPage({ params }: Props) {
  const { key } = await params;
  const block = await getContentBlockByKey(key);

  if (!block) notFound();

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-2 text-xl font-bold">
        Edit Block: <span className="font-mono text-green-400">{key}</span>
      </h1>
      <p className="mb-6 text-sm text-gray-400">
        {block.title ?? "No title set"}
      </p>
      <ContentBlockForm
        mode="edit"
        blockKey={key}
        initialData={{
          title: block.title ?? "",
          content: block.content,
          published: block.published,
        }}
      />
    </div>
  );
}
