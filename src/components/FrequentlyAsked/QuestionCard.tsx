import styled from "@emotion/styled";
import sendPrompt from "../../hooks/sendPrompt";

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

export default function QuestionCard({ question }: { question: string }) {
  return (
    <Container type="button" onClick={() => sendPrompt({ input: question })}>
      <p>{question}</p>
    </Container>
  );
}
