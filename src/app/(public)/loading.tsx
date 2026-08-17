export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 space-y-8 animate-pulse">
      {/* Job list grid skeletons only - Hero stays static */}
      <div className="space-y-4 pt-4">
        <div className="h-6 w-40 bg-line/50 rounded-[5px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-[5px] bg-surface/40 border border-line/30 p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-[5px] bg-line/50" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-1/3 bg-line/50 rounded-[5px]" />
                  <div className="h-3 w-1/4 bg-line/30 rounded-[5px]" />
                </div>
              </div>
              <div className="h-3 w-full bg-line/30 rounded-[5px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
