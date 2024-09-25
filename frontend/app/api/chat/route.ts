import { Message } from "@/types/chat";

export const runtime = "edge";

export async function POST(req: Request) {
  const { apiKey, messages, language, scenario } = await req.json();

  // Map scenarios to specific roles and contexts
  const scenarioPrompts: { [key: string]: string } = {
    "travel-agent": `You are a travel agent. The user is planning a trip and needs assistance. Respond in ${language}, and help the user with travel arrangements.`,
    "restaurant": `You are a waiter at a restaurant. The user is ordering food. Respond in ${language}, and assist the user with their meal order.`,
    "doctor": `You are a doctor. The user is discussing their health concerns. Respond in ${language}, and provide medical advice or ask relevant questions.`,
    "teacher": `You are a teacher. The user is discussing academic topics. Respond in ${language}, and engage in a discussion about the subject matter.`,
    "hotel-booking": `You are a hotel receptionist. The user is trying to book a room. Respond in ${language}, and assist the user with the booking process.`,
  };

  // Select the prompt based on the scenario
  const systemPrompt = scenarioPrompts[scenario] || `You are a person who speaks ${language}. Engage in a normal conversation.`;

  // Prepend the system prompt as the first message in the conversation
  const formattedMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map((message: Message) => {
      if (message.role === "user") {
        return {
          ...message,
          content: `The user says: "${message.content}".`,
        };
      }
      return message;
    }),
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey || process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      max_tokens: 150,
      temperature: 0.7,
      n: 1,
      messages: formattedMessages,
    }),
  });

  const data = await res.json();

  if (data.error && data.error.code === "invalid_api_key") {
    return Response.json("Something went wrong. Kindly check for error alerts.", {
      status: 401,
    });
  }

  const output = data.choices[0]?.message?.content?.trim();

  return Response.json(output);
}
