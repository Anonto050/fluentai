'use client';

import { useState, useRef, useEffect } from 'react';
import { fetchOpenAIResponse } from '@/lib/fetchOpenAIResponse';
import Image from 'next/image';
import MarkdownRenderer from './MarkdownRenderer';
import { useUser, useClerk } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";

// Supported languages and their names
const languageOptions = [
  { label: 'English', value: 'english' },
  { label: 'Spanish', value: 'spanish' },
  { label: 'Japanese', value: 'japanese' },
  { label: 'Italian', value: 'italian' },
  { label: 'German', value: 'german' },
  { label: 'French', value: 'french' },
  { label: 'Portuguese', value: 'portuguese' }
];

type ChatProps = {
  pdfText: string;
};

type Message = {
  author: {
    username: string;
    id: number;
    avatarUrl: string;
  };
  text: string;
  type: string;
  timestamp: number;
};

type aiMessage = {
  role: string;
  content: string;
};

const userAuthor = {
  username: 'User',
  id: 1,
  avatarUrl: '/boy.svg',
};

const aiAuthor = {
  username: 'Bob The Interviewer',
  id: 2,
  avatarUrl: '/mascot.svg',
};

const MAX_MESSAGES_PER_DAY = 50;

const Chat: React.FC<ChatProps> = ({ pdfText }) => {
  const [input, setInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english'); // Default language
  const initialMessage: Message = {
    author: aiAuthor,
    text: 'Hello, I am Bob the PDF AI Chatter. How can I help you?',
    type: 'text',
    timestamp: +new Date(),
  };
  const [chatMessages, setChatMessages] = useState<Message[]>([initialMessage]);
  const [aiMessages, setAiMessages] = useState<aiMessage[]>([]);
  const chatContainer = useRef<HTMLDivElement>(null);

  const { user } = useUser();
  const { openSignUp } = useClerk();

  const scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current as HTMLDivElement;
    if (scrollHeight >= scrollTop + offsetHeight) {
      chatContainer.current?.scrollTo(0, scrollHeight + 200);
    }
  };

  useEffect(() => {
    scroll();
  }, [chatMessages]);

  const handleOnSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!user) {
      openSignUp();
      return;
    }
  
    const message = e.currentTarget['message'].value;
    setInput('');
  
    const currentDate = new Date().toISOString().slice(0, 10);
    const storedDate = localStorage.getItem('lastMessageDate');
    const messageCount = parseInt(localStorage.getItem('messageCount') || '0');
  
    if (storedDate !== currentDate) {
      localStorage.setItem('lastMessageDate', currentDate);
      localStorage.setItem('messageCount', '0');
    } else if (messageCount >= MAX_MESSAGES_PER_DAY) {
      alert('Sorry, you have reached the maximum number of messages for today.');
      return;
    }
  
    setChatMessages((messages) => [
      ...messages,
      {
        author: userAuthor,
        text: message,
        type: 'text',
        timestamp: +new Date(),
      },
      {
        author: aiAuthor,
        text: '...',
        type: 'text',
        timestamp: +new Date(),
      },
    ]);
  
    const messageToSend = [
      ...aiMessages,
      {
        role: 'user',
        content: `ROLE: You are an expert at analyzing text and answering questions on it. Respond in ${selectedLanguage}. PDF TEXT: ${pdfText} USER MESSAGE: ${message}`,
      },
    ];
  
    const response = await fetchOpenAIResponse({
      messages: messageToSend,
      setMessage: (msg) => {
        setChatMessages((messages) => [
          ...messages.slice(0, messages.length - 1),
          {
            author: aiAuthor,
            text: msg || 'No response received',  // The content of the AI's response
            type: 'text',
            timestamp: +new Date(),
          },
        ]);
      },
      setError: (error) => {
        if (error.status === 401) {
          openSignUp();
        }
      },
    });
    
    setAiMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: response || 'No response from AI' }, // Ensure fallback if response is empty
    ]);
  
    localStorage.setItem('messageCount', (messageCount + 1).toString());
  };
  

  const renderResponse = () => {
    return (
      <div ref={chatContainer} className="absolute mt-10 lg:mt-40 pt-12 pb-[22rem] px-6 h-[500px] w-full lg:w-3/4 xl:w-2/4 flex-grow overflow-y-auto">
        {chatMessages.length === 1 ? (
          <div className="flex flex-col items-center">
            <Image
              src="/mascot.svg"
              className="mt-20"
              alt="Chat With AI"
              width={50}
              height={50}
              priority
            />
            <h2 className="text-xl text-center mt-12 animate-none lg:animate-bounce">
              Hi there! How can I help you today?
            </h2>
          </div>
        ) : (
          chatMessages.map((m, index) => (
            <div key={index} className="my-3 lg:my-5">
              <div className={`chat-line ${m.author.username === 'User' ? 'user-chat' : 'ai-chat'}`}>
                <Image className="avatar" alt="avatar" src={m.author.avatarUrl} width={32} height={32} />
                <div style={{ width: '592px', marginLeft: '16px' }}>
                  <div className="message">
                    <MarkdownRenderer>{m.text}</MarkdownRenderer>
                  </div>
                  {index < chatMessages.length - 1 && <div className="horizontal-line" />}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="chat">
      {/* Language Selection Dropdown */}
      <div className="flex justify-center my-4">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      {renderResponse()}
      
      <form onSubmit={handleOnSendMessage} className="flex items-center gap-4 mt-4 w-full max-w-3xl">
        <input
          id="message"
          name="message"
          value={input}
          placeholder="What's on your mind?..."
          onChange={(event) => setInput(event.target.value)}
          className="flex-1 p-4 border-2 border-gray-300 rounded-full text-black bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="px-4 lg:px-8 py-4"
          disabled={input.trim() === "" || input.trim().length < 5}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
