// src/app/api/aigenerate/route.js

import dotenv from "dotenv";
dotenv.config();

import { generateIntelligence } from "@daitanjs/intelligence";

export async function POST(request) {
  try {
    console.log("POST request received at /api/aigenerate");

    const { messages } = await request.json();

    if (!Array.isArray(messages)) {
      throw new Error('"messages" must be an array of messages.');
    }

    const responseObject = await generateIntelligence({ messages });

    console.log("AI response:", JSON.stringify(responseObject, null, 2));

    if (!responseObject || typeof responseObject !== "object") {
      throw new Error("AI response is invalid or empty.");
    }

    if (!responseObject.type || !responseObject.question) {
      throw new Error("AI response is missing required fields.");
    }

    if (!Array.isArray(responseObject.answers)) {
      responseObject.answers = [];
    }

    return new Response(JSON.stringify(responseObject), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error during AI generation:", error.message);
    console.error("Stack trace:", error.stack);

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
