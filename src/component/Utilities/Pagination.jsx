const Pagination = ({ page, setPage, lastPage }) => {
  const scrollTop = () => {
    scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  const safePage = Math.min(Math.max(page, 1), lastPage || 1);

  return (
    <div className="flex justify-center items-center py-4 px-2 gap-6 text-anime-soft">
      {/* PREV */}
      <button
        onClick={() => {
          if (safePage > 1) {
            setPage(safePage - 1);
            scrollTop();
          }
        }}
        disabled={safePage <= 1}
        className="
          px-3 py-1
          rounded-md
          font-medium
          text-anime-secondary
          hover:text-white
          hover:bg-anime-secondary/20
          transition-all
          disabled:opacity-40
          disabled:cursor-not-allowed
        "
      >
        Prev
      </button>

      {/* PAGE */}
      <p className="px-4 py-1 rounded-md bg-anime-primary/15 text-anime-primary font-semibold">
        {safePage} of {lastPage || 1}
      </p>

      {/* NEXT */}
      <button
        onClick={() => {
          if (safePage < lastPage) {
            setPage(safePage + 1);
            scrollTop();
          }
        }}
        disabled={safePage >= lastPage}
        className="
          px-3 py-1
          rounded-md
          font-medium
          text-anime-secondary
          hover:text-white
          hover:bg-anime-secondary/20
          transition-all
          disabled:opacity-40
          disabled:cursor-not-allowed
        "
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
