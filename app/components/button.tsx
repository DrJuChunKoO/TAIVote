import { motion, HTMLMotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  className,
  color,
  onClick,
  ...attr
}: {
  children: React.ReactNode;
  className?: string;
  color: string;
  onClick: () => void;
} & HTMLMotionProps<"button">) {
  return (
    <motion.button
      className={twMerge(
        "glass-effect hoverable group flex w-full items-center justify-center gap-2 rounded-xl p-2 font-semibold transition-colors md:p-3 md:text-xl",
        color === "blue" &&
          "bg-blue-600/80 text-blue-100 hover:bg-blue-600/60 active:bg-blue-600/40",
        color === "red" &&
          "bg-red-600/80 text-red-100 hover:bg-red-600/60 active:bg-red-600/40",
        color === "green" &&
          "bg-green-600/80 text-green-100 hover:bg-green-600/60 active:bg-green-600/40",
        color === "teal" &&
          "bg-teal-600/80 text-teal-100 hover:bg-teal-600/60 active:bg-teal-600/40",
        color === "stone" &&
          "bg-stone-600/80 text-stone-100 hover:bg-stone-600/60 active:bg-stone-600/40",
        className,
      )}
      onClick={onClick}
      whileTap={{
        scale: 0.95,
      }}
      {...attr}
    >
      {children}
    </motion.button>
  );
}
