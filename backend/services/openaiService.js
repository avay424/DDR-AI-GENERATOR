// import OpenAI from "openai";
// import dotenv from "dotenv";

// dotenv.config();

// const client = new OpenAI({
//   apiKey: process.env.GROQ_API_KEY,
//   baseURL: "https://api.groq.com/openai/v1",
// });

// export const generateAIReport = async (prompt) => {
//   const response = await client.chat.completions.create({
//     model: "llama-3.3-70b-versatile",
//     messages: [
//       {
//         role: "user",
//         content: prompt,
//       },
//     ],
//   });

//   return response.choices[0].message.content;
// };

import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export const generateAIReport =
  async (prompt) => {

    const client =
      new OpenAI({
        apiKey:
          process.env.GROQ_API_KEY,
        baseURL:
          "https://api.groq.com/openai/v1"
      });

    const response =
      await client.chat.completions.create({
        model:
          "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      });

    return response
      .choices[0]
      .message.content;
  };