import { GoogleGenAI, Type } from "@google/genai";
import { PeriodicElement, AIDetailData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchElementDetails = async (element: PeriodicElement): Promise<AIDetailData> => {
  try {
    const prompt = `
      You are a futuristic database AI for a high-tech scientific archive.
      Access and retrieve data for the chemical element: ${element.name} (${element.symbol}).
      
      Generate the response in JSON format with the following fields (in Simplified Chinese):
      
      1. description: A concise, technical, and sci-fi styled description of the element. Use terms like "atomic structure", "molecular density", or "energy potential". Keep it under 50 words.
      2. substance: One key real-world substance or compound that represents this element (e.g., "Diamond" for Carbon, "Microchips" for Silicon).
      3. usage: Key industrial, military, or technological applications.
      4. funFact: A surprising or obscure scientific fact.

      Tone: Cold, precise, high-tech, futuristic database entry.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING, description: "Futuristic scientific description." },
            usage: { type: Type.STRING, description: "Industrial uses." },
            substance: { type: Type.STRING, description: "Representative substance." },
            funFact: { type: Type.STRING, description: "Interesting fact." }
          },
          required: ["description", "usage", "substance", "funFact"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIDetailData;
  } catch (error) {
    console.error("Failed to fetch element details:", error);
    return {
      description: "ERROR: Database connection unstable. Unable to retrieve spectral data.",
      usage: "UNKNOWN",
      substance: "UNKNOWN",
      funFact: "System requires maintenance."
    };
  }
};