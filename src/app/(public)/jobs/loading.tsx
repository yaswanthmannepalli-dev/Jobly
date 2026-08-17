export default function JobsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 space-y-6 animate-pulse">
      {/* Job list items skeleton only — Header and Filters remain static */}
      <div className="space-y-3 pt-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-28 rounded-[5px] bg-surface/40 border border-line/30 p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="h-12 w-12 rounded-[5px] bg-line/50" />
              <div className="space-y-2 flex-1">
                <div className="h-5 w-1/3 bg-line/50 rounded-[5px]" />
                <div className="h-4 w-1/4 bg-line/30 rounded-[5px]" />
              </div>
            </div>
            <div className="h-8 w-24 bg-line/40 rounded-[6px] hidden sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
