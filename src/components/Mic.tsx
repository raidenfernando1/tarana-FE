import styled from "@emotion/styled";
import { Mic, Square } from "react-feather";
import useWhisperTranscription from "../hooks/useMic";
import { useState, useRef } from "react";
import { GreetAtom, MicrophoneAtom } from "../store/PopupAtom";
import { useAtom } from "jotai";
import { motion } from "framer-motion";
import sendPrompt from "../hooks/sendPrompt";
import { PopupStore } from "../store/PopupAtom";

export default function Microphone() {
  const { transcribe, isTranscribing, error } = useWhisperTranscription();
  const [transcribedText, setTranscribedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [micState, setMicState] = useAtom(MicrophoneAtom);

  if (!micState) return null;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });

        try {
          const text = await transcribe(audioBlob, "recording.wav");
          setTranscribedText(text);
        } catch (error) {
          console.error("Transcription failed:", error);
        }

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Set max recording time: stop after 20 seconds
      setTimeout(() => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
          setIsRecording(false);
        }
      }, 20000);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSubmit = () => {
    sendPrompt({ input: transcribedText });
    PopupStore.set(GreetAtom, false);
    setMicState(() => false);
  };

  return (
    <Container
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Popup>
        <TopCTA>
          <button onClick={() => setMicState((prev) => !prev)}>X</button>
        </TopCTA>
        <Text
          required
          readOnly
          value={transcribedText}
          placeholder={
            isRecording
              ? "Recording..."
              : isTranscribing
              ? "Transcribing..."
              : "Transcribed text will appear here"
          }
        />
        {error && <ErrorText>Error: {error}</ErrorText>}
        <Wrapper>
          <MicButton
            onClick={handleMicClick}
            isRecording={isRecording}
            disabled={isTranscribing}
          >
            {isRecording ? <Square size={24} /> : <Mic size={24} />}
          </MicButton>
          <button
            onClick={() => handleSubmit()}
            disabled={!transcribedText || isTranscribing}
          >
            SUBMIT
          </button>
        </Wrapper>
      </Popup>
    </Container>
  );
}

const TopCTA = styled.div`
  display: flex;
  margin-left: auto;

  > button {
    all: unset;
    cursor: pointer;
    color: var(--txt-color);
  }
`;

const Container = styled(motion.div)`
  z-index: 99999999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  > button {
    padding: 30px;
  }
  > button:hover {
    color: var(--txt-color);
  }
`;

const Popup = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  padding: 30px;
  border: 1px solid var(--bd-color);
  border-radius: var(--bd-radius);
`;

const Text = styled.textarea`
  width: 500px;
  height: 100px;
  background-color: transparent;
  color: var(--txt-color);
  resize: none;
  outline: none;
  padding: 10px;
`;

const MicButton = styled.button<{ isRecording: boolean }>`
  background-color: ${({ isRecording }) =>
    isRecording ? "red" : "var(--btn-bg)"};
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.9rem;
`;
