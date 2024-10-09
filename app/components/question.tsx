"use client";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
function getQuestionIndex(section: number, question: number) {
  const sectionLimits = [4, 8, 9];
  if (section === 1) return question;
  if (section === 2) return question + sectionLimits[0];
  if (section === 3) return question + sectionLimits[0] + sectionLimits[1];
  return 0;
}
export function VoteQuestion({
  section,
  question,
  votes,
}: {
  section: number;
  question: number;
  votes: {
    [key: number]: number;
  }[];
}) {
  const t = useTranslations("questions");
  const questionTitle = t(`section${section}.question${question}`);
  const options = t.raw(`section${section}.options${question}`);
  const questionIndex = getQuestionIndex(section, question);
  const totalVotes = votes[questionIndex - 1]
    ? Object.values(votes[questionIndex - 1]).reduce((acc, x) => acc + x, 0)
    : 0;
  return (
    <Question>
      <QuestionTitle>{questionTitle}</QuestionTitle>
      {options.map((option: string, index: number) => (
        <Option
          text={option}
          key={index}
          percentage={
            ((votes[questionIndex - 1]?.[index + 1] || 0) / totalVotes) * 100
          }
          index={index}
        />
      ))}
    </Question>
  );
}

function Question({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 rounded-xl border border-white/10 p-4 shadow-md transition-all hover:shadow-lg">
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
}: {
  text: string;
  percentage: number;
  index?: number;
}) {
  const colors = [
    "bg-gradient-to-b from-red-500 to-red-600",
    "bg-gradient-to-b from-blue-500 to-blue-600",
    "bg-gradient-to-b from-green-500 to-green-600",
    "bg-gradient-to-b from-yellow-500 to-yellow-600",
    "bg-gradient-to-b from-purple-500 to-pink-500",
  ];

  return (
    <div>
      <div className="mb-2 flex items-end justify-between">
        <div className="font-medium text-gray-300">{text}</div>
        <div className="font-mono text-sm text-gray-400">
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
    </div>
  );
}
