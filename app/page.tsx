import { getVoteResult } from "@/services/kv";
import VoteButton from "./components/vote-button";
import { VoteQuestion } from "./components/question";
// import Disclaimer from "./components/disclaimer";
import Introduction from "./components/introduction";
import Footer from "./components/footer";
export default async function IndexPage() {
  const voteResult = await getVoteResult();
  return (
    <>
      <div className="no-scrollbar relative flex-1 overflow-x-auto pt-8">
        <div className="container">
          {/* <Disclaimer /> */}
          <Introduction />
          {voteResult.count > 0 &&
            Array.from({ length: 6 }, (_, index) => (
              <VoteQuestion
                question={index + 1}
                votes={voteResult?.votes as { [key: number]: number }[]}
                key={index}
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
