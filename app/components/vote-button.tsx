"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Button from "@/app/components/button";
export default function VoteButton() {
  const router = useRouter();
  const t = useTranslations("common");
  return (
    <div className="container">
      <div className="rounded-t-xl border border-b-0 border-white/10 p-4 shadow-md">
        <Button
          color="blue"
          className="rounded-lg"
          onClick={() => router.push("/vote")}
        >
          {t("vote")}
        </Button>
      </div>
    </div>
  );
}
