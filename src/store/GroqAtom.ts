import { atom, createStore } from "jotai";
import { GroqTune } from "../helper/Tune";

export const GroqStore = createStore();

export const isLoading = atom<boolean>(false);

export const history = atom<Array<{ role: string; content: string }>>([
  {
    role: "system",
    content: GroqTune,
  },
]);

export const contextHistory = atom<Array<{ fetched: string }>>([
  { fetched: "" },
]);
