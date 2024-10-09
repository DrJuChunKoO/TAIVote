"use client";
import { useLocale } from "next-intl";
import { useEffect } from "react";

export default function AutoSetLang({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();

  useEffect(() => {
    // set HTML lang
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return children;
}
