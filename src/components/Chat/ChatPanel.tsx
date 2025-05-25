import { Provider } from "jotai";
import { GroqStore } from "../../store/GroqAtom";
import styled from "@emotion/styled";
import Prompt from "../Prompt";
import Chats from "./ChatList";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function ChatPanel() {
  return (
    <Provider store={GroqStore}>
      <Container>
        <Chats />
        <Prompt iconSize={2} variant="chat" />
      </Container>
    </Provider>
  );
}
