import { getServerSession } from "next-auth";
import { config } from "@/auth";
import { vote } from "@/services/kv";
export async function POST(request: Request) {
  const sectionLimits = [4, 8, 9];
  const totalQuesions = sectionLimits.reduce((acc, x) => acc + x, 0);

  const query = await request.json();
  const session = await getServerSession(config);
  if (session && session.user) {
    const voteQuery = [...query[0], ...query[1], ...query[2]];
    if (voteQuery.length !== totalQuesions) {
      throw new Error("Invalid query length");
    }
    console.log(`[Vote] ${session.user.name!}: ${voteQuery}`);
    const voteResult = await vote(session.user.name!, voteQuery);
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