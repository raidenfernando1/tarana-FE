import { useState } from "react";
import { client } from "../components/Clients/Groq";

interface UseWhisperTranscriptionResult {
  transcribe: (audioFile: File | Blob, fileName?: string) => Promise<string>;
  isTranscribing: boolean;
  error: string | null;
}

export default function useWhisperTranscription(): UseWhisperTranscriptionResult {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transcribe = async (
    audioFile: File | Blob,
    fileName = "audio.wav"
  ): Promise<string> => {
    try {
      setIsTranscribing(true);
      setError(null);

      let uploadableFile: File;

      if (audioFile instanceof File) {
        uploadableFile = audioFile;
      } else {
        uploadableFile = new File([audioFile], fileName, {
          type: audioFile.type || "audio/wav",
          lastModified: Date.now(),
        });
      }

      const transcription = await client.audio.transcriptions.create({
        file: uploadableFile,
        model: "whisper-large-v3",
        response_format: "text",
      });

      const result =
        typeof transcription === "string" ? transcription : transcription.text;

      return result;
    } catch (err) {
      console.error("Transcription error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to transcribe audio";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsTranscribing(false);
    }
  };

  return {
    transcribe,
    isTranscribing,
    error,
  };
}
