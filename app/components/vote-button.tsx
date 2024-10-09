"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";
import { X, Vote } from "lucide-react";
import { signIn } from "next-auth/react";
import Button from "../components/button";
export default function VoteButton() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("common");
  return (
    <div className="container">
      <motion.div
        className={twMerge(
          "rounded-t-xl border border-b-0 border-white/10 p-4 shadow-md",
        )}
      >
        <Button
          color="blue"
          className="rounded-lg"
          onClick={() => setOpen(true)}
        >
          {t("vote")}
        </Button>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            className={twMerge(
              "fixed inset-0 bottom-0 z-10 flex h-[100svh] items-end bg-noise pt-4 backdrop-blur-sm",
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container h-max">
              <motion.div
                className={twMerge(
                  "h-max rounded-t-xl border border-b-0 border-white/10 bg-[#282C33] p-4 shadow-md",
                )}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center justify-end">
                  <button
                    className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white/5 active:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    <X />
                  </button>
                </div>
                <div className="mb-10 flex flex-col items-center justify-center">
                  <Vote size={48} />
                  <div className="mb-1 text-center text-2xl font-bold text-white/80">
                    TAIVote
                  </div>
                  <div className="text-center text-lg text-white/50">
                    Taiwan AI-policy Vote
                  </div>
                </div>

                <Button
                  color="blue"
                  className="rounded-lg"
                  onClick={() => signIn("worldcoin", { callbackUrl: "/vote" })}
                >
                  {t("sign_in_with_worldid")}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
