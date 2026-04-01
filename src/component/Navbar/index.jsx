import Link from "next/link";
import InputSearch from "./InputSearch";
import UserActionButton from "./UserActionButton";

const Navbar = () => {
  return (
    <header
      className="sticky top-0 z-50
                       bg-anime-primary/80
                       backdrop-blur-2xl
                       border-b border-purple-400/30
                       shadow-[0_0_40px_rgba(168,85,247,0.6)]
                       transition-all duration-300"
    >
      <div className="flex flex-wrap items-center justify-between gap-y-3 px-4 md:px-8 py-4 max-w-7xl mx-auto">
        {/* LEFT */}
        <Link
          href="/"
          className="font-extrabold tracking-[0.2em]
                     text-anime-soft text-xl md:text-2xl
                     transition-all duration-300 ease-in-out
                     hover:text-white
                     hover:scale-110
                     hover:drop-shadow-[0_0_20px_rgba(192,132,252,1)]
                     hover:[text-shadow:
                       0_0_5px_#c084fc,
                       0_0_10px_#a855f7,
                       0_0_20px_#9333ea,
                       0_0_40px_#7e22ce]
                     shrink-0"
        >
          Anime
        </Link>

        {/* RIGHT GROUP */}
        <div className="flex items-center gap-4 flex-wrap justify-end w-full sm:w-auto">
          <InputSearch />
          <UserActionButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
