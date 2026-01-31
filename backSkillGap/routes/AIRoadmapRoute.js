import express from "express";
import { createRoadmap } from "../controllers/roadmapController.js";
import { saveRoadmap } from "../controllers/saveRoadmapController.js";

const router = express.Router();

// AI Generate (NO SAVE)
router.post("/generate", createRoadmap);

// Save when user approves
router.post("/save", saveRoadmap);

export default router;
