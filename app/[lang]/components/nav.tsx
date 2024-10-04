import { Locale } from "../../../i18n-config";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
export default function Nav({ lang }: { lang: Locale }) {
  return (
    <nav className="p-3">
      <div className="container flex flex-wrap items-center justify-between">
        <div className="text-2xl font-bold">TAIVote</div>
        <div className="flex gap-2">
          <Link
            href="/en"
            className={twMerge(lang === "en" && "font-bold text-white")}
          >
            EN
          </Link>
          {" | "}
          <Link
            href="/zh-TW"
            className={twMerge(lang === "zh-TW" && "font-bold text-white")}
          >
            中文
          </Link>
          {" | "}
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
