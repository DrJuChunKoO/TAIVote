import { vote } from "@/services/kv";
import {
  type IVerifyResponse,
  type ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";

export async function POST(request: Request) {
  const {
    result,
    proof,
  }: {
    result: number[];
    proof: ISuccessResult;
  } = await request.json();

  const voteQuery = result;
  if (voteQuery.length !== 6) {
    throw new Error("Invalid query length");
  }

  if (proof.verification_level !== VerificationLevel.Orb) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "User needs to verify by Orb",
      }),
      {
        status: 400,
      },
    );
  }

  // check zk proof
  const app_id = process.env.NEXT_PUBLIC_WLD_CLIENT_ID as `app_${string}`;
  const action = "taivote";
  const verifyRes = await verifyCloudProof(proof, app_id, action);

  // send voted error
  if (!verifyRes.success) {
    return new Response(
      JSON.stringify({ success: false, error: "User is already voted" }),
      {
        status: 400,
      },
    );
  }

  const userId = crypto.randomUUID();
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
