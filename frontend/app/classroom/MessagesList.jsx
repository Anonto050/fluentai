import { useAITeacher } from "@/hooks/useAITeacher";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export const MessagesList = ({ courseName }) => {
  const messages = useAITeacher((state) => state.messages);
  const playMessage = useAITeacher((state) => state.playMessage);
  const stopMessage = useAITeacher((state) => state.stopMessage);
  const { currentMessage } = useAITeacher();
  const english = useAITeacher((state) => state.english);
  const furigana = useAITeacher((state) => state.furigana);
  const classroom = useAITeacher((state) => state.classroom);

  const container = useRef();

  useEffect(() => {
    container.current.scrollTo({
      top: container.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  const renderEnglish = (englishText) => (
    <>
      {english && (
        <p className="text-xl font-bold text-gray-100">
          {englishText}
        </p>
      )}
    </>
  );

  const renderLanguage = (languageContent) => (
    <p className="text-white font-bold text-4xl mt-2 flex flex-wrap gap-1">
      {languageContent.map((word, i) => (
        <span key={i} className="flex flex-col justify-end items-center">
          {furigana && word.reading && (
            <span className="text-2xl text-white/65">{word.reading}</span>
          )}
          <span className="text-2xl">{word.word}</span>
        </span>
      ))}
    </p>
  );

  const renderGrammarChunks = (chunks, language) => (
    <div className="flex flex-wrap gap-2 items-end">
      {chunks.map((chunk, i) => (
        <div key={i} className="p-2 bg-black/30 rounded-md space-y-1">
          <p className="text-white/90 text-2xl font-jp">
            {chunk[language].map((word) => word.word).join(' ')}
          </p>
          <p className="text-pink-300/90 text-xl">
            {chunk.meaning}
          </p>
          <p className="text-blue-400/90 text-xl">
            {chunk.grammar}
          </p>
        </div>
      ))}
    </div>
  );

  const renderMessage = (message) => {
    const languageKey = courseName.toLowerCase(); // Convert courseName to lowercase for key matching
    return renderLanguage(message.answer[languageKey]);
  };

  return (
    <div
      className={`${
        classroom === "default"
          ? "w-[1288px] h-[676px]"
          : "w-[2528px] h-[856px]"
      } p-8 overflow-y-auto flex flex-col space-y-12 bg-transparent opacity-80`}
      ref={container}
    >
      {messages.length === 0 && (
        <div className="h-full w-full grid place-content-center text-center">
          <h2 className="text-8xl font-bold text-white/90 italic">
            Wawa Sensei
            <br />
            {courseName} Language School
          </h2>
        </div>
      )}
      {messages.map((message, i) => (
        <div key={i} className="space-y-6">
          <div className="flex items-center gap-3">
            <span
              className={`text-white/90 text-2xl font-bold uppercase px-3 py-1 rounded-full ${
                message.speech === "formal" ? "bg-indigo-600" : "bg-teal-600"
              }`}
            >
              {message.speech + " : " }
            </span>
            {renderEnglish(message.answer.english)}
          </div>

          <div className="space-y-4">
            {renderMessage(message)}
          </div>

          <div className="flex items-center gap-4 ">
            {currentMessage === message ? (
              <Button
                variant="danger"
                className="py-2 px-4 text-lg rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 bg-red-500 text-white"
                onClick={() => stopMessage(message)}
              >
                STOP
              </Button>
            ) : (
              <Button
                variant="default"
                className="py-2 px-4 text-lg rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 bg-green-500 text-white"
                onClick={() => playMessage(message)}
              >
                PLAY
              </Button>
            )}
          </div>

          <div className="p-5 mt-5 bg-gradient-to-br from-pink-200/20 to-pink-500/20 rounded-xl space-y-4">
            <span className="italic text-xl font-bold text-white/90">
              Grammar Breakdown
            </span>
            {message.answer.grammarBreakdown.map((grammar, i) => (
              <div key={i} className="text-4xl space-y-2">
                {renderEnglish(grammar.english)}
                {renderGrammarChunks(grammar.chunks, courseName.toLowerCase())}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
