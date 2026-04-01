"use client";
import { useState } from "react";

const VideoPlayer = ({ youtubeId }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!youtubeId) return null;

  return (
    <div className="w-full h-full flex items-center justify-center">
      {isOpen ? (
        <div className="relative w-full h-full">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 z-10 w-8 h-8 text-white bg-black/70 rounded-full hover:bg-black transition"
          >
            ✕
          </button>

          {/* Youtube iframe */}
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
            title="Anime Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-xl"
          />
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-anime-soft rounded-xl shadow-xl hover:scale-105 transition text-anime-dark"
        >
          🎬 Tonton Trailer
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
