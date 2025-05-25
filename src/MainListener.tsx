import { useIdleTimer } from "react-idle-timer";
import { useSetAtom } from "jotai";
import { interactionAtom } from "./store/ListenerAtom";
import { GreetAtom } from "./store/PopupAtom";
import { useResetChat } from "./hooks/resetChat";

export default function Listener({ children }: { children: React.ReactNode }) {
  const setInteracting = useSetAtom(interactionAtom);
  const setShowGreeting = useSetAtom(GreetAtom);

  const onIdle = () => {
    setInteracting(false);
    setShowGreeting(true);
    useResetChat();
  };

  const onActive = () => {
    setInteracting(true);
  };

  useIdleTimer({
    timeout: 1000 * 30,
    onIdle,
    onActive,
    debounce: 500,
  });

  return <>{children}</>;
}
