import { google } from "@ai-sdk/google"
import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()
  console.log(messages)
  const result = streamText({
    model: google("gemini-1.5-flash"),
    messages,
  })

  return result.toDataStreamResponse()
}
