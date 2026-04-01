import AnimeCardSkeleton from "@/component/AnimeList/AnimeCardSkeleton.jsx";

export default function Loading() {
  return (
    <section className="px-4 py-6">
      <div className="mb-4 h-6 w-40 bg-gray-300 rounded animate-pulse" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <AnimeCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
