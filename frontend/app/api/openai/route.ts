import axios from "axios";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for text content
const textContentSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
});

// Define the schema for image content
const imageContentSchema = z.object({
  type: z.literal("image_url"),
  image_url: z.object({
    url: z.string().url(),
  }),
});

// Create a union of text and image content schemas
const contentSchema = z.union([textContentSchema, imageContentSchema]);

// Define the schema for a message
const messageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.array(contentSchema),
});

// Define the schema for the chat request
const chatRequestSchema = z.object({
  messages: z.array(messageSchema),
});

const OPENAI_CHAT_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_IMAGE_URL = "https://api.openai.com/v1/images/generations";

export async function POST(request: Request) {
  const requestBody = await request.json();
  const parsedRequest = chatRequestSchema.safeParse(requestBody);

  if (!parsedRequest.success) {
    console.log("Invalid schema", parsedRequest.error);
    return NextResponse.json({ error: "Invalid schema", success: false });
  }

  // Extract the last message content to check if it asks for image generation
  const lastMessage = parsedRequest.data.messages.slice(-1)[0];

  // Type check the content before accessing the text property
  const lastMessageText = lastMessage.content
    .find((content) => content.type === "text") && 
    (lastMessage.content.find((content) => content.type === "text") as { type: "text"; text: string }).text || "";

  if (
    lastMessageText &&
    (lastMessageText.toLowerCase().includes("create an image") ||
      lastMessageText.toLowerCase().includes("create image") ||
      lastMessageText.toLowerCase().includes("draw an image") ||
      lastMessageText.toLowerCase().includes("draw image") ||
      lastMessageText.toLowerCase().includes("give me an image") ||
      lastMessageText.toLowerCase().includes("give me image"))
  ) {
    // Image generation requested
    const prompt = lastMessageText
      .replace(/create (an|a)? image of/i, "")
      .replace(/draw (an|a)? image of/i, "")
      .replace(/give me (an|a)? image of/i, "")
      .replace(/create image/i, "") // Handle the 'create image' case
      .trim(); // Extract the image description

    try {
      // Call DALL-E API to generate the image
      const imageResponse = await axios.post(
        OPENAI_IMAGE_URL,
        {
          prompt: prompt,
          n: 1, // Number of images
          size: "512x512", // Image size
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          }
        }
      );

      const imageUrl = imageResponse.data.data[0].url;

      // Respond with the generated image URL
      return NextResponse.json({
        success: true,
        message: {
          role: "assistant",
          content: [{ type: "image_url", image_url: { url: imageUrl } }],
        },
      });
    } catch (error) {
      console.error("Image generation error:", error);
      return NextResponse.json({ success: false, message: "Image generation failed" }, { status: 500 });
    }
  }

  // Otherwise, handle regular chat completions
  const clonedMessages = parsedRequest.data.messages.map((message) => ({
    ...message,
    content: message.content.map((content) => {
      if (content.type === "image_url") {
        return {
          type: content.type,
          image_url: {
            url: content.image_url.url,
          },
        };
      }
      return content;
    }),
  }));

  const payload = {
    model: "gpt-4-turbo", // Or gpt-3.5-turbo if you're using that model
    messages: clonedMessages,
    max_tokens: 300,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  try {
    const response = await axios.post(OPENAI_CHAT_URL, payload, { headers });
    const firstMessage = response.data.choices[0].message;
    return NextResponse.json({ success: true, message: firstMessage });
  } catch (error) {
    console.error("Chat completion error:", error);
    return NextResponse.json({ success: false, message: "Text generation failed" }, { status: 500 });
  }
}
