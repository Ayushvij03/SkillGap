// controllers/roadmapController.js
import { generateRoadmap } from "./openai_roadmap.js";

export const createRoadmap = async (req, res) => {
  try {
    const { query } = req.body;

    const roadmapData = await generateRoadmap(query);

    // SEND AI DATA TO FRONTEND ONLY
    res.json({ roadmap: roadmapData });

  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ error: err.message });
  }
};
