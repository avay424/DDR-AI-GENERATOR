

import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export const generateAIReport = async (prompt) => {
  console.log("Sending prompt to Groq...");
  console.time("AI Generation");

  const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
  });

  const response =
    await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

  console.timeEnd("AI Generation");
  console.log("AI response received");

  return response
    .choices[0]
    .message.content;
};