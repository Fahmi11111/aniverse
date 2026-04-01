"use client";
import { useEffect, useState } from "react";

const CommentList = ({ anime_mal_id }) => {
  const [comments, setComments] = useState([]);
  const [sort, setSort] = useState("newest");
  const [replyText, setReplyText] = useState({});

  const getComments = async () => {
    try {
      const res = await fetch(`/api/v1/comment/${anime_mal_id}?sort=${sort}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("API error:", res.status);
        setComments([]);
        return;
      }

      const text = await res.text();

      if (!text) {
        setComments([]);
        return;
      }

      const data = JSON.parse(text);
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setComments([]);
    }
  };

  useEffect(() => {
    getComments();

    const interval = setInterval(() => {
      getComments();
    }, 5000);

    return () => clearInterval(interval);
  }, [sort, anime_mal_id]);

  const handleLike = async (comment_id) => {
    try {
      await fetch("/api/v1/comment/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id }),
      });

      getComments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (comment_id) => {
    try {
      await fetch(`/api/v1/comment/${comment_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: comment_id }),
      });

      getComments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReply = async (comment_id) => {
    if (!replyText[comment_id]) return;

    try {
      await fetch("/api/v1/comment/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment_id,
          reply: replyText[comment_id],
        }),
      });

      setReplyText((prev) => ({ ...prev, [comment_id]: "" }));
      getComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="bg-black border p-2 rounded-lg"
      >
        <option value="newest">Terbaru</option>
        <option value="oldest">Terlama</option>
      </select>

      {comments.map((item) => (
        <div key={item.id} className="bg-white/5 p-4 rounded-xl">
          <div className="flex items-center gap-2">
            {item.user_avatar && (
              <img
                src={item.user_avatar}
                className="w-6 h-6 rounded-full"
                alt=""
              />
            )}
            <p className="font-bold">{item.username}</p>
          </div>

          <p className="text-xs text-gray-400">
            {new Date(item.createdAt).toLocaleString()}
          </p>

          <p className="mt-2">{item.comment}</p>

          <div className="flex gap-4 mt-2 text-xs">
            <button
              onClick={() => handleLike(item.id)}
              className="hover:scale-110 transition"
            >
              ❤️ {item.likes?.length || 0}
            </button>

            {item.canDelete && (
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-400"
              >
                Delete
              </button>
            )}
          </div>

          <div className="mt-2 flex gap-2">
            <input
              value={replyText[item.id] || ""}
              onChange={(e) =>
                setReplyText((prev) => ({
                  ...prev,
                  [item.id]: e.target.value,
                }))
              }
              placeholder="Balas komentar..."
              className="bg-black border p-2 text-sm rounded-lg w-full"
            />

            <button
              onClick={() => handleReply(item.id)}
              className="bg-purple-500 px-3 rounded"
            >
              Reply
            </button>
          </div>

          {item.replies?.map((reply) => (
            <div key={reply.id} className="ml-6 mt-2 border-l pl-3 text-sm">
              <p className="font-bold text-xs">{reply.username}</p>
              <p>{reply.reply}</p>
              <p className="text-xs text-gray-400">
                {new Date(reply.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
