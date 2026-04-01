import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import getAnimeResponse from "@/libs/api-libs";
import VideoPlayer from "@/component/Utilities/VideoPlayer";
import AddToCollectionButton from "@/component/Utilities/AddToCollectionButton";
import CommentInput from "@/component/AnimeList/CommentInput";
import CommentList from "@/component/AnimeList/CommentList";

import { getServerSession } from "next-auth";
import { authOption } from "@/libs/auth-libs";

const Page = async (props) => {
  const session = await getServerSession(authOption);

  const params = await props.params;
  const id = params.id;

  if (!id) notFound();

  const animeRes = await getAnimeResponse(`anime/${id}`);
  if (!animeRes || !animeRes.data) notFound();
  const data = animeRes.data;

  const videosRes = await getAnimeResponse(`anime/${id}/videos`);

  const trailerId =
    data?.trailer?.youtube_id ??
    data?.trailer?.embed_url?.split("/embed/")[1] ??
    videosRes?.data?.promo?.[0]?.trailer?.youtube_id ??
    videosRes?.data?.promo?.[0]?.trailer?.embed_url?.split("/embed/")[1] ??
    null;

  const recRes = await getAnimeResponse(`anime/${id}/recommendations`);
  const recList = recRes?.data?.slice(0, 4) ?? [];

  const recommendations = await Promise.all(
    recList.map(async (rec) => {
      const detail = await getAnimeResponse(`anime/${rec.entry.mal_id}`);
      return {
        ...rec,
        score: detail?.data?.score ?? null,
        year: detail?.data?.year ?? null,
      };
    }),
  );

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-50">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-3xl opacity-40"
          style={{
            backgroundImage: `url(${data.images.jpg.large_image_url})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/60" />
      </div>

      <div className="relative max-w-6xl 2xl:max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 pb-24">
        {/* HERO */}
        <div className="max-w-4xl space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold">
            {data.title}
          </h1>

          <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-300">
            {[
              `${data.year ?? "-"}`,
              `⭐ ${data.score ?? "-"}`,
              `Rank #${data.rank ?? "-"}`,
              `${data.episodes ?? "-"} Episodes`,
              `${data.members ?? "-"} Members`,
            ].map((item, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-[380px_1fr] gap-12 mt-16 items-start">
          {/* POSTER */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-[260px] sm:w-[320px] md:w-[360px] lg:w-full max-w-[420px]">
              <Image
                src={data.images.jpg.large_image_url}
                alt={data.title}
                width={500}
                height={750}
                priority
                className="rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col gap-10">
            {/* GENRES */}
            <div className="flex flex-wrap gap-2">
              {data.genres?.map((genre) => (
                <span
                  key={genre.mal_id}
                  className="px-3 py-1.5 text-xs bg-white/10 border border-white/20 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* SYNOPSIS */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Story Overview
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base text-justify">
                {data.synopsis || "Sinopsis belum tersedia."}
              </p>
            </div>

            {/* BUTTON */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
              <div className="h-[48px] flex items-center">
                <AddToCollectionButton anime={data} />
              </div>

              <Link
                href="/"
                className="flex items-center justify-center h-[48px] px-6 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition text-sm font-semibold"
              >
                ← Back
              </Link>
            </div>
          </div>
        </div>

        {/* TRAILER */}
        <div className="mt-24">
          {trailerId ? (
            <div className="w-full max-w-5xl mx-auto">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                <VideoPlayer youtubeId={trailerId} />
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center">Trailer belum tersedia</p>
          )}
        </div>

        {/* COMMENT SECTION */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Komentar</h2>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            {!session ? (
              <p className="text-gray-400">Login untuk menulis komentar</p>
            ) : (
              <CommentInput
                anime_mal_id={data.mal_id}
                title={data.title}
                user_email={session?.user?.email}
                username={session?.user?.name}
              />
            )}

            <div className="mt-6">
              <CommentList anime_mal_id={data.mal_id} />
            </div>
          </div>
        </div>

        {/* RECOMMENDATIONS */}
        <div className="mt-24">
          <h2 className="text-xl sm:text-2xl font-bold mb-8">Rekomendasi</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {recommendations.map((rec) => (
              <div key={rec.entry.mal_id}>
                <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#0f172a] shadow-lg transition-all duration-500 ease-out hover:shadow-[0_0_40px_rgba(108,99,255,0.8)]">
                  <Link
                    href={`/anime/${rec.entry.mal_id}`}
                    className="absolute inset-0 z-10 rounded-3xl overflow-hidden"
                  >
                    <Image
                      src={rec.entry.images.jpg.image_url}
                      alt={rec.entry.title}
                      fill
                      className="object-cover scale-105 transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-purple-900/40 to-transparent" />
                  </Link>

                  {rec.score && (
                    <span className="absolute top-3 right-3 z-20 text-xs text-white bg-black/60 px-2 py-1 rounded-xl border border-anime-primary backdrop-blur-md">
                      ⭐ {rec.score}
                    </span>
                  )}

                  <div className="absolute bottom-0 w-full p-4 z-20">
                    <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-anime-primary">
                      {rec.entry.title}
                    </h3>

                    {rec.year && (
                      <p className="text-white/70 text-xs mt-1">{rec.year}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
