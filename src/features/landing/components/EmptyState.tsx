export default function EmptyState({ label }: { label: string }) {
  return (
    <div className="px-6 py-12 text-center">
      <p className="font-pixel text-[9px] tracking-widest text-[#152535] uppercase">
        {label}
      </p>
    </div>
  );
}
