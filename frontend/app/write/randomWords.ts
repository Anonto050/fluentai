// randomWords.ts

export const randomWords = {
    spanish: [
      "hola", "adiós", "gracias", "por favor", "lo siento", 
      "mañana", "ayer", "familia", "amigo", "amor"
    ],
    japanese: [
      "こんにちは", "さようなら", "ありがとう", "お願いします", "ごめんなさい",
      "明日", "昨日", "家族", "友達", "愛"
    ],
    portuguese: [
      "olá", "adeus", "obrigado", "por favor", "desculpa",
      "amanhã", "ontem", "família", "amigo", "amor"
    ],
    french: [
      "bonjour", "au revoir", "merci", "s'il vous plaît", "désolé",
      "demain", "hier", "famille", "ami", "amour"
    ],
    italian: [
      "ciao", "addio", "grazie", "per favore", "mi dispiace",
      "domani", "ieri", "famiglia", "amico", "amore"
    ],
    german: [
      "hallo", "auf wiedersehen", "danke", "bitte", "entschuldigung",
      "morgen", "gestern", "familie", "freund", "liebe"
    ],
  };
  
  export const getRandomWords = (language: keyof typeof randomWords): { id: number, word: string }[] => {
    const words = randomWords[language];
    const shuffledWords = words.sort(() => 0.5 - Math.random()); // Shuffle the words
    const selectedWords = shuffledWords.slice(0, 10); // Select the first 10 words
    return selectedWords.map((word, index) => ({ id: index + 1, word }));
  };
  