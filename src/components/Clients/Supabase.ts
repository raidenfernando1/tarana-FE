import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://bazzqsorgnmduzncoccb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhenpxc29yZ25tZHV6bmNvY2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4OTIxMzAsImV4cCI6MjA1NTQ2ODEzMH0.pfEYmcUimVdaBKqJI3PaTC0XdXmVZ7ei4lcJfuCxviY"
);
