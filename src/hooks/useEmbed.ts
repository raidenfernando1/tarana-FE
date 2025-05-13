import { pipeline, env } from "@xenova/transformers";

export async function getEmbedding(text: string) {
  try {
    if (!text || typeof text !== "string") {
      throw new Error("Invalid input. Expected a non-empty string.");
    }

    const extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );

    const { data } = await extractor(text, {
      pooling: "mean",
      normalize: true,
    });

    return data;
  } catch (error) {
    console.error("Embedding error:", error);
    return null;
  }
}
