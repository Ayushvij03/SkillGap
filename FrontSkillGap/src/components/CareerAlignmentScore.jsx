import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CareerAlignmentScore() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Roadmap ID = 1 (Frontend)
    fetch("http://localhost:5000/api/skill-analytics/career-alignment/1", {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(data => setScore(Number(data.alignmentScore)))
      .catch(err => console.error("Career Alignment Error:", err));
  }, []);

  return (
    <div style={card}>
      <h3>🎯 Career Alignment Score</h3>

      <div style={{ width: 180, margin: "20px auto" }}>
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            textColor: "white",
            pathColor: score > 70 ? "#22c55e" : score > 40 ? "#facc15" : "#ef4444",
            trailColor: "#374151"
          })}
        />
      </div>

      <p style={{ textAlign: "center" }}>
        {score > 70 && "🔥 You are highly aligned with this career!"}
        {score > 40 && score <= 70 && "⚠ You need to improve some skills"}
        {score <= 40 && "❌ Large skill gap detected"}
      </p>
    </div>
  );
}

const card = {
  background: "#1f2937",
  padding: "20px",
  borderRadius: "12px",
  color: "white",
  width: "100%",
  textAlign: "center"
};
