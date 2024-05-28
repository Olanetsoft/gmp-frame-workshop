import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid } = await getFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "View transaction",
          action: "link",
          target: `https://axelarscan.io/gmp/${body?.untrustedData?.transactionId}`,
        },
        {
          label: "Read data on Optimism",
          action: "tx",
          target: "https://gmp-frame-workshop.vercel.app/api/read-message",
          postUrl:
            "https://gmp-frame-workshop.vercel.app/api/read-message-success",
        },

      ],
      image: {
        src: "https://gmp-frame-workshop.vercel.app/result-frame.png",
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
