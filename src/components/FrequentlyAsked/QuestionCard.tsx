import styled from "@emotion/styled";

const Container = styled.div`
  padding: 10px;
  border: 1px solid var(--bd-color);
  border-radius: var(--bd-radius);

  > p {
    font-size: 1.1rem;
  }
`;

export default function QuestionCard({ question }: { question: string }) {
  return (
    <Container>
      <p>{question}</p>
    </Container>
  );
}
