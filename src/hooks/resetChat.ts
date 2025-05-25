import { history } from "../store/GroqAtom";
import { GroqTune } from "../helper/Tune";
import { GroqStore } from "../store/GroqAtom";

export function useResetChat() {
  GroqStore.set(history, [
    {
      role: "system",
      content: GroqTune,
    },
  ]);
}
