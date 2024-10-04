export type Locale = (typeof locales)[number];

export const locales = ["en", "zh-TW", "ja-JP"] as const;
export const defaultLocale: Locale = "en";
