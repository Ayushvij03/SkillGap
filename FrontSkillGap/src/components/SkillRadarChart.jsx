import { useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from "recharts";

export default function SkillRadarChart() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

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
      })
      .catch(err => console.error("Radar API Error:", err));
  }, []);

  if (skills.length === 0) {
    return <p style={{ color: "white" }}>No skills added yet</p>;
  }

  return (
    <div style={cardStyle}>
      <h3 style={{ marginBottom: 10 }}>🧠 Skill Strength Radar</h3>

      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={skills}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" stroke="white" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Tooltip />

          <Radar
            name="Skill Level"
            dataKey="progress"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

const cardStyle = {
  background: "#1f2937",
  padding: "20px",
  borderRadius: "12px",
  color: "white",
  width: "100%"
};
