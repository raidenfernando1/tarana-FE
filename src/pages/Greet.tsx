import styled from "@emotion/styled";
import { Mic, ArrowUp, Book } from "react-feather";

const Container = styled.main`
  height: 100dvh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Prompt = styled.div`
  padding: 20px;
  border: 1px solid var(--bd-color);
  border-radius: var(--bd-radius);
  min-width: 650px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  > input {
    font-size: 1.2rem;
    padding: 8px;
    background-color: transparent;
    border: none;
    outline: none;
  }
`;

const CTA = styled.div`
  display: flex;
  gap: var(--gap-size);

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > button:last-of-type {
    margin-left: auto;
  }
`;

const Introduction = styled.div`
  > p {
    color: var(--txt-color-sub);
    font-size: 0.9rem;
  }

  > h1 {
    font-size: 2rem;
  }
`;

const buttons = [
  {
    name: "Microphone",
    icon: <Mic strokeWidth={1.3} />,
  },
  {
    name: "Announcement",
    icon: <Book strokeWidth={1.3} />,
  },
  {
    name: "Submit",
    icon: <ArrowUp strokeWidth={1.3} />,
  },
];

const Greet = () => {
  return (
    <Container>
      <Wrapper>
        <Introduction>
          <h1>Hello, I'm Tarana. Ask me anything.</h1>
          <p>I am an AI information assitant regarding ICCT Colleges</p>
          <p>Please dont ask me anything inappropriate.</p>
        </Introduction>
        <Prompt>
          <input placeholder="..." />
          <CTA>
            {buttons.map((btn, index) => (
              <button key={index} aria-label={btn.name}>
                {btn.icon}
              </button>
            ))}
          </CTA>
        </Prompt>
      </Wrapper>
    </Container>
  );
};

export default Greet;
