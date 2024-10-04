export const i18n = {
  defaultLocale: "en",
  locales: ["en", "ja-JP", "zh-TW"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
