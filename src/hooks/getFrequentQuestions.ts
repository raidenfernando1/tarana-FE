import { supabase } from "../components/Clients/Supabase";

export default async function fetchFrequentQuestions() {
  let { data: ai_data, error } = await supabase
    .from("ai_data")
    .select("question")
    .eq("main", true);

  if (error) {
    console.error(error);
    return null;
  }

  return ai_data;
}
