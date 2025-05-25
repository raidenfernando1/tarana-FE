import styled from "@emotion/styled";
import ChatPanel from "../components/Chat/ChatPanel";
import QuestionPanel from "../components/FrequentlyAsked/QuestionPanel";

const Container = styled.main`
  height: 100dvh;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  padding: 20px;
  gap: 20px;
  justify-content: space-between;

  > :nth-child(1) {
    min-width: 70%;
  }
`;

export default function Chat() {
  return (
    <Container>
      <Wrapper>
        <ChatPanel />
        <QuestionPanel />
      </Wrapper>
    </Container>
  );
}
