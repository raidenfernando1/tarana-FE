import { pipeline } from "@xenova/transformers";

let extractor: any = null;

export async function preloadExtractor() {
  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );
  return true;

  if (!extractor) {
    return false;
  }
}

export async function getEmbedding(text: string): Promise<number[] | null> {
  if (!extractor) {
    extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  if (!text || typeof text !== "string") return null;

  try {
    const { data } = await extractor(text, {
      pooling: "mean",
      normalize: true,
    });

    return Array.isArray(data) ? data : Array.from(data as Float32Array);
  } catch (error) {
    console.error("Embedding error:", error);
    return null;
  }
}
