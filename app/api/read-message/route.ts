import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import SendMessageABI from "../../_contracts/SendMessageABI";

const OPTIMISM_RPC_URL = "https://optimism-rpc.publicnode.com";
const OPTIMISM_CONTRACT_ADDRESS = "0x010e4B8eb87991cD9De316dD614023D1a368b28d";

const provider = new ethers.JsonRpcProvider(OPTIMISM_RPC_URL);
const contract = new ethers.Contract(
  OPTIMISM_CONTRACT_ADDRESS,
  SendMessageABI,
  provider
);

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const result = await contract.value();

  return NextResponse.json(result);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
