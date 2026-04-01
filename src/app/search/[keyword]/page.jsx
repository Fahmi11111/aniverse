import getAnimeResponse from "@/libs/api-libs";
import AnimeList from "@/component/AnimeList";
import Link from "next/link";
import Header from "@/component/AnimeList/Header";

const Page = async ({ params }) => {
  const { keyword } = await params; // Next.js 16 dynamic params harus di-await
  const decodeKeyword = decodeURI(keyword);

  const searchAnime = await getAnimeResponse("anime", `q=${decodeKeyword}`);

  return (
    <section className="space-y-3">
      <Header title={`Pencarian ${decodeKeyword}`} />

      <Link
        href="/"
        className="
          ml-auto mr-2
          flex items-center gap-2
          w-fit
          px-4 py-2
          rounded-lg
          border border-anime-secondary/30
          bg-anime-card
          text-sm font-semibold text-anime-secondary
          hover:bg-anime-secondary/10
          active:scale-95
          transition-all duration-200
        "
      >
        <span className="text-base">←</span>
        <span>Kembali</span>
      </Link>

      <AnimeList api={searchAnime} />
    </section>
  );
};

export default Page;
