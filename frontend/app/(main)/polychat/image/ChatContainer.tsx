'use client';

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faArrowRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";

// Define the structure of a message
type Message = {
  role: "assistant" | "system" | "user";
  content: MessageContent[];
};

type MessageContent = TextContent | ImageContent;

type TextContent = {
  type: "text";
  text: string;
};

type ImageContent = {
  type: "image_url";
  image_url: {
    url: string;
  };
};

function ChatContainer() {
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prevImages) => {
        const availableSlots = 5 - prevImages.length;
        const newImages = filesArray.slice(0, availableSlots);
        return [...prevImages, ...newImages];
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const sendMessage = async () => {
    setIsSending(true); // Disable send and upload buttons

    // Create the content array for the new user message
    const newUserMessageContent: MessageContent[] = [
      {
        type: "text" as const,
        text: message,
      },
      ...images.map((file) => ({
        type: "image_url" as const,
        image_url: { url: URL.createObjectURL(file) },
      })),
    ];

    const newUserMessage: Message = {
      role: "user",
      content: newUserMessageContent as (TextContent | ImageContent)[],
    };

    // Update the messages state to include the new user message
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    const imagePromises = images.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    const imageBase64Strings = await Promise.all(imagePromises);

    const payload = {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: `Please respond in ${selectedLanguage}: ${message}` },
            ...imageBase64Strings.map((base64) => ({
              type: "image_url",
              image_url: { url: base64 },
            })),
          ],
        },
      ],
    };

    try {
      // Send the message to the backend
      const response = await axios.post("/api/openai", payload);

      if (!response.data.success) {
        toast.error(response.data.error);
      }

      const newMessage = { ...response.data.message };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      // Clear the message and images state
      setMessage("");
      setImages([]);
      setIsSending(false); // Re-enable send and upload buttons
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Language selection dropdown */}
      <div className="p-4 flex justify-between">
        <label className="text-sm font-medium">Select language:</label>
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="ml-2 p-2 border rounded-md"
        >
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
          <option value="german">German</option>
          <option value="italian">Italian</option>
          <option value="portuguese">Portuguese</option>
          <option value="japanese">Japanese</option>
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-lg p-2 max-w-xs lg:max-w-md ${
                message.role === "user" ? "bg-blue-500 text-white" : "bg-green-500 text-white"
              }`}
            >
              {Array.isArray(message.content) ? (
                message.content.map((content, index) => {
                  if (content.type === "text") {
                    return <p key={index}>{content.text}</p>;
                  } else if (content.type === "image_url") {
                    return (
                      <img
                        key={index}
                        src={content.image_url.url}
                        alt={`Uploaded by ${message.role}`}
                        className="h-32 w-32 object-cover rounded-lg" // Increased size of images
                      />
                    );
                  }
                })
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Image preview */}
      <div className="p-4">
        {images.map((image, index) => (
          <div key={index} className="relative inline-block">
            <img
              src={URL.createObjectURL(image)}
              alt={`upload-preview ${index}`}
              className="h-32 w-32 object-cover rounded-lg mr-2" // Increased size of preview images
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex items-center space-x-2 p-4 bg-white">
        <label className="flex justify-center items-center p-2 rounded-full bg-gray-200 text-gray-500 w-10 h-10 cursor-pointer">
          <FontAwesomeIcon icon={faPaperclip} className="h-5 w-5" />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
            disabled={isSending}
          />
        </label>
        <textarea
          className="flex-1 border p-2 rounded-lg focus:ring-0 resize-none"
          placeholder="Type your message here..."
          rows={1}
          value={message}
          onChange={handleMessageChange}
        ></textarea>
        <button
          className="flex justify-center items-center p-2 rounded-full bg-blue-600 text-white w-10 h-10"
          onClick={sendMessage}
          disabled={isSending}
        >
          {isSending ? (
            <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 fa-spin" />
          ) : (
            <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}

export default ChatContainer;
