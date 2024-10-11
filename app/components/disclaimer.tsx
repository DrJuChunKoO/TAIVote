"use client";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
export default function Disclaimer() {
  const t = useTranslations("common");
  return (
    <div className="mb-4 flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 shadow-md">
      <div className="w-6">
        <Info size={24} />
      </div>
      <div className="text-sm text-gray-300">{t("disclaimer")}</div>
    </div>
  );
}
