import { useEffect, useState } from "react";

export default function SkillGapAnalyzer() {
  const [missingSkills, setMissingSkills] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/skill-analytics/skill-gap", {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(data => {
        const skills = data.map(s => s.step_title);
        setMissingSkills(skills);
      })
      .catch(err => console.error("Skill Gap API Error:", err));
  }, []);

  return (
    <div style={card}>
      <h3>⚠ Skill Gap Analyzer</h3>

      {missingSkills.length === 0 ? (
        <p style={{ color: "#22c55e" }}>🎉 No skill gaps! You are on track.</p>
      ) : (
        <ul style={listStyle}>
          {missingSkills.map((skill, index) => (
            <li key={index} style={itemStyle}>
              ❌ {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const card = {
  background: "#1f2937",
  padding: "20px",
  borderRadius: "12px",
  color: "white",
  width: "100%"
};

const listStyle = {
  marginTop: "10px",
  paddingLeft: "15px"
};

const itemStyle = {
  fontSize: "16px",
  marginBottom: "5px",
  color: "#f87171"
};
