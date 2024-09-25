import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { PassThrough } from "stream";

export async function GET(req) {
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    process.env["SPEECH_KEY"],
    process.env["SPEECH_REGION"]
  );

  // Define voice mappings for different languages and teachers
  const voiceMappings = {
    japanese: {
      Nanami: "ja-JP-NanamiNeural",
      Naoki: "ja-JP-NaokiNeural",
    },
    spanish: {
      Nanami: "es-ES-ElviraNeural",
      Naoki: "es-ES-AlvaroNeural",
    },
    french: {
      Nanami: "fr-FR-DeniseNeural",
      Naoki: "fr-FR-HenriNeural",
    },
    italian: {
      Nanami: "it-IT-ElsaNeural",
      Naoki: "it-IT-DiegoNeural",
    },
    german: {
      Nanami: "de-DE-KatjaNeural",
      Naoki: "de-DE-ConradNeural",
    },
    portuguese: {
      Nanami: "pt-PT-FernandaNeural",
      Naoki: "pt-PT-RaquelNeural",
    },
  };

  const teacher = req.nextUrl.searchParams.get("teacher") || "Nanami";
  const language = req.nextUrl.searchParams.get("language") || "japanese";

  // Set the appropriate voice based on language and teacher
  const selectedVoice = voiceMappings[language]?.[teacher] || "ja-JP-NanamiNeural";
  speechConfig.speechSynthesisVoiceName = selectedVoice;

  const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);
  const visemes = [];
  speechSynthesizer.visemeReceived = function (s, e) {
    visemes.push([e.audioOffset / 10000, e.visemeId]);
  };

  const audioStream = await new Promise((resolve, reject) => {
    speechSynthesizer.speakTextAsync(
      req.nextUrl.searchParams.get("text") || "I'm excited to try text to speech",
      (result) => {
        const { audioData } = result;

        speechSynthesizer.close();

        // Convert arrayBuffer to stream
        const bufferStream = new PassThrough();
        bufferStream.end(Buffer.from(audioData));
        resolve(bufferStream);
      },
      (error) => {
        console.log(error);
        speechSynthesizer.close();
        reject(error);
      }
    );
  });

  const response = new Response(audioStream, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": `inline; filename=tts.mp3`,
      Visemes: JSON.stringify(visemes),
    },
  });

  return response;
}
