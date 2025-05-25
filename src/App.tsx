import styled from "@emotion/styled";
import Greet from "./pages/Greet";
import { GreetAtom, ToastAtom, MicrophoneAtom } from "./store/PopupAtom";
import { useAtom } from "jotai";
import Chat from "./pages/Chat";
import Toast from "./components/Toast";
import Listener from "./MainListener";
import Preload from "./preload/Preload";
import Microphone from "./components/Mic";

const Main = {
  Container: styled.main`
    height: 100dvh;
    color: var(--txt-color);
    background-color: var(--bg-color);
  `,
};

const App = () => {
  const [showGreet] = useAtom(GreetAtom);
  const [micState] = useAtom(MicrophoneAtom);
  const [toastData] = useAtom(ToastAtom);

  return (
    <Preload>
      <Listener>
        {micState ? <Microphone /> : ""}
        {toastData.visible && <Toast error={toastData.message} />}
        <Main.Container>{showGreet ? <Greet /> : <Chat />}</Main.Container>
      </Listener>
    </Preload>
  );
};

export default App;
