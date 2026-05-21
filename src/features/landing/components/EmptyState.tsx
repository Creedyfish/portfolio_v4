export default function EmptyState({ label }: { label: string }) {
  return (
    <div className="px-6 py-12 text-center">
      <p className="text-text-faint font-pixel text-[9px] tracking-widest uppercase">
        {label}
      </p>
    </div>
  );
}
