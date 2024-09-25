"use client";

import { useState, useEffect, useRef } from "react";
import StoreApiKeys from "@/components/storeApiKeys";
import ChatVoice from "@/components/chatVoice";
import ChatMessages from "@/components/chatMessages";
import ChatControls from "@/components/chatControls";
import ChatInput from "@/components/chatInput";
import useLocalStorage from "@/hooks/useLocalStorage";
import getVoices from "@/lib/getVoices";
import notifyUser from "@/lib/notifyUser";
import { userRole, botRole, Message } from "@/types/chat";
import { Voice as VoiceResponse } from "elevenlabs/api";
import { apiFetch } from "@/lib/apiService";


export default function ChatPage({ scenario, userId }: { scenario: string, userId: string }) {
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isModal, setIsModal] = useState(false);
  const [openAiKey, setOpenAiKey] = useLocalStorage<string>("openai-key", "");
  const [elevenLabsKey, setElevenLabsKey] = useLocalStorage<string>("11labs-key", "");
  const [voices, setVoices] = useState<VoiceResponse[]>([]);
  const [selectedVoice, setSelectedVoice] = useLocalStorage<string>("selectedVoice", "Myra");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useLocalStorage<Message[]>("chatMessages", []);
  const [loading, setLoading] = useState<boolean>(false);
  const [savedAudio, setSavedAudio] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("");

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        // Fetch user progress using apiFetch
        const userProgressData = await apiFetch(`/user-progress/${userId}`);
        const course = userProgressData.activeCourse?.title || "Spanish";
        const language = course.toLowerCase();

        // Set the language state
        setLanguage(language);
      } catch (error) {
        console.error("Failed to fetch language data:", error);
      }
    };

    fetchLanguage();
  }, []);


  const getOpenAIResponse = async (chatMessages: Message[]) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apiKey: openAiKey, messages: chatMessages, language, scenario }),
    });

    if (response.status === 401) {
      notifyUser("Your OpenAI API Key is invalid. Kindly check and try again.", {
        type: "error",
        autoClose: 5000,
      });
    }

    const data = await response.json();
    return data;
  };


  const getElevenLabsResponse = async (text: string) => {
    const response = await fetch("/api/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: elevenLabsKey,
        message: text,
        voice: selectedVoice,
        language,
      }),
    });

    if (response.status === 401) {
      notifyUser("Your ElevenLabs API Key is invalid. Kindly check and try again.", {
        type: "error",
        autoClose: 5000,
      });
    }

    const data = await response.blob();
    return data;
  };

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isProduction = process.env.NEXT_PUBLIC_APP_MODE === "production";

    if (isProduction && (!openAiKey || !elevenLabsKey)) {
      setIsModal(true);
    } else {
      setLoading(true);
      setInput("");

      const chatMessages: Message[] = [...messages, { role: userRole, content: input }];
      setMessages(chatMessages);

      const botChatResponse = await getOpenAIResponse(chatMessages);
      const botVoiceResponse = await getElevenLabsResponse(botChatResponse);

      const reader = new FileReader();
      reader.readAsDataURL(botVoiceResponse);
      reader.onload = () => {
        if (audioRef.current) {
          audioRef.current.src = reader.result as string;
          audioRef.current.play();
        }
      };

      setMessages([...chatMessages, { role: botRole, content: botChatResponse }]);
      setLoading(false);
      setSavedAudio(true);
    }
  };

  const clearMessages = async () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  useEffect(() => {
    getVoices()
      .then((voices) => {
        setVoices(voices ?? []);
      })
      .catch((error) => {
        console.error("Error fetching voices:", error);
      });
  }, []);

  return (
    <main className="flex flex-col min-h-screen items-center justify-between py-4 px-4 lg:px-0">
      {voices.length === 0 ? (
        <p className="text-white text-9xl animate-ping">...</p>
      ) : (
        <>
          <div className="flex flex-col w-full z-10 fixed top-0 text-center items-center">
            <StoreApiKeys
              {...{
                isModal,
                setIsModal,
                setOpenAiKey,
                setElevenLabsKey,
              }}
            />
            <ChatVoice {...{ voices, selectedVoice, setSelectedVoice }} />
            
          </div>
          
          <ChatMessages {...{ messages }} />

          <div className="flex flex-col items-center w-full fixed bottom-0 pb-3">
            <ChatControls
              {...{
                audioRef,
                savedAudio,
                messages,
                clearMessages,
              }}
            />
            <ChatInput
              {...{
                input,
                setInput,
                loading,
                sendMessage,
                language,
              }}
            />
          </div>
        </>
      )}
    </main>
  );
}
