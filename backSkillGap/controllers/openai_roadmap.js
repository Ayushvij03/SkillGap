// controllers/openai_roadmap.js
import OpenAI from "openai";
import dotenv from "dotenv";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ================== ZOD SCHEMA ==================

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

// ================== AI GENERATE ONLY FUNCTION ==================

export async function generateRoadmap(roleQuery) {

  const prompt = `
You are an expert AI career mentor.

Generate a structured learning roadmap for the role: "${roleQuery}".

Return ONLY JSON.

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

Rules:
- Only 5 steps
- Short titles & descriptions
- No markdown, no explanations
`;

  const response = await openai.responses.parse({
    model: "gpt-4o-mini",
    input: [
      { role: "system", content: "Return JSON only." },
      { role: "user", content: prompt },
    ],
    text: {
      format: zodTextFormat(roadmapSchema, "roadmap"),
    },
  });

  // ✅ AI JSON result
  const roadmapData = response.output_parsed;

  // ❌ DO NOT SAVE TO DATABASE HERE
  return roadmapData;
}
