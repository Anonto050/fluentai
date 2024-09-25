import Image from "next/image";

type ChatBubbleProps = {
  message: string;
  isSender: boolean;
  avatarUrl?: string;
};

export const ChatBubble = ({ message, isSender, avatarUrl = "/mascot.svg" }: ChatBubbleProps) => {
  return (
    <div className={`mb-3 flex items-center gap-x-4 ${isSender ? 'justify-end' : 'justify-start'}`}>
      {!isSender && (
        <Image
          src={avatarUrl}
          alt="Avatar"
          height={50}
          width={50}
          className="hidden lg:block"
        />
      )}
      {!isSender && (
        <Image
          src={avatarUrl}
          alt="Avatar"
          height={30}
          width={30}
          className="block lg:hidden"
        />
      )}

      <div
        className={`relative rounded-xl border-2 px-4 py-2 text-sm lg:text-base ${
          isSender ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {message}
        <div
          className={`absolute top-1/2 h-0 w-0 -translate-y-1/2 rotate-90 transform border-x-8 border-t-8 border-x-transparent ${
            isSender ? "right-[-16px] border-t-blue-500" : "left-[-16px] border-t-gray-200"
          }`}
          aria-hidden
        />
      </div>

      {isSender && (
        <Image
          src={avatarUrl}
          alt="Avatar"
          height={50}
          width={50}
          className="hidden lg:block"
        />
      )}
      {isSender && (
        <Image
          src={avatarUrl}
          alt="Avatar"
          height={30}
          width={30}
          className="block lg:hidden"
        />
      )}
    </div>
  );
};
