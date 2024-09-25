import { FC } from "react";

interface WordPromptProps {
  word: string;
  extractedText: string;
}

export const WordPrompt: FC<WordPromptProps> = ({ word, extractedText }) => {
  return (
    <div className="w-[270px] space-y-4 rounded-xl border-2 p-4 my-[200px]">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <h3 className="text-lg font-bold">Write the following word:</h3>
        </div>
        <p className="text-center text-[30px] text-muted-foreground">
          {word || "Loading..."}
        </p>
      </div>
      <div className="space-y-2 mt-4 pb-2 text-center">
        <h3 className="text-lg font-bold">Extracted Text</h3>
        <p>{extractedText || "No text extracted yet."}</p>
      </div>
    </div>
  );
};
