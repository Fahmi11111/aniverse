export const dynamic = "force-dynamic";

import AnimeList from "../component/AnimeList";
import Header from "@/component/AnimeList/Header";
import getAnimeResponse, { getNestedAnimeResponse } from "@/libs/api-libs";

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=8");
  const recommendedRaw = await getNestedAnimeResponse(
    "recommendations/anime",
    "entry",
  );

  // hapus duplikat berdasarkan mal_id
  const uniqueAnime = Array.from(
    new Map(recommendedRaw.map((anime) => [anime.mal_id, anime])).values(),
  );

  const finalAnime = [];

  for (let anime of uniqueAnime) {
    if (finalAnime.length === 4) break;

    try {
      const detail = await getAnimeResponse(`anime/${anime.mal_id}`);
      if (detail?.data) {
        finalAnime.push(detail.data);
      }
    } catch {
      // skip jika error
    }
  }

  // fallback jika kurang dari 4
  if (finalAnime.length < 4 && topAnime?.data) {
    const needed = 4 - finalAnime.length;
    finalAnime.push(...topAnime.data.slice(0, needed));
  }

  const recommendedAnime = {
    data: finalAnime,
  };

  if (!topAnime?.data) {
    return (
      <div className="pt-10 text-center text-anime-muted">
        Gagal memuat anime populer.
      </div>
    );
  }

  return (
    <>
      <section className="bg-black">
        <Header
          title="Paling Populer"
          linkTitle="Lihat semua"
          linkHref="/populer"
        />
        <AnimeList api={topAnime} />
      </section>

      <section className="bg-black">
        <Header title="Rekomendasi" />
        <AnimeList api={recommendedAnime} />
      </section>
    </>
  );
};

export default Page;
