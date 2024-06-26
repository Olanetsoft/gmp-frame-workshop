import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  return new NextResponse(
    getFrameHtmlResponse({
      input: {
        text: "Type your message here",
      },
      buttons: [
        {
          action: "tx",
          label: "Send Message",
          target: "https://gmp-frame-workshop.vercel.app/api/send-message",
          postUrl:
            "https://gmp-frame-workshop.vercel.app/api/send-message-success",
        },
        {
          label: "Read data on Optimism",
          action: "post",
          target: "https://gmp-frame-workshop.vercel.app/api/read-message",
        },
      ],
      image: "https://gmp-frame-workshop.vercel.app/send-frame.png",
      postUrl: "https://gmp-frame-workshop.vercel.app/api/send-message",
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

// import { NextRequest, NextResponse } from "next/server";

// async function getResponse(req: NextRequest): Promise<NextResponse> {
//   return new NextResponse(`
//             <!DOCTYPE html>
//             <html>
//             <head>
//                 <title>Send Message</title>
//                 <meta property="fc:frame" content="vNext"/>
//                 <meta property="fc:frame:image" content="https://gmp-frame-workshop.vercel.app/send-frame.png" />
//                 <meta property="fc:frame:input" content="Type your message here" />
//                 <meta property="fc:frame:button:1" content="Send Message" />
//                 <meta property="fc:frame:button:1:action" content="tx"/>
//                 <meta property="fc:frame:button:1:target" content="https://gmp-frame-workshop.vercel.app/api/send-message"/>
//                 <meta property="fc:frame:button:2" content="Go Back"/>
//                  <meta property="fc:frame:button:2:action" content="post_redirect"/>
//                 <meta property="fc:frame:button:2:target" content="https://gmp-frame-workshop.vercel.app"/>
//                 <meta property="fc:frame:post_url" content="http://localhost:300/api/send-message"/>
//             </head>
//             </html>
//         `);
// }

// export async function POST(req: NextRequest): Promise<NextResponse> {
//   return getResponse(req);
// }

// export const dynamic = "force-dynamic";
