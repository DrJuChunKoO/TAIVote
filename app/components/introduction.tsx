"use client";
import { useTranslations } from "next-intl";

export default function Introduction() {
  const t = useTranslations("introduction");

  return (
    <div className="mb-8 space-y-4 text-sm">
      {/* Section 1: Why TAIVote? */}
      <section className="mb-4 rounded-xl border border-white/10 bg-white/5 p-4 shadow-md">
        <h2 className="mb-2 text-base font-bold text-gray-200">
          {t("section1.title")}
        </h2>
        <div className="whitespace-pre-line leading-relaxed text-gray-300">
          {t("section1.content")}
        </div>
      </section>

      {/* Section 2: Why TAIVote unique? */}
      <section className="mb-4 rounded-xl border border-white/10 bg-white/5 p-4 shadow-md">
        <h2 className="mb-2 text-base font-bold text-gray-200">
          {t("section2.title")}
        </h2>
        <div className="whitespace-pre-line leading-relaxed text-gray-300">
          {t("section2.content")}
        </div>
      </section>

      {/* Section 3: Technical Support */}
      <section className="mb-4 rounded-xl border border-white/10 bg-white/5 p-4 shadow-md">
        <h2 className="mb-2 text-base font-bold text-gray-200">
          {t("section3.title")}
        </h2>
        <div className="leading-relaxed text-gray-300">
          {t("section3.content")}
        </div>
      </section>

      {/* Section 4: Taiwan's AI Basic Law */}
      {t("section4.content") && (
        <section className="mb-4 rounded-xl border border-white/10 bg-white/5 p-4 shadow-md">
          <h2 className="mb-2 text-base font-bold text-gray-200">
            {t("section4.title")}
          </h2>
          <div className="whitespace-pre-line leading-relaxed text-gray-300">
            {t("section4.content")}
          </div>
          <div className="mt-4">
            <a
              href={t("section4.link_url")}
              className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("section4.link_text")}
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
