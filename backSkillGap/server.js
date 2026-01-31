require("dotenv").config(); // MUST be first

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const AIRoadmapRoute = require("./routes/AIRoadmapRoute.js").default;


const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/roadmap", require("./routes/roadmapRoutes"));
app.use("/api/skill-analytics", require("./routes/skillAnalyticsRoutes"));
app.use("/api/generate-roadmap", AIRoadmapRoute);
app.use("/api/generate-roadmap", AIRoadmapRoute);


// Test route
app.get("/", (req, res) => {
  res.send("SkillGap Backend Running 🚀");
});

// Debug DB URL
console.log("ENV URL =", process.env.SUPABASE_DB_URL);

// Test DB connection
pool.connect()
  .then(() => console.log("✅ Supabase Connected"))
  .catch(err => console.error("❌ DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
