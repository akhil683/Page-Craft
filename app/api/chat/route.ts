import {
  type Message,
  createDataStreamResponse,
  smoothStream,
  streamText,
} from 'ai';

import { auth } from '@/auth';
import { google } from '@ai-sdk/google';

export const maxDuration = 60;

export async function POST(request: Request) {
  const { messages }: { id: string; messages: Array<Message>; selectedChatModel: string } =
    await request.json();

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: google("gemini-1.5-flash"),
        messages,
        maxSteps: 5,
        experimental_transform: smoothStream({ chunking: 'word' }),
        experimental_telemetry: {
          isEnabled: true,
          functionId: 'stream-text',
        },
      });

      result.consumeStream();

      result.mergeIntoDataStream(dataStream, {
        sendReasoning: true,
      });
    },
    onError: () => {
      return 'Oops, an error occured!';
    },
  });
}

// import { google } from "@ai-sdk/google"
// import { streamText } from "ai"
//
// export async function POST(request: Request) {
//   const { messages } = await request.json()
//   console.log(messages)
//   const result = streamText({
//     model: google("gemini-1.5-flash"),
//     messages,
//   })
//
//   return result.toDataStreamResponse()
// }
//
//
//
// import { google } from "@ai-sdk/google";
// import { streamText } from "ai";
//
// export async function POST(request: Request) {
//   const { messages } = await request.json();
//   console.log(messages);
//
//   // Modify the last message to request Markdown output.
//   const modifiedMessages = messages.map((message: any, index: any, array: any) => {
//     if (index === array.length - 1) {
//       return {
//         ...message,
//         content: message.content + "\n\n(I require all your responses to be formatted exclusively in Markdown. Do not include any additional text, explanations, or code outside of the Markdown syntax. I will use your responses directly to render content in my application. Please ensure your responses are well-formatted Markdown that is ready to be displayed.)",
//       };
//     }
//     return message;
//   });
//   console.log("modifiedMessages", modifiedMessages)
//   const result = streamText({
//     model: google("gemini-1.5-flash"),
//     messages: modifiedMessages,
//   });
//
//   return result.toDataStreamResponse();
// }
