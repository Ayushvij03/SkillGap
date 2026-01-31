import { useEffect, useState } from "react";

export default function StudyStreak() {
  const [streak, setStreak] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://skillgap-53du.onrender.com/api/skill-analytics/streak", {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(data => {
        setStreak(data.streak);
        setLoading(false);
      })
      .catch(err => {
        console.error("Streak API Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>🔥 Loading streak...</p>;

  return (
    <div style={card}>
      <h3>🔥 Study Streak</h3>

      <div style={streakCircle}>
        <span style={streakText}>{streak}</span>
        <p style={{ fontSize: "14px" }}>Days</p>
      </div>

      {streak === 0 && <p style={{ color: "red" }}>❌ Start learning today!</p>}
      {streak > 0 && streak < 7 && <p style={{ color: "orange" }}>⚠ Keep going!</p>}
      {streak >= 7 && <p style={{ color: "lightgreen" }}>🏆 Amazing consistency!</p>}
    </div>
  );
}
const card = {
  //background: "#1f2937",
  padding: "20px",
  borderRadius: "12px",
  color: "white",
  textAlign: "center",
  width: "100%"
};

const streakCircle = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #f97316, #ef4444)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "15px auto"
};

const streakText = {
  fontSize: "32px",
  fontWeight: "bold"
};
