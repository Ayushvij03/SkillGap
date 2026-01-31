import { useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import SkillGapAnalyzer from "../components/SkillGapAnalyzer";
import CareerAlignmentScore from "../components/CareerAlignmentScore";
import ProjectTechStackChart from "../components/ProjectTechStackChart";
import StudyStreak from "../components/StudyStreak";

export default function SkillAnalytics() {
  const [summary, setSummary] = useState(null);
  const [skills, setSkills] = useState([]);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ================= KPI SUMMARY =================
    fetch("https://skillgap-53du.onrender.com/api/skill-analytics/skills-summary", {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(setSummary);

    // ================= RADAR DATA =================
    fetch("https://skillgap-53du.onrender.com/api/skill-analytics/skills", {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(s => ({
          skill: s.skill_name,
          progress: Number(s.progress)
        }));
        setSkills(formatted);
      });

    // ================= TIMELINE DATA =================
    fetch("https://skillgap-53du.onrender.com/api/skill-analytics/activity-timeline", {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(d => ({
          day: d.day,
          count: Number(d.count)
        }));
        setTimeline(formatted);
      });

  }, []);

  if (!summary) return <h3>Loading analytics...</h3>;

  return (
    <div style={{ padding: 20, color: "white" }}>
      <h2>📊 Skill Analytics Dashboard</h2>

      {/* ================= ROW 1 KPI CARDS + STREAK ================= */}
      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>

        <div style={card}>
          Total Skills <br />
          <b>{summary.total_skills}</b>
        </div>

        <div style={card}>
          Completed Skills <br />
          <b>{summary.completed_skills}</b>
        </div>

        <div style={card}>
          Avg Progress <br />
          <b>{summary.avg_progress}%</b>
        </div>

        {/* 🔥 Study Streak KPI Card */}
        <div style={card}>
          <StudyStreak />
        </div>

      </div>

      {/* ================= ROW 2 CHARTS ================= */}
      <div style={{ display: "flex", gap: 20 }}>

        {/* RADAR CHART */}
        <div style={chartCard}>
          <h3>🧠 Skill Strength Radar</h3>

          {skills.length === 0 ? (
            <p>No skills added yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={skills}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" stroke="white" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Tooltip />
                <Radar dataKey="progress" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* LINE CHART */}
        <div style={chartCard}>
          <h3>📈 Learning Activity Timeline</h3>

          {timeline.length === 0 ? (
            <p>No activity recorded yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={timeline}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis 
                  dataKey="day"
                  stroke="white"
                  tickFormatter={(d) => {
                    const date = new Date(d);
                    const y = date.getFullYear();
                    const m = String(date.getMonth() + 1).padStart(2, "0");
                    const day = String(date.getDate()).padStart(2, "0");
                    return `${y}-${m}-${day}`;
                  }}
                />

                <YAxis stroke="white" allowDecimals={false} />
                <Tooltip formatter={(v) => `${v} skills added`} />

                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>

      {/* ================= ROW 3 INSIGHTS ================= */}
      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>

        <div style={chartCardHalf}>
          <SkillGapAnalyzer />
        </div>

        <div style={chartCardHalf}>
          <ProjectTechStackChart />
        </div>

      </div>

      {/* ================= ROW 4 CAREER ALIGNMENT ================= */}
      <h2 style={{ textAlign: "center", marginTop: 30 }}>
        🎯 Career Readiness
      </h2>

      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20 }}>
        <div style={chartCardHero}>
          <CareerAlignmentScore />
        </div>
      </div>

    </div>
  );
}

/* ================= STYLES ================= */

// KPI Card Style
const card = {
  background: "#1f2937",
  color: "white",
  padding: "15px",
  borderRadius: "8px",
  fontSize: "16px",
  minWidth: "180px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

// Chart Card Style (Row 2)
const chartCard = {
  background: "#1f2937",
  padding: "20px",
  borderRadius: "12px",
  width: "50%"
};

// Row 3 Panels
const chartCardHalf = {
  //background: "#1f2937",
  padding: "20px",
  borderRadius: "12px",
  width: "50%"
};

// Row 4 Hero Card
const chartCardHero = {
  //background: "#1f2937",
  padding: "25px",
  borderRadius: "12px",
  width: "50%"
};
