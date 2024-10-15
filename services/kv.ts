import { kv } from "@vercel/kv";

const totalQuesions = 6;
interface TotalVotes {
  votes: { [key: number]: number }[];
  count: number;
}

// vote
async function vote(userId: string, query: number[]) {
  try {
    // Save user query
    await kv.lpush(`user_query:${userId}`, JSON.stringify(query));

    const totalVotes =
      (await kv.get<TotalVotes>(`total_votes`)) ||
      ({
        votes: Array.from({ length: totalQuesions }, () => ({})),
        count: 0,
      } as TotalVotes);
    totalVotes.count++;
    for (let i = 0; i < totalQuesions; i++) {
      if (!totalVotes.votes[i][query[i]]) totalVotes.votes[i][query[i]] = 0;
      totalVotes.votes[i][query[i]]++;
    }
    await kv.set(`total_votes`, totalVotes);

    return true;
  } catch (error) {
    console.error("Error processing vote:", error);
    return false;
  }
}

// get vote result
async function getVoteResult() {
  const emptyState = {
    votes: Array.from({ length: totalQuesions }, () => ({})),
    count: 0,
  };
  try {
    return (await kv.get<TotalVotes>(`total_votes`)) || emptyState;
  } catch (error) {
    console.error("Error getting vote result:", error);
    return emptyState;
  }
}

export { vote, getVoteResult };
