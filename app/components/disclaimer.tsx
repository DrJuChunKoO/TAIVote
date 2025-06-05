"use client";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
export default function Disclaimer() {
  const t = useTranslations("common");
  const before = t("disclaimer_before");
  const link = t("disclaimer_link");
  const after = t("disclaimer_after");
  return (
    <div className="mb-4 flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 shadow-md">
      <div className="w-6">
        <Info size={24} />
      </div>
      <div className="text-sm text-gray-300">
        {before}
        <a
          href="https://juchunko.com/docs/act/meta"
          className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
          title={link}
          aria-label={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link}
        </a>
        {after}
      </div>
    </div>
  );
}
