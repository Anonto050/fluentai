import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

type GPTResponseProps = {
  detectedObjects: string[];
  selectedLanguage: string;
};

const GPTResponse: React.FC<GPTResponseProps> = ({ detectedObjects, selectedLanguage }) => {
  const [guidance, setGuidance] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const lastRequestTimeRef = useRef<number>(0);
  const hasSpokenGuidance = useRef(false);

  const languageMap: { [key: string]: string } = {
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
    de: "de-DE",
    it: "it-IT",
    ja: "ja-JP",
    ko: "ko-KR",
    pt: "pt-PT",
  };

  // Text-to-Speech function with language support
  const speak = (text: string, language: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageMap[language] || "en-US";
      utterance.rate = 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Text-to-speech is not supported in this browser.");
    }
  };

  const startListening = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = languageMap[selectedLanguage] || "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMessage("");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const spokenText = event.results[0][0].transcript;
        setTranscript(spokenText);
        handleConversation(spokenText); // Handle user question
      };

      recognition.onerror = (event) => {
        if (event.error === "no-speech") {
          setErrorMessage("No speech detected. Please try speaking again.");
          setTimeout(() => {
            startListening();
          }, 2000);
        } else {
          setErrorMessage(`Speech recognition error: ${event.error}`);
        }
      };

      recognition.start();
    } else {
      console.error("Speech recognition not supported in this browser.");
    }
  };

  // Handle conversational flow using GPT
  const handleConversation = async (userQuestion: string) => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTimeRef.current;

    if (timeSinceLastRequest < 5000) {
      console.log("Skipping this request to avoid too many calls");
      return;
    }

    const prompt = `The camera detects the following objects: ${detectedObjects.join(", ")}. User asks in ${selectedLanguage}: ${userQuestion}. Provide a response in ${selectedLanguage}.`;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are an assistant providing real-time navigation and environment description in ${selectedLanguage}.`,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const receivedGuidance = response.data.choices[0].message.content;
      setGuidance(receivedGuidance);
      lastRequestTimeRef.current = now;

      // Convert guidance to speech in the selected language
      if (!isSpeaking) {
        speak(receivedGuidance, selectedLanguage);
      }
    } catch (error) {
      console.error("GPT response error:", error);
    }
  };

  useEffect(() => {
    if (detectedObjects.length > 0 && !hasSpokenGuidance.current) {
      const prompt = `The camera detects the following objects: ${detectedObjects.join(", ")}. Provide navigation guidance in ${selectedLanguage}.`;
      handleConversation(prompt); // Provide initial guidance
      hasSpokenGuidance.current = true; // Ensure guidance is spoken only once
    }
  }, [detectedObjects, selectedLanguage]);

  return (
    <div className="gpt-response bg-white p-6 shadow-lg rounded-lg border-2 border-gray-300 max-w-lg mx-auto mt-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Navigation Guidance:</h3>
      <p className="text-base text-gray-600 mb-4">
        {guidance || "No guidance available yet."}
      </p>
      {errorMessage && (
        <p className="text-red-500 mb-4">{errorMessage}</p>
      )}
      <Button
        variant="primary"
        className="mt-4"
        onClick={() => {
          if (detectedObjects.length > 0 && guidance) {
            speak(guidance, selectedLanguage); // Speak guidance in the selected language
          }
        }}
      >
        Repeat Guidance
      </Button>
      <Button
        variant="secondary"
        className="mt-4 ml-4"
        onClick={startListening}
        disabled={isListening}
      >
        {isListening ? "Listening..." : "Ask a Question"}
      </Button>
      <p className="mt-2 text-gray-500">Transcript: {transcript}</p>
    </div>
  );
};

export default GPTResponse;