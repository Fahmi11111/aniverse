"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

const AnimeList = ({ api }) => {
  const { data: session } = useSession();
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (anime) => {
    try {
      if (typeof window === "undefined") return;

      const stored = JSON.parse(localStorage.getItem("anime_collection")) || [];

      const exists = stored.find((item) => item.mal_id === anime.mal_id);

      if (exists) {
        setAddedId(anime.mal_id);
        setTimeout(() => setAddedId(null), 1500);
        return;
      }

      const newAnime = {
        mal_id: anime.mal_id,
        title: anime.title,
        image: anime.images.webp.image_url,
        score: anime.score,
        favorite: false,
        addedAt: new Date().toISOString(),
      };

      const updated = [...stored, newAnime];
      localStorage.setItem("anime_collection", JSON.stringify(updated));

      setAddedId(anime.mal_id);
      setTimeout(() => setAddedId(null), 1500);
    } catch (error) {
      console.error("Gagal menambahkan:", error);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = JSON.parse(localStorage.getItem("anime_collection")) || [];

    if (stored.length > 0) {
      setAddedId(null);
    }
  }, []);

  const handleClick = (e) => {
    if (!session) {
      e.preventDefault();
      signIn();
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4 pb-10">
      {api?.data
        ?.filter((anime) => Number.isInteger(anime?.mal_id))
        .map((anime) => (
          <div
            key={anime.mal_id}
            className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#0f172a] shadow-lg transition-all duration-500 ease-out hover:shadow-[0_0_40px_rgba(108,99,255,0.8)]"
          >
            {/* LINK WRAPPER */}
            <Link
              href={`/anime/${anime.mal_id}`}
              onClick={handleClick}
              className={`absolute inset-0 z-10 rounded-3xl overflow-hidden ${
                !session ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <Image
                src={anime.images.webp.image_url}
                alt={anime.title}
                fill
                sizes="(max-width:640px) 50vw, (max-width:768px) 33vw, 25vw"
                className="object-cover scale-105 transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-purple-900/40 to-transparent pointer-events-none" />

              {/* Diagonal Sweep */}
              <div className="absolute -left-1/2 top-0 w-[200%] h-full rotate-12 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[100%] pointer-events-none" />

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.35)_0%,transparent_70%)] pointer-events-none" />
            </Link>

            {/* SCORE */}
            {anime.score && (
              <span className="absolute top-3 right-3 z-20 text-xs text-white bg-black/60 px-2 py-1 rounded-xl border border-anime-primary shadow-lg backdrop-blur-md">
                ⭐ {anime.score}
              </span>
            )}

            {/* CONTENT */}
            <div className="absolute bottom-0 w-full p-4 z-20 pointer-events-none">
              <h3 className="text-white font-semibold text-sm line-clamp-2 transition-colors duration-300 group-hover:text-anime-primary">
                {anime.title}
              </h3>

              {anime.year && (
                <p className="text-white/70 text-xs mt-1">{anime.year}</p>
              )}
            </div>

            {/* Neon Border Hover */}
            <div className="absolute inset-0 rounded-3xl border border-transparent transition-all duration-300 group-hover:border-anime-primary pointer-events-none" />
          </div>
        ))}
    </div>
  );
};

export default AnimeList;
