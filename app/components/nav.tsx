"use client";
import { twMerge } from "tailwind-merge";
import { useLocale } from "next-intl";
import { setUserLocale } from "../../services/locale";
import { Locale } from "../../i18n/config";
export default function Nav() {
  return (
    <nav className="bg-gradient-to-b from-black/5 to-black/10 py-2">
      <div className="container flex flex-wrap items-center justify-between">
        <div className="text-2xl font-bold">TAIVote</div>
        <div className="flex gap-2">
          <LocaleButton locale="en" text="EN" />
          <span className="select-none opacity-10">{" | "}</span>
          <LocaleButton locale="zh-TW" text="中文" />
          <span className="select-none opacity-10">{" | "}</span>
          <LocaleButton locale="ja-JP" text="日本語" />
        </div>
      </div>
    </nav>
  );
}
function LocaleButton({ locale, text }: { locale: Locale; text: string }) {
  const currentLocale = useLocale();
  return (
    <button
      className={twMerge(locale === currentLocale && "font-bold text-white")}
      onClick={() => setUserLocale(locale)}
    >
      {text}
    </button>
  );
}
