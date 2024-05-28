import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { base } from "viem/chains";
import SendMessageABI from "../../_contracts/SendMessageABI";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";

// const FANTOM_CONTRACT_ADDRESS = "0xBD8B9fA2BC1Fd65c8bb51132de5026F6E2a29C2E";
// const CELO_CONTRACT_ADDRESS = "0x4E703bd524eaA03F3685026a2428e3fDF258Da37";
const BASE_CONTRACT_ADDRESS = "0x5768bE56b4a3Bb3e62C464008e280226eb758fCF";
const OPTIMISM_CONTRACT_ADDRESS = "0x010e4B8eb87991cD9De316dD614023D1a368b28d";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body: FrameRequest = await req.json();

  const { isValid } = await getFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const data = encodeFunctionData({
    abi: SendMessageABI,
    functionName: "setRemoteValue",
    args: ["optimism", OPTIMISM_CONTRACT_ADDRESS, body.untrustedData.inputText],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${base.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: [],
      data,
      to: BASE_CONTRACT_ADDRESS,
      value: parseEther("0.00004").toString(), // 0.00004 ETH
    },
  };
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
