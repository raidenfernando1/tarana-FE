import { isLoading, GroqStore, history } from "../store/GroqAtom";
import getHeat from "./useHeat";
import { client } from "../components/Clients/Groq";
import type { ChatCompletionAssistantMessageParam } from "groq-sdk/resources/chat.mjs";
import { requestData } from "../utils/requestData";
import { ToastAtom, PopupStore } from "../store/PopupAtom";
import { fetchAnnouncements } from "./fetchAnnouncement";

export default async function sendPrompt({ input }: { input: string }) {
  GroqStore.set(isLoading, true);

  const userMessage = { role: "user", content: input };
  const currentHistory = GroqStore.get(history);
  let updatedHistory = [...currentHistory, userMessage];
  GroqStore.set(history, updatedHistory);

  try {
    const normalizedInput = input.trim().toLowerCase();
    let systemMessage = null;

    // Handle announcement question
    if (normalizedInput === "what is the current announcement") {
      const { announcements } = await fetchAnnouncements();

      if (announcements?.length > 0) {
        const latest = announcements[0]; // or use a specific ID if needed
        systemMessage = {
          role: "system",
          content: `Current announcement: ${latest.content}`,
        };
      } else {
        systemMessage = {
          role: "system",
          content: "There are currently no announcements available.",
        };
      }
    } else {
      const isQuestion = await getHeat({ message: input });

      if (isQuestion) {
        const fetchedData = await requestData({ question: input });

        if (fetchedData.found) {
          systemMessage = {
            role: "system",
            content: fetchedData.content,
          };
        }
      }
    }

    if (systemMessage) {
      updatedHistory = [...updatedHistory, systemMessage];
      GroqStore.set(history, updatedHistory);
    }

    const response = await client.chat.completions.create({
      messages: updatedHistory as ChatCompletionAssistantMessageParam[],
      model: "gemma2-9b-it",
    });

    const assistantMessage = response?.choices?.[0]?.message?.content ?? null;

    if (!assistantMessage) {
      PopupStore.set(ToastAtom, {
        visible: true,
        message: "AI returned no response. Please try again.",
        isClosing: false,
      });
    }

    GroqStore.set(history, [
      ...updatedHistory,
      {
        role: "assistant",
        content: assistantMessage || "Error generating response. Sorry :)",
      },
    ]);
  } catch (err) {
    PopupStore.set(ToastAtom, {
      visible: true,
      message: "Catch critical error! Please tell devs :(",
      isClosing: false,
    });
  } finally {
    GroqStore.set(isLoading, false);
  }
}
