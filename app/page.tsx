import { twMerge } from "tailwind-merge";

export default async function IndexPage() {
  return (
    <div className="container">
      <div>
        <Question
          question="咖哩要拌嗎"
          options={[
            {
              text: "拌",
              value: 1,
              percentage: 10,
            },
            {
              text: "不拌",
              value: 0,
              percentage: 90,
            },
          ]}
        />
        <Question
          question="咖哩要拌嗎"
          options={[
            {
              text: "拌 - 1,990 票",
              value: 1,
              percentage: 10,
            },
            {
              text: "不拌",
              value: 0,
              percentage: 90,
            },
          ]}
        />
        <Question
          question="咖哩要拌嗎"
          options={[
            {
              text: "拌 - 1,990 票",
              value: 1,
              percentage: 10,
            },
            {
              text: "不拌",
              value: 0,
              percentage: 90,
            },
          ]}
        />
        <Question
          question="咖哩要拌嗎"
          options={[
            {
              text: "拌 - 1,990 票",
              value: 1,
              percentage: 10,
            },
            {
              text: "不拌",
              value: 0,
              percentage: 90,
            },
          ]}
        />
        <Question
          question="咖哩要拌嗎"
          options={[
            {
              text: "拌 - 1,990 票",
              value: 1,
              percentage: 10,
            },
            {
              text: "不拌",
              value: 0,
              percentage: 90,
            },
          ]}
        />
        <Question
          question="咖哩要拌嗎"
          options={[
            {
              text: "拌 - 1,990 票",
              value: 1,
              percentage: 10,
            },
            {
              text: "不拌",
              value: 0,
              percentage: 90,
            },
          ]}
        />
      </div>
    </div>
  );
}
function Question({
  question,
  options,
}: {
  question: string;
  options: {
    text: string;
    value: number;
    percentage: number;
  }[];
}) {
  const colors = [
    "from-red-500 to-red-600",
    "from-blue-500 to-blue-600",
    "from-green-500 to-green-600",
    "from-yellow-500 to-yellow-600",
    "from-purple-500 to-pink-500",
  ];

  return (
    <div className="mb-4 rounded-xl border border-white/10 p-4 shadow-md transition-all hover:shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-gray-200">{question}</h2>
      <div className="flex flex-col gap-4">
        {options.map((option, index) => (
          <div key={index}>
            <div className="mb-2 flex items-end justify-between">
              <div className="font-medium text-gray-300"> {option.text} </div>
              <div className="font-mono text-sm text-gray-400">
                {option.percentage}%
              </div>
            </div>
            <div className="bg-noise h-4 w-full rounded-full bg-gray-600 shadow-inner">
              <div
                className={twMerge(
                  `h-4 rounded-full bg-gradient-to-b mix-blend-overlay transition-all duration-500 ease-in-out`,
                  colors[index % colors.length],
                )}
                style={{ width: `${option.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
