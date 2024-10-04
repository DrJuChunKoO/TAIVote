import { Locale } from "../../../i18n-config";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
export default function Nav({ lang }: { lang: Locale }) {
  return (
    <nav className="mb-4 bg-gradient-to-b from-black/5 to-black/10 py-2">
      <div className="container flex flex-wrap items-center justify-between">
        <div className="text-2xl font-bold">TAIVote</div>
        <div className="flex gap-2">
          <Link
            href="/en"
            className={twMerge(lang === "en" && "font-bold text-white")}
          >
            EN
          </Link>
          <span className="select-none opacity-10">{" | "}</span>
          <Link
            href="/zh-TW"
            className={twMerge(lang === "zh-TW" && "font-bold text-white")}
          >
            中文
          </Link>
          <span className="select-none opacity-10">{" | "}</span>
          <Link
            href="/ja-JP"
            className={twMerge(lang === "ja-JP" && "font-bold text-white")}
          >
            日本語
          </Link>
        </div>
      </div>
    </nav>
  );
}
