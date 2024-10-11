import { getVoteResult } from "@/services/kv";
import VoteButton from "./components/vote-button";
import { VoteQuestion } from "./components/question";
import Disclaimer from "./components/disclaimer";
export default async function IndexPage() {
  const voteResult = await getVoteResult();
  return (
    <>
      <div className="relative flex-1 overflow-x-auto pt-8">
        <div className="container">
          <Disclaimer />
          {voteResult.count > 0 &&
            [4, 8, 9].map((section, index) => (
              <div key={index}>
                {Array.from({ length: section }, (_, question) => (
                  <VoteQuestion
                    section={index + 1}
                    question={question + 1}
                    votes={voteResult?.votes as { [key: number]: number }[]}
                    key={`${question}`}
                  />
                ))}
              </div>
            ))}
        </div>
        <div className="gradient-blur translate-y-3">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <VoteButton />
    </>
  );
}
