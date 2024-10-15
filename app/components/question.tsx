"use client";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
export function VoteQuestion({
  question,
  votes,
}: {
  question: number;
  votes: {
    [key: number]: number;
  }[];
}) {
  const t = useTranslations("questions");
  const questionTitle = t(`questions.question${question}.question`);
  const options = t.raw(`questions.question${question}.options`);
  const totalVotes = votes[question - 1]
    ? Object.values(votes[question - 1]).reduce((acc, x) => acc + x, 0)
    : 0;

  return (
    <Question>
      <QuestionTitle>{questionTitle}</QuestionTitle>
      {options.map((option: string, index: number) => (
        <Option
          text={option}
          key={index}
          percentage={
            ((votes[question - 1]?.[index + 1] || 0) / totalVotes) * 100
          }
          votes={votes[question - 1]?.[index + 1] || 0}
          index={index}
        />
      ))}
    </Question>
  );
}

function Question({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 rounded-xl border border-white/10 p-4 shadow-md">
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function QuestionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-gray-200">{children}</h2>;
}
function Option({
  text,
  percentage,
  index = 0,
  votes = 0,
}: {
  text: string;
  percentage: number;
  index?: number;
  votes?: number;
}) {
  const t = useTranslations("common");
  const colors = [
    "bg-gradient-to-b from-blue-500 to-blue-600",
    "bg-gradient-to-b from-red-500 to-red-600",
    "bg-gradient-to-b from-green-500 to-green-600",
    "bg-gradient-to-b from-yellow-500 to-yellow-600",
    "bg-gradient-to-b from-purple-500 to-pink-500",
  ];

  return (
    <div>
      <div className="mb-2 flex items-end justify-between">
        <div className="font-medium text-gray-300">{text}</div>
        <div className="w-10 text-right font-mono text-gray-400">
          {percentage.toFixed(0)}%
        </div>
      </div>
      <div className="h-4 w-full rounded-full bg-gray-600 bg-noise shadow-inner">
        <div
          className={twMerge(
            `h-4 rounded-full mix-blend-overlay transition-all duration-500 ease-in-out`,
            colors[index % colors.length],
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 text-sm font-medium text-gray-400">
        {votes} {t("votes")}
      </div>
    </div>
  );
}
