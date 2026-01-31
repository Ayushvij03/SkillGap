const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const protect = require("../middleware/authMiddleware");


// ✅ CREATE SKILL
router.post("/", protect, async (req, res) => {
  try {
    const { skill_name, level, progress } = req.body;

    // VALIDATE LEVEL
    const validLevels = ["Beginner", "Intermediate", "Advanced"];
    if (!validLevels.includes(level)) {
      return res.status(400).json({ message: "Invalid skill level" });
    }

    // VALIDATE PROGRESS
    if (progress < 0 || progress > 100) {
      return res.status(400).json({ message: "Progress must be between 0 and 100" });
    }

    const result = await pool.query(
      "INSERT INTO skills (user_id, skill_name, level, progress) VALUES ($1,$2,$3,$4) RETURNING *",
      [req.user.id, skill_name, level, progress]
    );

    res.json(result.rows[0]);
  } 
  catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database error" });
  }
});


// ✅ READ ALL SKILLS
router.get("/", protect, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM skills WHERE user_id=$1 ORDER BY created_at DESC",
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE SKILL
router.put("/:id", protect, async (req, res) => {
  try {
    const { skill_name, level, progress } = req.body;
    const { id } = req.params;

    await pool.query(
      "UPDATE skills SET skill_name=$1, level=$2, progress=$3 WHERE id=$4 AND user_id=$5",
      [skill_name, level, progress, id, req.user.id]
    );

    res.json({ message: "Skill Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE SKILL
router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM skills WHERE id=$1 AND user_id=$2",
      [id, req.user.id]
    );

    res.json({ message: "Skill Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
