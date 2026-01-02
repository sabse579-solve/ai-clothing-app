import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/** STEP 1 — Create a SHORT image-ready prompt */
export async function createShortPrompt(prompt) {
  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
      Convert this long user prompt into a SHORT image-generation prompt (max 3 lines).
      Do NOT output markdown. No headings. No long descriptions.

      User prompt:
      ${prompt}
    `
  });

  return result.text.trim();
}

/** STEP 2 — Generate image using Gemini Image model */
export async function generateImage(shortPrompt) {
  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: [{ role: "user", parts: [{ text: shortPrompt }]}]
  });

  const image = result.response.candidates[0].content.parts.find(
    p => p.inlineData
  );

  if (!image) throw new Error("Gemini did not return an image.");

  return `data:image/png;base64,${image.inlineData.data}`;
}
