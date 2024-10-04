import { useTranslations } from "next-intl";
export default function VoteButton() {
  const t = useTranslations("common");
  return (
    <div className="container">
      <div className="rounded-t-xl border border-b-0 border-white/10 p-4 shadow-md">
        <button className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:from-pink-600 hover:to-purple-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          {t("vote")}
        </button>
      </div>
    </div>
  );
}
