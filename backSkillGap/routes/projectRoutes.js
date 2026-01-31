const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const protect = require("../middleware/authMiddleware");

// CREATE PROJECT
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, tech_stack, github_link, live_link } = req.body;

    const result = await pool.query(
      `INSERT INTO projects (user_id, title, description, tech_stack, github_link, live_link)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [req.user.id, title, description, tech_stack, github_link, live_link]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET PROJECTS
router.get("/", protect, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM projects WHERE user_id=$1 ORDER BY created_at DESC",
    [req.user.id]
  );
  res.json(result.rows);
});

// UPDATE PROJECT
router.put("/:id", protect, async (req, res) => {
  const { title, description, tech_stack, github_link, live_link } = req.body;
  const { id } = req.params;

  await pool.query(
    `UPDATE projects 
     SET title=$1, description=$2, tech_stack=$3, github_link=$4, live_link=$5
     WHERE id=$6 AND user_id=$7`,
    [title, description, tech_stack, github_link, live_link, id, req.user.id]
  );

  res.json({ message: "Project updated" });
});

// DELETE PROJECT
router.delete("/:id", protect, async (req, res) => {
  await pool.query(
    "DELETE FROM projects WHERE id=$1 AND user_id=$2",
    [req.params.id, req.user.id]
  );

  res.json({ message: "Project deleted" });
});

module.exports = router;
