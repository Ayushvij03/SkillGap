// services/roadmapGenerator.js
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";
import pool from "../config/db.js"
import JSON5 from "json5"; // npm i json5



dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});


// schemas/roadmapSchema.js

const roadmapStepSchema = z.object({
    step_order: z.number(),
  step_title: z.string(),
  step_description: z.string(),
  resources: z.array(z.string()),
});

const roadmapSchema = z.object({
    role: z.string(),
    description: z.string(),
    steps: z.array(roadmapStepSchema),
});


/**
 * Generate roadmap using Gemini and store in PostgreSQL
*/
export async function generateAndStoreRoadmap(roleQuery) {
    // Prompt for structured roadmap
    const prompt = `
    You are an expert AI career mentor.
    
    Generate a structured learning roadmap for the role: "${roleQuery}".
    
    Return JSON ONLY with:
    - role
    - description
    - steps array
    
    Each step must have:
    step_order (number),
    step_title,
    step_description,
    resources (array of URLs or tools)


    Schema:
{
  "role": string,
  "description": string,
  "steps": [
    {
      "step_order": number,
      "step_title": string,
      "step_description": string,
      "resources": string[]
    }
  ]
}
    
    
    NOTE: Create very small description and titles, NO LONG DESCRIPTIONS AND TITLE, keep upto 5 steps only
    USE EXACT JSON SCHEMA FORMAT PROPERPLY USE: :,[],"" WHERE EVER IT IS REQUIRED IN THE SCHEMA
    Do NOT include markdown or extra text.
    `;
    
    // Call Gemini
    const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(roadmapSchema),
    },
});

console.log(response.text)

// const roadmapData = roadmapSchema.parse(JSON.parse(response.text));
const roadmapData = roadmapSchema.parse(JSON5.parse(response.text));

console.log("✅ Gemini Roadmap:", roadmapData);

// -------------------------------
  // Insert into PostgreSQL
  // -------------------------------f
  try {
    await pool.query("BEGIN");

    // Insert into roadmaps table
    const roadmapRes = await pool.query(
      `INSERT INTO roadmaps (role, description)
       VALUES ($1, $2)
       ON CONFLICT (role) DO UPDATE SET description = EXCLUDED.description
       RETURNING id`,
      [roadmapData.role, roadmapData.description]
    );

    const roadmapId = roadmapRes.rows[0].id;

    // Insert steps
    for (const step of roadmapData.steps) {
      await pool.query(
        `INSERT INTO roadmap_steps_template
        (roadmap_id, step_order, step_title, step_description, resources)
        VALUES ($1, $2, $3, $4, $5)`,
        [
          roadmapId,
          step.step_order,
          step.step_title,
          step.step_description,
          JSON.stringify(step.resources),
        ]
      );
    }

    await pool.query("COMMIT");
    return roadmapData;
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("❌ DB Error:", err);
    throw err;
  } 
}
