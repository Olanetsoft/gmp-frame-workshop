import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { createPublicClient, getContract, http } from "viem";
import { NextRequest, NextResponse } from "next/server";
import SendMessageABI from "../../_contracts/SendMessageABI";
import { optimism } from "viem/chains";
import { config } from "../../config/config";

const OPTIMISM_CONTRACT_ADDRESS = "0x010e4B8eb87991cD9De316dD614023D1a368b28d";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
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

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Message from Optimism: ${value}`,
        },
      ],
      image: `${config.baseURL}/read-frame.png`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
