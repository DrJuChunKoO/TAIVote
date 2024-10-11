"use client";
import { TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
export default function Disclaimer() {
  const t = useTranslations("common");
  return (
    <div className="mb-4 flex gap-2 rounded-xl border border-white/10 bg-white/5 p-4 shadow-md">
      <TriangleAlert size={32} />
      <div className="text-sm text-gray-300">{t("disclaimer")}</div>
    </div>
  );
}
