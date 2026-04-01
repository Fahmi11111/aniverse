const AnimeCardSkeleton = () => {
  return (
    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-300 animate-pulse">
      {/* score badge */}
      <div className="absolute top-3 right-3 w-10 h-5 bg-gray-400 rounded" />

      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      {/* title */}
      <div className="absolute bottom-3 left-3 right-3 space-y-2">
        <div className="h-3 bg-gray-400 rounded w-3/4" />
        <div className="h-3 bg-gray-400 rounded w-1/2" />
      </div>
    </div>
  );
};

export default AnimeCardSkeleton;
