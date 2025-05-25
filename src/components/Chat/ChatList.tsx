import styled from "@emotion/styled";
import { useAtomValue } from "jotai";
import { history, isLoading } from "../../store/GroqAtom";
import { AICard, UserCard } from "./ChatCard";
import { FadeLoader } from "react-spinners";

const Chat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-block: 10px;
  padding-left: 10px;
  direction: rtl;

  > * {
    direction: ltr;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
`;

export default function Chats() {
  const historyList = useAtomValue(history);
  const loading = useAtomValue(isLoading);

  return (
    <Chat>
      {historyList
        .filter((data) => data.role !== "system")
        .map((data, index) => {
          return data.role === "assistant" ? (
            <AICard key={index} message={data.content} />
          ) : (
            <UserCard userMessage={data.content} key={index} />
          );
        })}

      {loading && (
        <SpinnerContainer>
          <FadeLoader color="var(--btn-bg)" />
        </SpinnerContainer>
      )}
    </Chat>
  );
}
