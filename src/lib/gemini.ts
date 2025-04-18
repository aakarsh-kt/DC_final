import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDNU13DUNGeuJS_7NFPjYJPNCF964GNz48");

export async function getGeminiResponse(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // ✅ latest stable model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini SDK Error:", error);
    return "There was an error getting a response from Gemini.";
  }
}
