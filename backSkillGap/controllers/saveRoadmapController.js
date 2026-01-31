// controllers/saveRoadmapController.js
import pool from "../config/db.js";

export const saveRoadmap = async (req, res) => {
  const roadmapData = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO roadmaps (role, description)
       VALUES ($1,$2) RETURNING id`,
      [roadmapData.role, roadmapData.description]
    );

    const roadmapId = result.rows[0].id;

    for (const step of roadmapData.steps) {
      await client.query(
        `INSERT INTO roadmap_steps_template
         (roadmap_id, step_order, step_title, step_description, resources)
         VALUES ($1,$2,$3,$4,$5)`,
        [
          roadmapId,
          step.step_order,
          step.step_title,
          step.step_description,
          JSON.stringify(step.resources),
        ]
      );
    }

    await client.query("COMMIT");
    res.json({ message: "Roadmap saved successfully" });

  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};
