import Image from "next/image";
import type { ChatControlsProps } from "@/types/chat";
import { Button } from "@/components/ui/button";

export default function ChatControls({
  audioRef,
  savedAudio,
  messages,
  clearMessages
}: ChatControlsProps) {
  return (
    <div className={`flex ${messages.length > 0 ? `block` : `hidden`} gap-4 mt-4`}>
      <Button
        variant="primary"
        size="lg"
        onClick={() => audioRef.current && audioRef.current.play()}
        disabled={!savedAudio}
      >
        Replay
      </Button>
      <Button
        variant="secondary"
        size="lg"
        onClick={clearMessages}
      >
        New Chat
      </Button>
      <audio ref={audioRef} controls className="hidden" />
    </div>
  );
}
