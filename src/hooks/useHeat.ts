import fuzzysort from "fuzzysort";

const HeatWords = [
  "who",
  "how",
  "when",
  "what",
  "where",
  "why",
  "which",
  "tell",
  "explain",
  "define",
  "describe",
  "difference",
  "between",
  "information",
  "about",
  "details",
  "example",
];

function getHeat({ message }: { message: string }): boolean {
  if (!message) return false;

  const words = message.toLowerCase().split(/\s+/);

  for (const word of words) {
    if (HeatWords.includes(word)) return true;

    if (word.length > 3) {
      const results = fuzzysort.go(word, HeatWords);

      if (results.length > 0) {
        if (results[0].score && results[0].score > -100) {
          return true;
        }
      }
    }
  }
  return false;
}

export default getHeat;
