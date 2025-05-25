import { supabase } from "../components/Clients/Supabase";
import { getEmbedding } from "../hooks/useEmbed";
import { ToastAtom, PopupStore } from "../store/PopupAtom";

export async function requestData({ question }: { question: string }) {
  const questionEmbedding = await getEmbedding(question);

  const { data, error } = await supabase.rpc("temp_find_similar", {
    input_vector: questionEmbedding,
  });

  if (error) {
    PopupStore.set(ToastAtom, {
      visible: true,
      message: "Catch critical error! Please tell devs :(",
      isClosing: true,
    });
    return `Error: ${error.message}`;
  }

  return data;
}
