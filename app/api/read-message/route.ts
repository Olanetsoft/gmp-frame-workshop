import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";
import { createPublicClient, getContract, http } from "viem";
import { NextRequest, NextResponse } from "next/server";
import SendMessageABI from "../../_contracts/SendMessageABI";
import { optimism } from "viem/chains";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";

const OPTIMISM_RPC_URL = "https://optimism-rpc.publicnode.com";
const OPTIMISM_CONTRACT_ADDRESS = "0x010e4B8eb87991cD9De316dD614023D1a368b28d";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  try {
    const publicClient = createPublicClient({
      chain: optimism,
      transport: http(),
    });

    const optimismContract = getContract({
      address: OPTIMISM_CONTRACT_ADDRESS,
      abi: SendMessageABI,
      client: publicClient,
    });

    const value = await optimismContract.read.value();

    console.log("Value: ", value);

    const txData: FrameTransactionResponse = {
      chainId: `eip155:${optimism.id}`,
      method: "eth_sendTransaction",
      params: {
        abi: [],
        data: undefined,
        to: "0x",
        value: "",
      },
    };
    return NextResponse.json(txData);
  } catch (error) {
    return new NextResponse(`Error reading contract: ${error}`, {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
