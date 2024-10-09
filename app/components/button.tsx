import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  className,
  color,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      className={twMerge(
        "group flex w-full items-center justify-center gap-2 rounded-xl p-2 font-semibold transition-colors md:p-3 md:text-xl",
        color === "blue" &&
          "bg-blue-600 text-blue-100 hover:bg-blue-800 active:bg-blue-900",
        color === "red" &&
          "bg-red-600 text-red-100 hover:bg-red-800 active:bg-red-900",
        color === "green" &&
          "bg-green-600 text-green-100 hover:bg-green-800 active:bg-green-900",
        color === "teal" &&
          "bg-teal-600 text-teal-100 hover:bg-teal-800 active:bg-teal-900",
        color === "stone" &&
          "bg-stone-600 text-stone-100 hover:bg-stone-800 active:bg-stone-900",
        className,
      )}
      onClick={onClick}
      whileTap={{
        scale: 0.95,
      }}
    >
      {children}
    </motion.button>
  );
}
