import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { ToastAtom } from "../store/PopupAtom";
import { keyframes } from "@emotion/react";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

// Styled component with animations
const Container = styled.div<{ isClosing: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  top: 40px;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  padding: 12px 24px;
  background: var(--btn-bg);
  border-radius: var(--bd-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: ${(props) => (props.isClosing ? fadeOut : fadeIn)} 0.3s ease-in-out
    forwards;

  > p {
    color: var(--btn-txt);
    margin: 0;
    font-weight: 500;
  }
`;

export default function Toast({ error }: { error: string }) {
  const [toastState, setToastState] = useAtom(ToastAtom);

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      setToastState({ ...toastState, isClosing: true });
    }, 4700);

    const removeTimer = setTimeout(() => {
      setToastState({ visible: false, message: "", isClosing: false });
    }, 5000);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <Container isClosing={toastState.isClosing}>
      <p>{error}</p>
    </Container>
  );
}
