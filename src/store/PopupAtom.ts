import { atom } from "jotai";
import { createStore } from "jotai";

export const PopupStore = createStore();

export const GreetAtom = atom<boolean>(true);
export const MicrophoneAtom = atom<boolean>(false);

export const ToastAtom = atom<{
  visible: boolean;
  message: string;
  isClosing: boolean;
}>({
  visible: false,
  message: "",
  isClosing: false,
});

export function showToast(message: string, store: any) {
  store.set(ToastAtom, {
    visible: true,
    message,
    isClosing: false,
  });
}
