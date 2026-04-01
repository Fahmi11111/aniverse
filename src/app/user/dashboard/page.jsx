"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  Settings,
  Trash2,
  Menu,
  X,
  User,
  Home,
} from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [collection, setCollection] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  function formatLocal(dateString) {
    const date = new Date(dateString.replace("Z", ""));
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  /* ================= FETCH ================= */
  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchCollection = async () => {
      const res = await fetch("/api/v1/collection");
      const data = await res.json();

      if (res.ok) {
        const formatted = data.map((item) => ({
          id: item.id,
          mal_id: Number(item.anime_mal_id),
          title: item.title,
          image: item.image,
          createdAt: item.createdAt,
          favorite: false,
        }));
        setCollection(formatted);
      }
    };

    fetchCollection();
  }, [status]);

  /* ================= DROPDOWN CLOSE ================= */
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= DELETE ONE ================= */
  const removeAnime = async (id) => {
    await fetch("/api/v1/collection", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ anime_mal_id: id }),
    });

    setCollection((prev) => prev.filter((a) => a.mal_id !== id));
  };

  /* ================= CLEAR ALL ================= */
  const clearAll = async () => {
    const res = await fetch("/api/v1/collection", { method: "PUT" });
    if (res.ok) setCollection([]);
  };

  const toggleFavorite = (id) => {
    setCollection((prev) =>
      prev.map((anime) =>
        anime.mal_id === id ? { ...anime, favorite: !anime.favorite } : anime,
      ),
    );
  };

  const totalAnime = collection.length;
  const totalFavorites = collection.filter((a) => a.favorite).length;

  const filtered =
    activeTab === "favorites"
      ? collection.filter((a) => a.favorite)
      : collection;

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white flex relative overflow-x-hidden">
      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-screen w-64 bg-[#111827] p-6 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-purple-400">Anime Panel</h2>
          <X
            className="md:hidden cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        <SidebarButton
          icon={<LayoutDashboard size={18} />}
          label="Collection"
          active={activeTab === "overview"}
          onClick={() => {
            setActiveTab("overview");
            setSidebarOpen(false);
          }}
        />

        <SidebarButton
          icon={<Heart size={18} />}
          label="Favorites"
          active={activeTab === "favorites"}
          onClick={() => {
            setActiveTab("favorites");
            setSidebarOpen(false);
          }}
        />

        <SidebarButton
          icon={<Settings size={18} />}
          label="Settings"
          active={activeTab === "settings"}
          onClick={() => {
            setActiveTab("settings");
            setSidebarOpen(false);
          }}
        />
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 w-full">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <Menu
            className="md:hidden cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />

          <h1 className="text-xl sm:text-2xl font-bold">
            {activeTab.toUpperCase()}
          </h1>

          {/* PROFILE */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <User size={20} />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#1f2937] rounded-lg shadow-lg p-3">
                <p className="text-sm mb-2">{session?.user?.name}</p>

                <button
                  onClick={() => router.push("/")}
                  className="flex items-center gap-2 text-purple-400 text-sm"
                >
                  <Home size={16} />
                  Home
                </button>
              </div>
            )}
          </div>
        </div>

        {/* SETTINGS */}
        {activeTab === "settings" && (
          <button
            onClick={clearAll}
            className="bg-red-600 px-4 py-2 rounded-lg"
          >
            Clear All Collection
          </button>
        )}

        {/* COLLECTION */}
        {activeTab !== "settings" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <StatCard title="Total Anime" value={totalAnime} />
              <StatCard title="Favorites" value={totalFavorites} />
            </div>

            {filtered.length === 0 && (
              <p className="text-gray-400">Belum ada anime.</p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filtered.map((anime) => (
                <div key={anime.id} className="bg-[#111827] rounded-xl p-3">
                  <img
                    src={anime.image}
                    className="rounded-lg mb-2 w-full object-cover"
                  />

                  <h3 className="text-sm line-clamp-2">{anime.title}</h3>

                  <p className="text-xs text-gray-400 mt-1">
                    {formatLocal(anime.createdAt)}
                  </p>

                  <div className="flex justify-between mt-2">
                    <button onClick={() => toggleFavorite(anime.mal_id)}>
                      {anime.favorite ? "💖" : "🤍"}
                    </button>

                    <button
                      onClick={() => removeAnime(anime.mal_id)}
                      className="text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* COMPONENTS */

function SidebarButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition ${
        active
          ? "text-purple-400 bg-purple-500/10"
          : "text-white/70 hover:text-white hover:bg-white/5"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-[#111827] p-6 rounded-xl border border-purple-500/20">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-purple-400 mt-2">{value}</p>
    </div>
  );
}
