"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useSession, signIn } from "next-auth/react";

const InputSearch = () => {
  const searchRef = useRef(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSearch = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      if (!session) {
        signIn();
        return;
      }
      const keyword = searchRef.current?.value.trim();
      if (!keyword) return;
      router.push(`/search/${keyword}`);
    }
  };

  return (
    <div className="relative group w-full sm:w-auto max-w-full sm:max-w-[240px] md:max-w-sm lg:max-w-md">
      {/* Animated Glow Layer */}
      <div
        className="
          absolute -inset-[3px] rounded-2xl
          bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-indigo-500
          opacity-0
          blur-lg
          animate-pulseGlow
          transition-opacity duration-500
          group-focus-within:opacity-100
        "
      />

      <input
        ref={searchRef}
        placeholder={!session ? "Silahkan login" : "Cari anime..."}
        autoComplete="off"
        aria-label="Search anime"
        onKeyDown={handleSearch}
        className="
          relative z-10
          w-full
          px-4 pr-12
          py-2.5
          rounded-2xl
          text-sm md:text-base
          
          bg-white/10
          backdrop-blur-xl
          text-white
          
          border border-white/20
          shadow-lg
          
          outline-none
          transition-all duration-300 ease-in-out
          
          focus:border-transparent
          focus:ring-2 focus:ring-fuchsia-400/60
          focus:shadow-[0_0_25px_rgba(217,70,239,0.8)]
          
          hover:border-white/40
          
          placeholder:text-white/50
        "
      />

      <button
        type="button"
        aria-label="Search button"
        onClick={handleSearch}
        className="
          absolute inset-y-0 right-3
          z-20
          flex items-center justify-center
          
          text-cyan-300
          transition-all duration-300 ease-in-out
          
          group-focus-within:text-fuchsia-400
          group-focus-within:drop-shadow-[0_0_10px_rgba(217,70,239,0.9)]
          active:scale-90
        "
      >
        <MagnifyingGlass size={22} weight="bold" />
      </button>
    </div>
  );
};

export default InputSearch;
