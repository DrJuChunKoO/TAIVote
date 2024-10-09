import { kv } from "@vercel/kv";
const sectionLimits = [4, 8, 9];
const totalQuesions = sectionLimits.reduce((acc, x) => acc + x, 0);
interface TotalVotes {
  votes: { [key: number]: number }[];
  count: number;
}

// set voted user id
async function setVotedUserId(userId: string) {
  try {
    await kv.sadd("voted_users", userId);
  } catch (error) {
    console.error("Error setting voted user ID:", error);
  }
}

// check if user has voted
async function checkVotedUserId(userId: string) {
  try {
    const hasVoted = await kv.sismember("voted_users", userId);
    return hasVoted === 1;
  } catch (error) {
    console.error("Error checking if user has voted:", error);
    return false;
  }
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

    // Mark user as voted
    await setVotedUserId(userId);

    return true;
  } catch (error) {
    console.error("Error processing vote:", error);
    return false;
  }
}

// get vote result
async function getVoteResult() {
  try {
    return await kv.get<TotalVotes>(`total_votes`);
  } catch (error) {
    console.error("Error getting vote result:", error);
    return {
      votes: Array.from({ length: totalQuesions }, () => ({})),
      count: 0,
    };
  }
}

export { setVotedUserId, checkVotedUserId, vote, getVoteResult };
