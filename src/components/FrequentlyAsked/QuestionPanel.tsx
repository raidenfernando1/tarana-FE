import styled from "@emotion/styled";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 30%;
`;

const Questions = styled.ul`
  padding-top: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: var(--gap-size);
  padding-right: var(--gap-size);
`;

export default function QuestionPanel() {
  return (
    <Container>
      <h1>Frequently Asked Questions</h1>
      <Questions></Questions>
    </Container>
  );
}
