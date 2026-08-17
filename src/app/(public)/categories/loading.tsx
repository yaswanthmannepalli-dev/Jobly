export default function CategoriesLoading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 space-y-8 animate-pulse">
      <div className="space-y-3">
        <div className="h-8 w-44 bg-line/60 rounded-[5px]" />
        <div className="h-4 w-72 bg-line/30 rounded-[5px]" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-32 rounded-[5px] bg-surface/40 border border-line/30 p-5 flex flex-col justify-between">
            <div className="h-10 w-10 rounded-[5px] bg-line/50" />
            <div className="h-5 w-24 bg-line/40 rounded-[5px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
