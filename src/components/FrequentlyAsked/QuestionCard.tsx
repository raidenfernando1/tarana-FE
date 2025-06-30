import styled from "@emotion/styled";
import sendPrompt from "../../hooks/sendPrompt";
import debounce from "lodash/debounce";
import { useCallback } from "react";

const Container = styled.button`
  all: unset;
  cursor: pointer;
  padding: 10px;
  border: 1px solid var(--bd-color);
  border-radius: var(--bd-radius);

  > p {
    font-size: 1.1rem;
  }
`;

const debouncedSend = debounce((question: string) => {
  sendPrompt({ input: question });
}, 1000);

export default function QuestionCard({ question }: { question: string }) {
  const handleClick = useCallback(() => {
    debouncedSend(question);
  }, [question]);

  return (
    <Container type="button" onClick={handleClick}>
      <p>{question}</p>
    </Container>
  );
}
