import type React from "react";
import { useEffect } from "react";
import { preloadExtractor } from "../hooks/useEmbed";
import { PopupStore, ToastAtom } from "../store/PopupAtom";

export default function Preload({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const preload = async () => {
      try {
        await preloadExtractor();
      } catch (error) {
        console.error("Model preload failed:", error);
        PopupStore.set(ToastAtom, {
          visible: true,
          message: "Failed to preload model.",
          isClosing: true,
        });
      }
    };

    preload();
  }, []);

  return <>{children}</>;
}
