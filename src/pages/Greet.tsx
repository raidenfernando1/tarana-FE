import styled from "@emotion/styled";
import Prompt from "../components/Prompt";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled(motion.main)`
  height: 100dvh;
  width: 100%;
  position: fixed;
  z-index: 2;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(0px);
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 50px;
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

const blurVariants = {
  hidden: {
    opacity: 0,
    backdropFilter: "blur(0px)",
  },
  visible: {
    opacity: 1,
    backdropFilter: "blur(4px)",
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: { duration: 0.5 },
  },
};

const Greet = () => {
  return (
    <AnimatePresence>
      <Container
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={blurVariants}
      >
        <Wrapper>
          <Introduction>
            <h1>Hello, I'm Tarana. Ask me anything.</h1>
            <p>I am an AI information assistant regarding ICCT Colleges</p>
            <p>Please don't ask me anything inappropriate.</p>
          </Introduction>
          <Prompt iconSize={2} variant="greeting" />
        </Wrapper>
      </Container>
    </AnimatePresence>
  );
};

export default Greet;
