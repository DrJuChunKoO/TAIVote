"use client";
import { useTranslations } from "next-intl";
export default function Disclaimer() {
  const t = useTranslations("common");
  return (
    <div className="mb-4 flex flex-col gap-2 rounded-xl bg-white/5 p-4 text-sm text-gray-400">
      <div className="text-gray-300">{t("disclaimer")}</div>
    </div>
  );
}
