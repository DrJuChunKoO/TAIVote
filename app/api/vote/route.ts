import { getServerSession } from "next-auth";
import { config } from "@/auth";
import { vote, checkVotedUserId } from "@/services/kv";
import { type IVerifyResponse, type ISuccessResult } from "@worldcoin/idkit";

export async function POST(request: Request) {
  const sectionLimits = [4, 8, 9];
  const totalQuesions = sectionLimits.reduce((acc, x) => acc + x, 0);

  const { result, proof } = await request.json();

  const session = await getServerSession(config);
  if (session && session.user) {
    const userId = session.user.name!;
    const voteQuery = [...result[0], ...result[1], ...result[2]];
    if (voteQuery.length !== totalQuesions) {
      throw new Error("Invalid query length");
    }
    // check zk proof
    const app_id = process.env.NEXT_PUBLIC_WLD_CLIENT_ID as `app_${string}`;
    const action = "vote";

    const verifyRes = await verifyCloudProof(proof, app_id, action);
    // check db id
    const hasVoted = await checkVotedUserId(userId);

    // send voted error
    if (hasVoted || !verifyRes.success) {
      return new Response(
        JSON.stringify({ success: false, error: "User is already voted" }),
        {
          status: 400,
        },
      );
    }

    console.log(`[Vote] ${userId}: ${voteQuery}`);

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

async function verifyCloudProof(
  proof: ISuccessResult,
  app_id: `app_${string}`,
  action: string,
): Promise<IVerifyResponse> {
  const response = await fetch(
    `https://developer.worldcoin.org/api/v2/verify/${app_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...proof,
        action,
      }),
    },
  );

  if (response.ok) {
    return { success: true };
  } else {
    return { success: false, ...(await response.json()) } as IVerifyResponse;
  }
}
