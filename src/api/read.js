import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// Some versions of the SDK accept the key directly, others expect an options object.
let genAI;
console.log(Boolean(import.meta.env.VITE_GEMINI_API_KEY))
try {
  genAI = new GoogleGenerativeAI(apiKey);
} catch (e) {
  genAI = new GoogleGenerativeAI({ apiKey });
}

export async function readLenormand(prompt, cards) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const text = `
You are a Lenormand reader.
User's question: "${prompt}"
Three cards drawn: ${cards.join(", ")}

Write a concise interpretation in Vietnamese, no more than 50 words.
Focus only on the core message.
Avoid long introductions or filler sentences. 

`;

    const result = await model.generateContent(text);

    // Different SDK versions return different shapes. Try to extract a sensible string.
    if (result == null) return "";

    // response.text may be a function or a string
    if (result.response && result.response.text) {
      try {
        const txt = typeof result.response.text === "function" ? await result.response.text() : result.response.text;
        if (typeof txt === "string" && txt.trim()) return txt.trim();
      } catch (e) {
        // continue to other fallbacks
      }
    }

    // candidates (some SDK versions)
    if (result.candidates && result.candidates.length) {
      const cand = result.candidates[0];
      if (cand.output && typeof cand.output === "string") return cand.output;
      if (cand.content && typeof cand.content === "string") return cand.content;
      if (cand.output && Array.isArray(cand.output) && cand.output[0] && cand.output[0].text) return cand.output[0].text;
    }

    // older/simple shapes
    if (typeof result === "string" && result.trim()) return result.trim();

    // fallback: stringify a small portion
    try {
      return JSON.stringify(result).slice(0, 1000);
    } catch (e) {
      return "(Cannot read response)";
    }
  } catch (err) {
    console.error("Gemini error:", err);
    return "Error reading the reading.";
  }
}
