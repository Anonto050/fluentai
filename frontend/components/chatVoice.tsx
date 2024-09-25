"use client";

import { ChatVoiceProps } from "@/types/chat";
import { Button } from "@/components/ui/button";

export default function ChatVoice({
  voices,
  selectedVoice,
  setSelectedVoice,
}: ChatVoiceProps) {
  return (
    <>
      <div className="p-2 lg:p-4 lg:w-3/4 xl:w-2/4 border-0 lg:border-x-2 lg:border-gray-300 flex flex-col items-center">
        <label className="mb-4 text-base font-bold text-green-500 lg:text-xl" htmlFor="voices">
          Change Siri&apos;s Voice:
        </label>
        <select
          id="voices"
          name="voices"
          className="p-2 w-4/4 lg:w-3/4 text-sm lg:text-base appearance-none bg-white border-2 border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={selectedVoice}
          onChange={(event) => setSelectedVoice(event.target.value)}
        >
          {voices &&
            voices
              .sort((a, b) => a.name!.localeCompare(b.name!))
              .map((voice) => (
                <option key={voice.voice_id} value={voice.name}>
                  {voice.name} ({voice.labels?.age} {voice.labels?.accent} {voice.labels?.gender})
                </option>
              ))}
        </select>
      </div>
      <hr className="w-full lg:w-3/4 xl:w-2/4" />
    </>
  );
}
