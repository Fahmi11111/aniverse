import { FileSearchIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen max-w-xl mx-auto flex justify-center items-center bg-anime-soft">
      <div className="flex justify-center items-center gap-4 flex-col">
        <FileSearchIcon
          size={44}
          className="text-anime-primary animate-float"
        />

        <h3 className="text-anime-dark text-4xl font-bold">Not Found</h3>

        <Link
          href="/"
          className="text-anime-secondary hover:text-anime-primary transition-all"
        >
          Kembali
        </Link>
      </div>
    </div>
  );
}
