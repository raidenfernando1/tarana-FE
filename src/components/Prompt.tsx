import styled from "@emotion/styled";
import React, { useState } from "react";
import { Mic, ArrowUp, Book } from "react-feather";
import sendPrompt from "../hooks/sendPrompt";
import { GreetAtom, MicrophoneAtom } from "../store/PopupAtom";
import { useSetAtom, useAtom } from "jotai";

export default function Prompt({
  iconSize,
  variant,
}: {
  iconSize: number;
  variant: "greeting" | "chat";
}) {
  const [userInput, setUserInput] = useState<string>("");
  const setGreet = useSetAtom(GreetAtom);
  const [isMicrophoneActive, setMicrophoneActive] = useAtom(MicrophoneAtom);

  const buttons = [
    {
      name: "Microphone",
      icon: <Mic strokeWidth={iconSize} />,
      onClick: () => setMicrophoneActive(!isMicrophoneActive),
      type: "button" as const,
    },
    {
      name: "Announcement",
      icon: <Book strokeWidth={iconSize} />,
      onClick: () => {
        sendPrompt({ input: "What is the current announcement" });
        setGreet(false);
      },
      type: "button" as const,
    },
    {
      name: "Submit",
      icon: <ArrowUp strokeWidth={iconSize} />,
      onClick: () => {},
      type: "submit" as const,
    },
  ];

  function handlePrompt(e: React.FormEvent) {
    e.preventDefault();
    setGreet(false);
    sendPrompt({ input: userInput });
    setUserInput("");
    return;
  }

  return (
    <Container variant={variant} onSubmit={handlePrompt}>
      <Input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter question here"
      />
      <CTA>
        {buttons.map((btn, index) => {
          return (
            <button
              key={index}
              aria-label={btn.name}
              type={btn.type}
              onClick={btn.onClick}
              style={{
                opacity:
                  btn.name === "Microphone" && isMicrophoneActive ? 1 : 0.7,
              }}
            >
              {btn.icon}
            </button>
          );
        })}
      </CTA>
    </Container>
  );
}

// Your existing styled components remain the same
const Container = styled.form<{ variant: "greeting" | "chat" }>`
  padding: 20px;
  border: 1px solid var(--bd-color);
  border-radius: var(--bd-radius);
  display: flex;
  flex-direction: column;
  gap: 30px;
  min-width: ${({ variant }) => (variant === "chat" ? "100%" : "650px")};
  font-size: ${({ variant }) => (variant === "chat" ? "1.2rem" : "1rem")};
`;

const Input = styled.input`
  font-size: inherit;
  padding: 8px;
  background-color: transparent;
  border: none;
  outline: none;
`;

const CTA = styled.div`
  display: flex;
  gap: var(--gap-size);
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  > button:last-of-type {
    margin-left: auto;
  }
`;
