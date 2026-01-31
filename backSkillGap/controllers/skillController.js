const pool = require("../config/db");

// ADD SKILL
exports.addSkill = async (req, res) => {
  try {
    const { skill_name, level, progress } = req.body;
    const userId = req.user.id; // from JWT

    const result = await pool.query(
      "INSERT INTO skills (user_id, skill_name, level, progress) VALUES ($1,$2,$3,$4) RETURNING *",
      [userId, skill_name, level, progress]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL SKILLS
exports.getSkills = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM skills WHERE user_id=$1",
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE SKILL
exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { skill_name, level, progress } = req.body;

    const result = await pool.query(
      "UPDATE skills SET skill_name=$1, level=$2, progress=$3 WHERE id=$4 RETURNING *",
      [skill_name, level, progress, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE SKILL
exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM skills WHERE id=$1", [id]);

    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
