const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const protect = require("../middleware/authMiddleware");

// GET ROADMAP STEPS + USER PROGRESS
router.get("/:role", protect, async (req, res) => {
  const role = req.params.role;

  const roadmap = await pool.query(
    "SELECT id FROM roadmaps WHERE role=$1",
    [role]
  );

  if (!roadmap.rows.length) return res.json([]);

  const roadmapId = roadmap.rows[0].id;

  const result = await pool.query(`
    SELECT t.id, t.step_order, t.step_title, t.step_description, t.resources,
           p.completed
    FROM roadmap_steps_template t
    LEFT JOIN user_roadmap_progress p
    ON t.id = p.step_id AND p.user_id = $1
    WHERE t.roadmap_id = $2
    ORDER BY t.step_order
  `, [req.user.id, roadmapId]);

  res.json(result.rows);
});


// MARK STEP COMPLETE
router.post("/complete", protect, async (req, res) => {
  const { step_id, completed } = req.body;

  await pool.query(`
    INSERT INTO user_roadmap_progress (user_id, step_id, completed)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, step_id)
    DO UPDATE SET completed=$3
  `, [req.user.id, step_id, completed]);

  res.json({ message: "Progress updated" });
});

module.exports = router;
