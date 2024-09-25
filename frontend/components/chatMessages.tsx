// chatMessages.tsx
import Image from "next/image";
import type { ChatMessagesProps } from "@/types/chat";
import { ChatBubble } from "@/app/chat/[scenario]/chat-bubble";

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="absolute mt-10 lg:mt-40 pt-12 pb-[22rem] px-6 h-[500px] w-full lg:w-3/4 xl:w-2/4  flex-grow overflow-y-auto">
       
      {messages && messages.length === 0 ? (
        <div className="flex flex-col items-center">
          <Image
            src="/mascot.svg"
            className="mt-20"
            alt="Chat With Siri Logo"
            width={50}
            height={10}
            priority
          />
          <h2 className="text-xl text-center mt-12 animate-none lg:animate-bounce">
            Hi there! How can I help you today?
          </h2>
        </div>
      ) : (
        messages.map((message, index) => (
          <div key={index} className="my-3 lg:my-5">
            {message.role === "assistant" ? (
              <ChatBubble
                message={message.content}
                isSender={false}
                avatarUrl="/mascot.svg"
              />
            ) : (
              <ChatBubble
                message={message.content}
                isSender={true}
                avatarUrl="/boy.svg"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}
