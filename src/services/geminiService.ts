import { GoogleGenAI } from "@google/genai";
import { FaceShape } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const getEyewearRecommendation = async (faceShape: FaceShape) => {
  if (!faceShape) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `As a luxury eyewear stylist, provide a brief, elegant recommendation for someone with a ${faceShape} face shape. Suggest frame styles (e.g., aviator, wayfarer, round) and why they complement this specific shape. Keep it under 60 words.`,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini recommendation error:", error);
    return `For your ${faceShape} face, we recommend frames that provide contrast to your natural features.`;
  }
};
