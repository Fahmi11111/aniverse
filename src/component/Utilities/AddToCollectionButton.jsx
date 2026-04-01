"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { useNotification } from "@/context/NotificationContext";
import { fireConfetti } from "@/component/Utilities/confetti";

const AddToCollectionButton = ({ anime }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();
  const { pushNotification } = useNotification();

  const handleAdd = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/v1/collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          anime_mal_id: anime.mal_id,
          title: anime.title,
          image: anime.images.jpg.image_url,
        }),
      });

      console.log("STATUS:", res.status);

      let data = null;

      try {
        data = await res.json();
      } catch (e) {
        console.error("Response bukan JSON");
        showToast({
          message: "Server error",
          type: "error",
        });
        setLoading(false);
        return;
      }
      console.log("DATA:", data);

      if (!res.ok) {
        showToast({
          message: "Harus login dulu!",
          type: "error",
        });
        setLoading(false);
        return;
      }

      if (data.duplicate) {
        showToast({
          message: "Sudah ada di koleksi",
          type: "info",
        });
        setLoading(false);
        return;
      }

      if (data.success) {
        fireConfetti();

        showToast({
          message: "Berhasil ditambahkan ke koleksi!",
          description: anime.title,
          type: "success",
        });

        setTimeout(() => {
          router.push("/user/dashboard");
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      showToast({
        message: "Server error",
        type: "error",
      });
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className="h-[48px] px-6 rounded-full font-semibold text-white bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:scale-105 transition-all duration-300 shadow-lg"
    >
      {loading ? "Adding..." : "+ Add to Collection"}
    </button>
  );
};

export default AddToCollectionButton;
