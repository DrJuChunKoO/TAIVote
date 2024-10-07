import { twMerge } from "tailwind-merge";

export default async function IndexPage() {
  return (
    <div className="container">
      <Question>
        <QuestionTitle>咖哩要拌嗎</QuestionTitle>
        <Option text="拌" percentage={10} />
        <Option text="不拌" percentage={90} />
      </Question>
      <Question>
        <QuestionTitle>咖哩要拌嗎</QuestionTitle>
        <Option text="拌" percentage={10} />
        <Option text="不拌" percentage={90} />
      </Question>
      <Question>
        <QuestionTitle>咖哩要拌嗎</QuestionTitle>
        <Option text="拌" percentage={10} />
        <Option text="不拌" percentage={90} />
      </Question>
      <Question>
        <QuestionTitle>咖哩要拌嗎</QuestionTitle>
        <Option text="拌" percentage={10} />
        <Option text="不拌" percentage={90} />
      </Question>
    </div>
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
        <div className="font-mono text-sm text-gray-400">{percentage}%</div>
      </div>
      <div className="bg-noise h-4 w-full rounded-full bg-gray-600 shadow-inner">
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
