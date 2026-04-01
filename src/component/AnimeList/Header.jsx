"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";

const Header = ({ title, linkHref, linkTitle }) => {
  const { data: session } = useSession();

  const handleClick = (e) => {
    if (!session) {
      e.preventDefault();
      e.stopPropagation();
      signIn();
    }
  };

  return (
    <div className="px-4 pt-10 pb-6 flex justify-between items-center">
      <h1
        className="
          text-2xl md:text-3xl
          font-extrabold
          tracking-tight
          text-anime-soft
          relative
          after:absolute after:-bottom-2 after:left-0
          after:h-[3px] after:w-10
          after:bg-anime-primary
          after:rounded-full
        "
      >
        {title}
      </h1>

      {linkHref && linkTitle ? (
        <Link
          href={linkHref}
          onClick={handleClick}
          className="
            group
            md:text-lg text-sm
            font-medium
            text-anime-primary
            relative
            transition-all duration-300
          "
        >
          <span
            className="
              underline underline-offset-4
              decoration-2
              group-hover:decoration-anime-secondary
              group-hover:text-anime-secondary
              transition-all duration-300
            "
          >
            {linkTitle}
          </span>

          <span
            className="
              absolute left-0 -bottom-1
              h-[2px] w-0
              bg-anime-secondary
              transition-all duration-300
              group-hover:w-full
            "
          />
        </Link>
      ) : null}
    </div>
  );
};

export default Header;
