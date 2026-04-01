"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const UserActionButton = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {session ? (
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="
            relative group
            shrink-0
            px-4 py-2
            text-sm md:text-base
            rounded-2xl
            font-medium
            overflow-hidden

            bg-white/10
            backdrop-blur-lg
            text-white
            border border-white/20
            shadow-md

            transition-all duration-300 ease-in-out

            hover:border-fuchsia-400/60
            hover:shadow-neon
            hover:scale-105

            active:scale-95
          "
        >
          {/* Glow layer */}
          <span
            className="
              absolute inset-0
              rounded-2xl
              bg-gradient-to-r from-fuchsia-500/30 via-cyan-400/30 to-indigo-500/30
              opacity-0
              blur-md
              transition-opacity duration-500
              group-hover:opacity-100
            "
          />
          <span className="relative z-10">Logout</span>
        </button>
      ) : (
        <Link
          href="/api/auth/signin"
          className="
            relative group
            shrink-0
            px-4 py-2
            text-sm md:text-base
            rounded-2xl
            font-medium
            overflow-hidden

            bg-white/10
            backdrop-blur-lg
            text-white
            border border-white/20
            shadow-md

            transition-all duration-300 ease-in-out

            hover:border-cyan-400/60
            hover:shadow-neon
            hover:scale-105

            active:scale-95
          "
        >
          <span
            className="
              absolute inset-0
              rounded-2xl
              bg-gradient-to-r from-cyan-400/30 via-fuchsia-500/30 to-indigo-500/30
              opacity-0
              blur-md
              transition-opacity duration-500
              group-hover:opacity-100
            "
          />
          <span className="relative z-10">Login</span>
        </Link>
      )}

      {session ? (
        <Link
          href="/user/dashboard"
          className="
            relative group
            shrink-0
            px-5 py-2
            text-sm md:text-base
            rounded-2xl
            font-semibold
            overflow-hidden

            bg-gradient-to-r from-fuchsia-500 to-cyan-400
            text-white
            shadow-lg

            transition-all duration-300 ease-in-out

            hover:scale-110
            hover:shadow-neon

            active:scale-95
          "
        >
          {/* Pulse Aura */}
          <span
            className="
              absolute -inset-1
              rounded-2xl
              bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-indigo-500
              blur-lg
              opacity-50
              animate-pulseGlow
            "
          />
          <span className="relative z-10">Dashboard</span>
        </Link>
      ) : null}
    </div>
  );
};

export default UserActionButton;
