import "dotenv/config";
import { GoogleGenAI } from "@google/genai";


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export async function findAirport(message) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Given the city: ${message}, find the nearest airport and provide its name and IATA code. The response should be in the format: {"iataCode": "COD"}. If no airport is found, return an empty object {}`.trim(),
  });
  
  if (response.text === "{}"){
        return null;
  }

  const responseText = JSON.parse(response.text)

  const iataCode = responseText.iataCode;

  

  return iataCode;
}


