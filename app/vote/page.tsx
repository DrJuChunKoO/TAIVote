"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import VoteButton from "../components/vote-button";
import Button from "../components/button";
import { Vote, ArrowRight, ArrowLeft, CircleCheckBig, Bot } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
export default function Page() {
  const t = useTranslations("questions");
  const { data } = useSession();
  // 0: Main screen
  // 1: Questions
  // 2: Submit screen
  const [step, setStep] = useState(0);
  const [section, setSection] = useState(1);
  const [question, setQuestion] = useState(1);
  const [direction, setDirection] = useState(1);
  const [result, setResult] = useState([
    Array.from({ length: 4 }, () => 0),
    Array.from({ length: 8 }, () => 0),
    Array.from({ length: 9 }, () => 0),
  ]);
  const sectionLimits = [4, 8, 9];
  const progress = (() => {
    switch (section) {
      case 1:
        return question;
      case 2:
        return question + 4;
      case 3:
        return question + 12;
      default:
        return 0;
    }
  })();
  const totalQuesions = sectionLimits.reduce((acc, x) => acc + x, 0);

  function nextQuestion() {
    setDirection(1);
    const currentLimit = sectionLimits[section - 1];

    if (question === currentLimit) {
      if (section < 3) {
        setSection(section + 1);
        setQuestion(1);
      } else {
        setStep(2);
      }
    } else {
      setQuestion(question + 1);
    }
  }

  function prevQuestion() {
    setDirection(-1);
    if (step === 2) {
      return setStep(1);
    }
    if (question === 1) {
      if (section > 1) {
        setSection(section - 1);
        setQuestion(sectionLimits[section - 2]);
      }
    } else {
      setQuestion(question - 1);
    }
  }
  function setCurrentAnswer(answer: number) {
    setResult((res) => {
      res[section - 1][question - 1] = answer;
      return res;
    });
    nextQuestion();
  }
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.9,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        scale: 0.9,
      };
    },
  };
  return (
    <>
      <div className="container flex flex-1 flex-col gap-2 pb-2 pt-4">
        {(step === 1 || step === 2) && (
          <div className="flex items-center justify-between gap-2">
            <div>
              {progress > 1 && (
                <Button
                  color="stone"
                  onClick={() => prevQuestion()}
                  className="w-max px-6 py-2 md:px-6 md:py-2 md:text-base"
                >
                  <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
                  {t("back")}
                </Button>
              )}
            </div>
            <div>
              <div className="text-right text-lg font-semibold">
                {progress} / {totalQuesions}
              </div>
              <div className="h-1 w-40 overflow-hidden rounded-full bg-gray-500">
                <div
                  className="h-1 rounded-full bg-white transition-all"
                  style={{
                    width: `${(progress / totalQuesions) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          {step === 0 && (
            <motion.div
              className="h-full rounded-xl border border-white/10 bg-noise p-6 shadow-md"
              key="step-0"
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="flex h-full flex-col justify-center gap-2">
                <Vote size={72} />
                <div className="text-3xl font-bold">{t("title")}</div>
                <div className="text-lg leading-[1.5em] opacity-75">
                  {t("description")}
                </div>
              </div>
            </motion.div>
          )}
          {step === 1 && (
            <motion.div
              className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-noise shadow-md"
              key={`${section}-${question}`}
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="bg-black/10 px-6 py-3 text-opacity-75">
                {t(`section${section}.title`)}
              </div>
              <div className="flex h-full flex-1 flex-col gap-2 p-6">
                <div className="text-2xl font-semibold leading-[1.5em]">
                  {t(`section${section}.question${question}`)}
                </div>
              </div>
              <div className="flex justify-end p-6 text-white opacity-20">
                <Bot size={72} />
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              className="h-full rounded-xl border border-white/10 bg-noise p-6 shadow-md"
              key="step-2"
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="flex h-full flex-col justify-center gap-2">
                <CircleCheckBig size={72} />
                <div className="text-3xl font-bold">{t("submitTitle")}</div>
                <div className="text-lg leading-[1.5em] opacity-75">
                  {t("submitDescription")}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {!data && <VoteButton />}
      {data && (
        <div className="container pb-4">
          <div className="flex flex-col gap-2">
            {step === 0 && (
              <Button color="blue" onClick={() => setStep(1)}>
                {t("continue")}
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            )}
            {step === 1 &&
              t
                .raw(`section${section}.options${question}`)
                .map((option: string, index: number) => {
                  let color = "blue";
                  if (
                    ["反對", "否", "いいえ", "反対", "Oppose", "No"].includes(
                      option,
                    )
                  ) {
                    color = "red";
                  }
                  if (["沒意見", "意見なし", "No Opinion"].includes(option)) {
                    color = "teal";
                  }

                  return (
                    <Button
                      color={color}
                      onClick={() => setCurrentAnswer(index + 1)}
                      className={twMerge(
                        result[section - 1][question - 1] === index + 1 &&
                          "outline-none ring-2 ring-blue-400 ring-offset-2 ring-offset-[#282C33]",
                        color === `red` && "ring-red-400",
                        color === `teal` && "ring-teal-400",
                      )}
                      key={index}
                    >
                      {option}
                    </Button>
                  );
                })}
            {step === 2 && (
              <Button color="blue" onClick={() => setStep(1)}>
                {t("submit")}
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
