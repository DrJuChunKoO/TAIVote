import { getVoteResult } from "@/services/kv";
import VoteButton from "./components/vote-button";
import { VoteQuestion } from "./components/question";
// import Disclaimer from "./components/disclaimer";
import Introduction from "./components/introduction";
import Footer from "./components/footer";
export default async function IndexPage() {
  const voteResult = await getVoteResult();
  
  // Question order mapping: new display order -> original question ID
  // 新順序第1題=原問題2, 第2題=原問題3, 第3題=原問題5, 第4題=原問題6, 第5題=原問題1, 第6題=原問題4
  const questionOrder = [2, 3, 5, 6, 1, 4];
  
  return (
    <>
      <div className="no-scrollbar relative flex-1 overflow-x-auto pt-8">
        <div className="container">
          {/* <Disclaimer /> */}
          <Introduction />
          {voteResult.count > 0 &&
            questionOrder.map((originalQuestionId, displayIndex) => (
              <VoteQuestion
                question={originalQuestionId}
                votes={voteResult?.votes as { [key: number]: number }[]}
                key={displayIndex}
              />
            ))}
        </div>
        <Footer />
        <div className="gradient-blur -my-4 translate-y-3">
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
