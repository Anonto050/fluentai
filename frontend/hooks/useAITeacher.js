import { create } from "zustand";

export const teachers = ["Nanami", "Naoki"];

export const useAITeacher = create((set, get) => ({
  messages: [],
  currentMessage: null,
  teacher: teachers[0],
  classroom: "default",
  language: "japanese", // Default language
  loading: false,
  furigana: true,
  english: true,
  speech: "formal",

  setTeacher: (teacher) => {
    set(() => ({
      teacher,
      messages: get().messages.map((message) => {
        message.audioPlayer = null; // Reset audioPlayer for new teacher's voice
        return message;
      }),
    }));
  },

  setClassroom: (classroom) => set({ classroom }),
  setFurigana: (furigana) => set({ furigana }),
  setEnglish: (english) => set({ english }),
  setSpeech: (speech) => set({ speech }),
  setLanguage: (language) => set({ language: language.toLowerCase() }), // Setter for language, converting to lowercase

  askAI: async (question) => {
    if (!question) return;

    const speech = get().speech;
    const language = get().language;
    const message = {
      question,
      id: 0, // Keep ID as 0 since only one message is kept
    };

    set({ loading: true });

    // Ask AI
    try {
      const res = await fetch(`/api/ai?question=${question}&speech=${speech}&language=${language}`);
      const data = await res.json();
      message.answer = data;
      message.speech = speech;

      set({
        currentMessage: message,
        messages: [message], // Replace any previous messages
        loading: false,
      });

      get().playMessage(message);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      set({ loading: false });
    }
  },

  playMessage: async (message) => {
    set({ currentMessage: message });

    if (!message.audioPlayer) {
      set({ loading: true });

      try {
        const language = get().language;

        // Get TTS (Text-to-Speech) audio
        const audioRes = await fetch(
          `/api/tts?teacher=${get().teacher}&text=${message.answer[language]
            .map((word) => word.word)
            .join(" ")}&language=${language}`
        );


        const audio = await audioRes.blob();
        const visemes = JSON.parse(await audioRes.headers.get("visemes"));
        const audioUrl = URL.createObjectURL(audio);
        const audioPlayer = new Audio(audioUrl);

        message.visemes = visemes;
        message.audioPlayer = audioPlayer;
        message.audioPlayer.onended = () => set({ currentMessage: null });

        set({
          loading: false,
          messages: [message], // Ensure only the current message is kept
        });
      } catch (error) {
        console.error("Error playing message:", error);
        set({ loading: false });
      }
    }

    message.audioPlayer.currentTime = 0;
    message.audioPlayer.play();
  },

  stopMessage: (message) => {
    if (message.audioPlayer) {
      message.audioPlayer.pause();
      set({ currentMessage: null });
    }
  },
}));
