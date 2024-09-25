import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

// Define language-specific grammar examples
const languageExamples = {
  japanese: {
    formal: {
      text: [
        { word: "日本", reading: "にほん" },
        { word: "に" },
        { word: "住んで", reading: "すんで" },
        { word: "います" },
        { word: "か" },
        { word: "?" },
      ],
      grammarBreakdown: [
        {
          english: "Do you live in Japan?",
          text: [
            { word: "日本", reading: "にほん" },
            { word: "に" },
            { word: "住んで", reading: "すんで" },
            { word: "います" },
            { word: "か" },
            { word: "?" },
          ],
          chunks: [
            {
              text: [{ word: "日本", reading: "にほん" }],
              meaning: "Japan",
              grammar: "Noun",
            },
            {
              text: [{ word: "に" }],
              meaning: "in",
              grammar: "Particle",
            },
            {
              text: [
                { word: "住んで", reading: "すんで" },
                { word: "います" },
              ],
              meaning: "live",
              grammar: "Verb + て form + います",
            },
            {
              text: [{ word: "か" }],
              meaning: "question",
              grammar: "Particle",
            },
            {
              text: [{ word: "?" }],
              meaning: "question",
              grammar: "Punctuation",
            },
          ],
        },
      ],
    },
    casual: {
      text: [
        { word: "日本", reading: "にほん" },
        { word: "に" },
        { word: "住んで", reading: "すんで" },
        { word: "いる" },
        { word: "の" },
        { word: "?" },
      ],
      grammarBreakdown: [
        {
          english: "Do you live in Japan?",
          text: [
            { word: "日本", reading: "にほん" },
            { word: "に" },
            { word: "住んで", reading: "すんで" },
            { word: "いる" },
            { word: "の" },
            { word: "?" },
          ],
          chunks: [
            {
              text: [{ word: "日本", reading: "にほん" }],
              meaning: "Japan",
              grammar: "Noun",
            },
            {
              text: [{ word: "に" }],
              meaning: "in",
              grammar: "Particle",
            },
            {
              text: [
                { word: "住んで", reading: "すんで" },
                { word: "いる" },
              ],
              meaning: "live",
              grammar: "Verb + て form + いる",
            },
            {
              text: [{ word: "の" }],
              meaning: "question",
              grammar: "Particle",
            },
            {
              text: [{ word: "?" }],
              meaning: "question",
              grammar: "Punctuation",
            },
          ],
        },
      ],
    },
  },

  spanish: {
    formal: {
      text: [
        { word: "¿Vives" },
        { word: "en" },
        { word: "España" },
        { word: "?" },
      ],
      grammarBreakdown: [
        {
          english: "Do you live in Spain?",
          text: [
            { word: "¿Vives" },
            { word: "en" },
            { word: "España" },
            { word: "?" },
          ],
          chunks: [
            {
              text: [{ word: "¿Vives" }],
              meaning: "Do you live",
              grammar: "Verb",
            },
            {
              text: [{ word: "en" }],
              meaning: "in",
              grammar: "Preposition",
            },
            {
              text: [{ word: "España" }],
              meaning: "Spain",
              grammar: "Noun",
            },
            {
              text: [{ word: "?" }],
              meaning: "question",
              grammar: "Punctuation",
            },
          ],
        },
      ],
    },
    casual: {
      text: [
        { word: "¿Vives" },
        { word: "en" },
        { word: "España" },
        { word: "?" },
      ],
      grammarBreakdown: [
        {
          english: "Do you live in Spain?",
          text: [
            { word: "¿Vives" },
            { word: "en" },
            { word: "España" },
            { word: "?" },
          ],
          chunks: [
            {
              text: [{ word: "¿Vives" }],
              meaning: "Do you live",
              grammar: "Verb",
            },
            {
              text: [{ word: "en" }],
              meaning: "in",
              grammar: "Preposition",
            },
            {
              text: [{ word: "España" }],
              meaning: "Spain",
              grammar: "Noun",
            },
            {
              text: [{ word: "?" }],
              meaning: "question",
              grammar: "Punctuation",
            },
          ],
        },
      ],
    },
  },

  french: {
    formal: {
      text: [
        { word: "Est-ce" },
        { word: "que" },
        { word: "vous" },
        { word: "habitez" },
        { word: "en" },
        { word: "France" },
        { word: "?" },
      ],
      grammarBreakdown: [
        {
          english: "Do you live in France?",
          text: [
            { word: "Est-ce" },
            { word: "que" },
            { word: "vous" },
            { word: "habitez" },
            { word: "en" },
            { word: "France" },
            { word: "?" },
          ],
          chunks: [
            {
              text: [{ word: "Est-ce" }],
              meaning: "Is it",
              grammar: "Phrase",
            },
            {
              text: [{ word: "que" }],
              meaning: "that",
              grammar: "Conjunction",
            },
            {
              text: [{ word: "vous" }],
              meaning: "you",
              grammar: "Pronoun",
            },
            {
              text: [{ word: "habitez" }],
              meaning: "live",
              grammar: "Verb",
            },
            {
              text: [{ word: "en" }],
              meaning: "in",
              grammar: "Preposition",
            },
            {
              text: [{ word: "France" }],
              meaning: "France",
              grammar: "Noun",
            },
            {
              text: [{ word: "?" }],
              meaning: "question",
              grammar: "Punctuation",
            },
          ],
        },
      ],
    },
    casual: {
      text: [
        { word: "Tu" },
        { word: "habites" },
        { word: "en" },
        { word: "France" },
        { word: "?" },
      ],
      grammarBreakdown: [
        {
          english: "Do you live in France?",
          text: [
            { word: "Tu" },
            { word: "habites" },
            { word: "en" },
            { word: "France" },
            { word: "?" },
          ],
          chunks: [
            {
              text: [{ word: "Tu" }],
              meaning: "You",
              grammar: "Pronoun",
            },
            {
              text: [{ word: "habites" }],
              meaning: "live",
              grammar: "Verb",
            },
            {
              text: [{ word: "en" }],
              meaning: "in",
              grammar: "Preposition",
            },
            {
              text: [{ word: "France" }],
              meaning: "France",
              grammar: "Noun",
            },
            {
              text: [{ word: "?" }],
              meaning: "question",
              grammar: "Punctuation",
            },
          ],
        },
      ],
    },
  },

  italian: {
    formal: {
      text: [
        { word: "Lei" },
        { word: "vive" },
        { word: "in" },
        { word: "Italia" },
        { word: "?" },
      ],
      grammarBreakdown: [
        {
          english: "Do you live in Italy?",
          text: [
            { word: "Lei" },
            { word: "vive" },
            { word: "in" },
            { word: "Italia" },
            { word: "?" },
          ],
          chunks: [
            {
              text: [{ word: "Lei" }],
              meaning: "You (formal)",
              grammar: "Pronoun",
            },
            {
              text: [{ word: "vive" }],
              meaning: "live",
              grammar: "Verb",
            },
            {
              text: [{ word: "in" }],
              meaning: "in",
              grammar: "Preposition",
            },
            {
              text: [{ word: "Italia" }],
              meaning: "Italy",
              grammar: "Noun",
            },
            {
              text: [{ word: "?" }],
              meaning: "question",
              grammar: "Punctuation",
            },
          ],
        },
      ],
    },
    casual: {
      text: [
        { word: "Tu" },
        { word: "vivi" },
        { word: "in" },
        { word: "Italia" },
        { word: "?" },
      ],
      grammarBreakdown: [
        {
          english: "Do you live in Italy?",
          text: [
            { word: "Tu" },
            { word: "vivi" },
            { word: "in" },
            { word: "Italia" },
            { word: "?" },
          ],
          chunks: [
            {
              text: [{ word: "Tu" }],
              meaning: "You",
              grammar: "Pronoun",
            },
            {
              text: [{ word: "vivi" }],
              meaning: "live",
              grammar: "Verb",
            },
            {
              text: [{ word: "in" }],
              meaning: "in",
              grammar: "Preposition",
            },
            {
              text: [{ word: "Italia" }],
              meaning: "Italy",
              grammar: "Noun",
            },
            {
              text: [{ word: "?" }],
              meaning: "question",
              grammar: "Punctuation",
            },
          ],
        },
      ],
    },
  },
  
  german: {
    formal: {
      text: [
        { word: "Leben" },
        { word: "Sie" },
        { word: "in" },
        { word: "Deutschland" },
        { word: "?" },
      ],
      grammarBreakdown: [
        {
          english: "Do you live in Germany?",
          text: [
            { word: "Leben" },
            { word: "Sie" },
            { word: "in" },
            { word: "Deutschland" },
            { word: "?" },
          ],
          chunks: [
            {
              text: [{ word: "Leben" }],
              meaning: "live",
              grammar: "Verb",
            },
            {
              text: [{ word: "Sie" }],
              meaning: "you (formal)",
              grammar: "Pronoun",
            },
            {
              text: [{ word: "in" }],
              meaning: "in",
              grammar: "Preposition",
            },
            {
              text: [{ word: "Deutschland" }],
              meaning: "Germany",
              grammar: "Noun",
            },
            {
              text: [{ word: "?" }],
              meaning: "question",
              grammar: "Punctuation",
            },
          ],
        },
      ],
    },
    casual: {
      text: [
        { word: "Lebst" },
        { word: "du" },
        { word: "in" },
        { word: "Deutschland" },
        { word: "?" },
      ],
      grammarBreakdown: [
        {
          english: "Do you live in Germany?",
          text: [
            { word: "Lebst" },
            { word: "du" },
            { word: "in" },
            { word: "Deutschland" },
            { word: "?" },
          ],
          chunks: [
            {
              text: [{ word: "Lebst" }],
              meaning: "live",
              grammar: "Verb",
            },
            {
              text: [{ word: "du" }],
              meaning: "you",
              grammar: "Pronoun",
            },
            {
              text: [{ word: "in" }],
              meaning: "in",
              grammar: "Preposition",
            },
            {
              text: [{ word: "Deutschland" }],
              meaning: "Germany",
              grammar: "Noun",
            },
            {
              text: [{ word: "?" }],
              meaning: "question",
              grammar: "Punctuation",
            },
          ],
        },
      ],
    },
  },
  

  portuguese: {
    formal: {
      text: [
        { word: "Você" },
        { word: "mora" },
        { word: "no" },
        { word: "Brasil" },
        { word: "?" },
      ],
      grammarBreakdown: [
        {
          english: "Do you live in Brazil?",
          text: [
            { word: "Você" },
            { word: "mora" },
            { word: "no" },
            { word: "Brasil" },
            { word: "?" },
          ],
          chunks: [
            {
              text: [{ word: "Você" }],
              meaning: "you (formal)",
              grammar: "Pronoun",
            },
            {
              text: [{ word: "mora" }],
              meaning: "live",
              grammar: "Verb",
            },
            {
              text: [{ word: "no" }],
              meaning: "in the",
              grammar: "Preposition + Article",
            },
            {
              text: [{ word: "Brasil" }],
              meaning: "Brazil",
              grammar: "Noun",
            },
            {
              text: [{ word: "?" }],
              meaning: "question",
              grammar: "Punctuation",
            },
          ],
        },
      ],
    },
    casual: {
      text: [
        { word: "Você" },
        { word: "mora" },
        { word: "no" },
        { word: "Brasil" },
        { word: "?" },
      ],
      grammarBreakdown: [
        {
          english: "Do you live in Brazil?",
          text: [
            { word: "Você" },
            { word: "mora" },
            { word: "no" },
            { word: "Brasil" },
            { word: "?" },
          ],
          chunks: [
            {
              text: [{ word: "Você" }],
              meaning: "you",
              grammar: "Pronoun",
            },
            {
              text: [{ word: "mora" }],
              meaning: "live",
              grammar: "Verb",
            },
            {
              text: [{ word: "no" }],
              meaning: "in the",
              grammar: "Preposition + Article",
            },
            {
              text: [{ word: "Brasil" }],
              meaning: "Brazil",
              grammar: "Noun",
            },
            {
              text: [{ word: "?" }],
              meaning: "question",
              grammar: "Punctuation",
            },
          ],
        },
      ],
    },
  },
  
};

// Function to get the correct example based on language and speech
function getLanguageExample(language, speech) {
  const lowerCaseLanguage = language.toLowerCase();
  const examples = languageExamples[lowerCaseLanguage];
  return examples ? examples[speech] : null;
}

export async function GET(req) {
  const language = req.nextUrl.searchParams.get("language") || "japanese";
  const speech = req.nextUrl.searchParams.get("speech") || "formal";
  const question =
    req.nextUrl.searchParams.get("question") || "Have you ever been to Japan?";

  const languageExample = getLanguageExample(language, speech);

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a ${language} language teacher. 
Your student asks you how to say something from English to ${language}.
You should respond with: 
- english: the english version ex: "Do you live in ${language}?"
- ${language}: the ${language} translation in split into words ex: ${JSON.stringify(
          languageExample.text
        )}
- grammarBreakdown: an explanation of the grammar structure per sentence ex: ${JSON.stringify(
          languageExample.grammarBreakdown
        )}
`,
      },
      {
        role: "system",
        content: `You always respond with a JSON object with the following format: 
        {
          "english": "",
          "${language}": [{
            "word": "",
            "reading": ""
          }],
          "grammarBreakdown": [{
            "english": "",
            "${language}": [{
              "word": "",
              "reading": ""
            }],
            "chunks": [{
              "${language}": [{
                "word": "",
                "reading": ""
              }],
              "meaning": "",
              "grammar": ""
            }]
          }]
        }`,
      },
      {
        role: "user",
        content: `How to say ${question} in ${language} in ${speech} speech?`,
      },
    ],
    model: "gpt-3.5-turbo",
    response_format: {
      type: "json_object",
    },
  });

  return Response.json(JSON.parse(chatCompletion.choices[0].message.content));
}
