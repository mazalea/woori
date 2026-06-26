export function MentionBar({ count, max }: { count: number; max: number }) {
  const pct = Math.round((count / max) * 100);
  return (
    <div className="flex-1 h-3 overflow-hidden rounded-full bg-[#E0E9F2]">
      <div className="h-full rounded-full bg-[#B1DAFF]" style={{ width: `${pct}%` }} />
    </div>
  );
}
