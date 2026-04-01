"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HeaderMenu from "@/component/Utilities/HeaderMenu";
import Pagination from "@/component/Utilities/Pagination";
import AnimeList from "@/component/AnimeList";
import getAnimeResponse from "@/libs/api-libs";

const Page = () => {
  const [page, setPage] = useState(1);
  const [topAnime, setTopAnime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);

      const res = await getAnimeResponse("top/anime", `page=${page}`);

      if (mounted && res?.data) {
        setTopAnime(res);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [page]);

  return (
    <>
      <HeaderMenu title={`Anime Terpopuler #${page}`} />

      {/* BACK BUTTON */}
      <div className="max-w-7xl mx-auto px-4 flex justify-end mb-4">
        <Link
          href="/"
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-xl
            text-sm font-semibold
            text-anime-secondary
            border border-anime-secondary/30
            bg-anime-dark/60
            backdrop-blur-md
            transition-all duration-300
            hover:bg-anime-secondary/20
            hover:scale-105
            active:scale-95
            shadow-md
          "
        >
          ← Kembali
        </Link>
      </div>

      {/* ANIME LIST */}
      <div
        className={`max-w-7xl mx-auto ${loading ? "pointer-events-none opacity-60" : ""}`}
      >
        {topAnime?.data?.length > 0 && <AnimeList api={topAnime} />}
      </div>

      {/* PAGINATION */}
      <div className="max-w-7xl mx-auto px-4 mt-8 pb-10">
        {topAnime?.pagination?.last_visible_page && (
          <Pagination
            page={page}
            setPage={setPage}
            lastPage={topAnime.pagination.last_visible_page}
            disabled={loading}
          />
        )}
      </div>
    </>
  );
};

export default Page;
