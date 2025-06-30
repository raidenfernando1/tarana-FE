import { supabase } from "../components/Clients/Supabase";

export async function fetchAnnouncements() {
  const { data, error } = await supabase.from("announcements").select("*");

  if (error) return { announcements: [], error };

  return { announcements: data };
}
