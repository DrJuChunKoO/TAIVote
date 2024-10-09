import { getServerSession } from "next-auth";
import { config } from "@/auth";
import { vote, checkVotedUserId } from "@/services/kv";
export async function POST(request: Request) {
  const sectionLimits = [4, 8, 9];
  const totalQuesions = sectionLimits.reduce((acc, x) => acc + x, 0);

  const query = await request.json();
  const session = await getServerSession(config);
  if (session && session.user) {
    const userId = session.user.name!;
    const voteQuery = [...query[0], ...query[1], ...query[2]];
    if (voteQuery.length !== totalQuesions) {
      throw new Error("Invalid query length");
    }
    console.log(`[Vote] ${userId}: ${voteQuery}`);

    const hasVoted = await checkVotedUserId(userId);
    if (hasVoted) {
      return new Response(
        JSON.stringify({ success: false, error: "User is already voted" }),
        {
          status: 400,
        },
      );
    }

    const voteResult = await vote(userId, voteQuery);
    if (voteResult) {
      return new Response(JSON.stringify({ success: true, error: null }));
    } else {
      return new Response(
        JSON.stringify({ success: false, error: "Failed to vote" }),
        {
          status: 400,
        },
      );
    }
  } else {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
}
