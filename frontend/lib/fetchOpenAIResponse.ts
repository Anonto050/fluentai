type Message = {
  role: string;
  content: string;
}

type Error = {
  message: string;
  status: number;
}

type Props = {
  messages: Message[];
  setMessage: (msg: string) => void;
  setError: (error: Error) => void;
}

export async function fetchOpenAIResponse({ messages, setMessage, setError }: Props) {
  try {
    const response = await fetch(`/api/chat/pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (response.status === 401) {
      setError({ message: 'Please log in to continue.', status: 401 });
      return '';
    }

    const data = await response.json();  // Parse the response body as JSON

    if (data.choices && data.choices[0].message && data.choices[0].message.content) {
      const aiMessageContent = data.choices[0].message.content;
      setMessage(aiMessageContent);  // Send the content back to the frontend for display
    } else {
      throw new Error('No valid response from AI');
    }

  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    setError({
      message: 'An error occurred while processing your request. Please try again.',
      status: 500,
    });
    return '';
  }
}
