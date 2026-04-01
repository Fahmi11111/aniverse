"use client";
import { useState } from "react";

const CommentInput = ({ anime_mal_id, title }) => {
  const [comment, setComment] = useState("");

  const handlePosting = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/v1/comment/${anime_mal_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        anime_mal_id,
        comment,
        title,
      }),
    });

    if (res.ok) {
      setComment("");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tambahkan komentar..."
        className="p-3 bg-black border rounded-lg"
      />

      <button
        onClick={handlePosting}
        className="bg-purple-500 px-4 py-2 rounded"
      >
        Kirim komentar
      </button>
    </div>
  );
};

export default CommentInput;
