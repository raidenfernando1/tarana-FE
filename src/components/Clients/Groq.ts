import Groq from "groq-sdk";

export const client = new Groq({
  apiKey: import.meta.env.VITE_GROQ_SECRET_KEY,
  dangerouslyAllowBrowser: true,
});
