import { ContentBlockForm } from "@/components/ContentForm";

export default function NewContentBlockPage() {
  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-xl font-bold">New Content Block</h1>
      <ContentBlockForm mode="create" />
    </div>
  );
}
