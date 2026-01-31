import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#facc15", "#ef4444", "#8b5cf6", "#14b8a6"];

export default function ProjectTechStackChart() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/skill-analytics/projects-summary", {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(res => {
        const formatted = res.techStack.map(t => ({
          name: t.tech_stack,
          value: Number(t.count)
        }));
        setData(formatted);
        setTotal(Number(res.totalProjects));
      })
      .catch(err => console.error("Tech Stack API Error:", err));
  }, []);

  return (
    <div style={card}>
      <h3>📦 Project Tech Stack Analytics</h3>
      <p>Total Projects: {total}</p>

      {data.length === 0 ? (
        <p>No projects added yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
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
