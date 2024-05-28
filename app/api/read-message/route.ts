import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";
import {
  encodeFunctionData,
  parseEther,
  Abi,
  createPublicClient,
  getContract,
  http,
} from "viem";
import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
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

    const storageRegistry = getContract({
      address: OPTIMISM_CONTRACT_ADDRESS,
      abi: SendMessageABI,
      client: publicClient,
    });

    const unitPrice = await storageRegistry.read.value();

    console.log("unitPrice: ", unitPrice);

    // const data = encodeFunctionData({
    //   abi: SendMessageABI,
    //   functionName: "value",
    //   // args: ["optimism", OPTIMISM_CONTRACT_ADDRESS, body.untrustedData.inputText],
    // });

    // const txData: FrameTransactionResponse = {
    //   chainId: `eip155:${optimism.id}`,
    //   method: "eth_sendTransaction",
    //   params: {
    //     abi: [],
    //     data,
    //     to: OPTIMISM_CONTRACT_ADDRESS,
    //     value: "",
    //   },
    // };
    return NextResponse.json(unitPrice);
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
