import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

export async function askGemini(promptText) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Free Tier Call Failed:", error);
    throw error;
  }
}
