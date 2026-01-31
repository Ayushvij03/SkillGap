const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const protect = require("../middleware/authMiddleware");


// ===============================
// 📊 SKILL PROGRESS OVERVIEW
// ===============================
router.get("/skills-summary", protect, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) AS total_skills,
        COUNT(*) FILTER (WHERE progress = 100) AS completed_skills,
        ROUND(AVG(progress),2) AS avg_progress
      FROM skills
      WHERE user_id = $1
    `, [req.user.id]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("skills-summary error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ===============================
// 📈 LEARNING ACTIVITY TIMELINE
// ===============================
router.get("/activity-timeline", protect, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        TO_CHAR(created_at::date, 'YYYY-MM-DD') AS day,
        COUNT(*)::int AS count
      FROM skills
      WHERE user_id = $1
      GROUP BY created_at::date
      ORDER BY created_at::date
    `, [req.user.id]);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ===============================
// ❌ SKILL GAP ANALYZER
// ===============================
router.get("/skill-gap", protect, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.step_title
      FROM roadmap_steps_template t
      LEFT JOIN skills s 
        ON LOWER(s.skill_name) = LOWER(t.step_title)
        AND s.user_id = $1
      WHERE s.skill_name IS NULL
    `, [req.user.id]);

    res.json(result.rows);
  } catch (err) {
    console.error("skill-gap error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ===============================
// 📦 PROJECT PORTFOLIO ANALYTICS
// ===============================
router.get("/projects-summary", protect, async (req, res) => {
  try {
    const totalProjects = await pool.query(
      "SELECT COUNT(*) FROM projects WHERE user_id=$1",
      [req.user.id]
    );

    const techStack = await pool.query(`
      SELECT tech_stack, COUNT(*) 
      FROM projects 
      WHERE user_id=$1
      GROUP BY tech_stack
    `, [req.user.id]);

    res.json({
      totalProjects: totalProjects.rows[0].count,
      techStack: techStack.rows
    });
  } catch (err) {
    console.error("projects-summary error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ===============================
// 🎯 CAREER ALIGNMENT SCORE
// ===============================
router.get("/career-alignment/:roadmapId", protect, async (req, res) => {
  try {
    const roadmapId = req.params.roadmapId;

    const totalSteps = await pool.query(
      "SELECT COUNT(*) FROM roadmap_steps_template WHERE roadmap_id=$1",
      [roadmapId]
    );

    const matchedSkills = await pool.query(`
      SELECT COUNT(*) 
      FROM skills s
      JOIN roadmap_steps_template t 
        ON LOWER(s.skill_name) = LOWER(t.step_title)
      WHERE s.user_id=$1 AND t.roadmap_id=$2
    `, [req.user.id, roadmapId]);

    const total = parseInt(totalSteps.rows[0].count);
    const matched = parseInt(matchedSkills.rows[0].count);
    const score = total === 0 ? 0 : ((matched / total) * 100).toFixed(2);

    res.json({ roadmapId, alignmentScore: score });
  } catch (err) {
    console.error("career-alignment error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ===============================
// 🔥 STUDY STREAK TRACKER
// ===============================
router.get("/streak", protect, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT DATE(created_at) AS day
      FROM skills
      WHERE user_id=$1
      ORDER BY day DESC
    `, [req.user.id]);

    const days = result.rows.map(r => new Date(r.day));
    let streak = 0;
    let current = new Date();

    for (let day of days) {
      const diff = (current - day) / (1000 * 60 * 60 * 24);
      if (diff < 1.5) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else break;
    }

    res.json({ streak });
  } catch (err) {
    console.error("streak error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ===============================
// 🧠 SKILL LIST FOR RADAR CHART
// ===============================
router.get("/skills", protect, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT skill_name, progress FROM skills WHERE user_id=$1",
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("skills radar error:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
