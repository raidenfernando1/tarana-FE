import styled from "@emotion/styled";
import Markdown from "react-markdown";

const User = styled.div`
  font-size: 1.2rem;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: var(--bd-radius);
  background-color: var(--btn-bg);

  > h1 {
    color: var(--btn-txt);
  }
  > p {
    color: var(--btn-txt);
  }
`;

const AI = styled.div`
  all: revert;
  font-size: 1.2rem;

  > .name {
    color: var(--txt-color-sub);
  }
`;

const ResponseWrapper = styled.div`
  > * {
    all: revert;
    margin: 0 0 1em 0;
  }

  p {
    line-height: 1.5;
    color: var(--txt-color);
  }

  ul,
  ol {
    padding-left: 1.5em;
    margin: 0 0 1em 0;
  }
`;

export function AICard({ message }: { message: string }) {
  return (
    <AI>
      <h1 className="name">TALANA</h1>
      <ResponseWrapper>
        <Markdown>{message}</Markdown>
      </ResponseWrapper>
    </AI>
  );
}

export function UserCard({ userMessage }: { userMessage: string }) {
  return (
    <User>
      <h1>USER</h1>
      <p>{userMessage}</p>
    </User>
  );
}
