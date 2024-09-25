import OpenAI from 'openai';

export const runtime = 'edge';  // This ensures the route is edge optimized

// Set up OpenAI API with your OpenAI API Key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Use OpenAI API Key
  baseURL: 'https://api.openai.com/v1',  // OpenAI API base URL
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    // Create a chat completion using OpenAI's GPT-3.5 or GPT-4 model
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Use OpenAI's GPT-3.5-turbo model
      messages,
      max_tokens: 1024,  // Adjust as needed
    });

    // Return the entire response as JSON (non-streaming)
    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
