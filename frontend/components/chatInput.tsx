import { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import type { ChatInputProps } from "@/types/chat";
import { Button } from "@/components/ui/button";

const languageMapping: { [key: string]: string } = {
  english: "en-US",
  spanish: "es-ES",
  french: "fr-FR",
  italian: "it-IT",
  german: "de-DE",
  portuguese: "pt-PT",
  japanese: "ja-JP",
};

export default function ChatInput({ input, setInput, loading, sendMessage, language }: ChatInputProps) {
  const [recognizing, setRecognizing] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript.length > 0) {
      setInput(transcript);
    }
  }, [transcript, setInput]);

  const handleMicClick = () => {
    if (!recognizing) {
      setRecognizing(true);
      const languageCode = languageMapping[language] || "en-US";
      SpeechRecognition.startListening({ language: languageCode });
    } else {
      setRecognizing(false);
      SpeechRecognition.stopListening();
      console.log("Transcript:", transcript);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    SpeechRecognition.stopListening();
    await sendMessage(event);
    resetTranscript();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4 mt-4 w-full max-w-3xl">
      <label className="hidden" htmlFor="message">
        Enter your message here:
      </label>

      {/* Microphone Button */}
      <button
        type="button"
        onClick={handleMicClick}
        className={`p-4 border-2 border-gray-300 rounded-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 ${
          recognizing ? "bg-green-500 text-white" : "bg-white text-black"
        }`}
      >
        {recognizing ? "🎙️" : "🎤"}
      </button>

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
        {loading ? <p className="animate-spin">⏳</p> : "Send"}
      </Button>
    </form>
  );
}
