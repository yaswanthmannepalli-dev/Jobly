export default function JobDetailLoading() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="rounded-[5px] bg-surface/50 border border-line/40 p-6 sm:p-8 space-y-6">
        <div className="flex items-start gap-5">
          <div className="h-16 w-16 rounded-[5px] bg-line/50" />
          <div className="space-y-3 flex-1">
            <div className="h-7 w-2/3 bg-line/60 rounded-[5px]" />
            <div className="h-4 w-1/3 bg-line/40 rounded-[5px]" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <div className="h-8 w-24 bg-line/40 rounded-[6px]" />
          <div className="h-8 w-28 bg-line/40 rounded-[6px]" />
          <div className="h-8 w-32 bg-line/40 rounded-[6px]" />
        </div>
      </div>

      {/* Content body skeleton */}
      <div className="space-y-6 rounded-[5px] bg-surface/30 border border-line/30 p-6 sm:p-8">
        <div className="h-6 w-40 bg-line/50 rounded-[5px]" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-line/30 rounded-[5px]" />
          <div className="h-4 w-5/6 bg-line/30 rounded-[5px]" />
          <div className="h-4 w-4/6 bg-line/30 rounded-[5px]" />
        </div>
      </div>
    </div>
  );
}
