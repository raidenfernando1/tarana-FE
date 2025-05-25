import { atom } from "jotai";

export const interactionAtom = atom<boolean>(true);
export const errorPage = atom<boolean>(false);
export const showGreeting = atom<boolean>(true);
