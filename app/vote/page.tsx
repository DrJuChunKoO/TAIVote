"use client";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import VoteButton from "../components/vote-button";
import Button from "../components/button";
import {
  Vote,
  ArrowRight,
  ArrowLeft,
  CircleCheckBig,
  Bot,
  Send,
  Loader,
} from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
export default function Page() {
  const router = useRouter();
  const t = useTranslations("questions");
  const { data } = useSession();
  // 0: Main screen
  // 1: Questions
  // 2: Submit screen
  // 3: Done screen
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState(1);
  const [direction, setDirection] = useState(1);
  const [result, setResult] = useState(Array.from({ length: 6 }, () => 0));

  function nextQuestion() {
    setDirection(1);
    if (question === 6) {
      setStep(2);
    } else {
      setQuestion(question + 1);
    }
  }

  function prevQuestion() {
    setDirection(-1);
    if (question > 1) {
      setQuestion(question - 1);
    }
  }
  function setCurrentAnswer(answer: number) {
    setResult((res) => {
      res[question - 1] = answer;
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

  const handleVerify = async (proof: object) => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ result, proof }),
      });
      if (res.status === 200) {
        setStep(3);
      } else {
        const data = await res.json();
        if (data.error === "User is already voted") {
          alert("You have already voted.");
        } else {
          alert("Vote sending failed, please try again later");
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: Functionality after verifying
  const onSuccess = () => {
    console.log("Success");
  };
  return (
    <>
      <div className="container flex flex-1 flex-col gap-2 pb-2 pt-4">
        {(step === 1 || step === 2) && (
          <div className="flex items-center justify-between gap-2">
            <div
              className={twMerge(
                "transition-opacity",
                question <= 1 && "pointer-events-none opacity-0",
              )}
            >
              <Button
                color="stone"
                onClick={() => prevQuestion()}
                className="w-max rounded-lg bg-white/5 px-6 py-2 hover:bg-white/10 active:bg-white/20 md:px-6 md:py-2 md:text-base"
              >
                <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
                {t("back")}
              </Button>
            </div>
            <div>
              <div className="mb-1 text-right">{question} / 6</div>
              <div className="h-1 w-40 overflow-hidden rounded-full bg-gray-500">
                <div
                  className="glass-effect h-1 rounded-full bg-white/50 transition-all"
                  style={{
                    width: `${(question / 6) * 100}%`,
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
              className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-noise shadow-md"
              key={question}
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="flex h-full flex-1 flex-col gap-2 p-6">
                <div className="text-2xl font-semibold leading-[1.5em]">
                  {t(`questions.question${question}.question`)}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 flex justify-end p-6 text-white opacity-20">
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
                <Send size={72} />
                <div className="text-3xl font-bold">{t("submitTitle")}</div>
                <div className="text-lg leading-[1.5em] opacity-75">
                  {t("submitDescription")}
                </div>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              className="h-full rounded-xl border border-white/10 bg-noise p-6 shadow-md"
              key="step-3"
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="flex h-full flex-col justify-center gap-2">
                <CircleCheckBig size={72} />
                <div className="text-3xl font-bold">{t("doneTitle")}</div>
                <div className="text-lg leading-[1.5em] opacity-75">
                  {t("doneDescription")}
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
                .raw(`questions.question${question}.options`)
                .map((option: string, index: number) => {
                  let color = "blue";
                  if (
                    ["否", "いいえ", "No"].some((x) =>
                      option.match(new RegExp(x, "i")),
                    )
                  ) {
                    color = "red";
                  }

                  return (
                    <Button
                      color={color}
                      onClick={() => setCurrentAnswer(index + 1)}
                      className={twMerge(
                        result[question - 1] === index + 1 &&
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
            {step === 2 &&
              (isLoading ? (
                <Button color="teal" onClick={() => {}}>
                  <Loader className="animate-spin" />
                </Button>
              ) : (
                <IDKitWidget
                  app_id={
                    process.env.NEXT_PUBLIC_WLD_CLIENT_ID as `app_${string}`
                  } // obtained from the Developer Portal
                  action="taivote" // this is your action id from the Developer Portal
                  onSuccess={onSuccess} // callback when the modal is closed
                  handleVerify={handleVerify} // optional callback when the proof is received
                  verification_level={VerificationLevel.Orb}
                >
                  {({ open }) => (
                    <Button color="blue" onClick={open}>
                      {t("submit")}
                      <ArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Button>
                  )}
                </IDKitWidget>
              ))}
            {step === 3 && (
              <Button color="blue" onClick={() => router.push("/")}>
                {t("view_result")}
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
