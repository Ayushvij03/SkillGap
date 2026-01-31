import { useState, useEffect } from "react";

export default function CareerRoadmap() {
  const [role, setRole] = useState("");
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const savedSteps = localStorage.getItem("roadmapSteps");
    const savedRole = localStorage.getItem("roadmapRole");

    if (savedSteps) setSteps(JSON.parse(savedSteps));
    if (savedRole) setRole(savedRole);
  }, []);

  const fetchRoadmap = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/roadmap/${role}`, {
      headers: { Authorization: token }
    });

    const data = await res.json();
    setSteps(data);

    localStorage.setItem("roadmapSteps", JSON.stringify(data));
    localStorage.setItem("roadmapRole", role);
  };

  const toggleStep = async (step) => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/roadmap/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ step_id: step.id, completed: !step.completed })
    });

    fetchRoadmap();
  };

  const completed = steps.filter(s => s.completed).length;
  const progress = steps.length ? (completed / steps.length) * 100 : 0;

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>🚀 Career Roadmap</h2>

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option>Select Role</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="ai-ml">AI/ML</option>
      </select>

      <button onClick={fetchRoadmap}>Generate Roadmap</button>

      <h3>Progress: {progress.toFixed(0)}%</h3>
      <progress value={completed} max={steps.length}></progress>

      {steps.map(step => (
        <div key={step.id} style={styles.card}>
          <h4>{step.step_order}. {step.step_title}</h4>
          <p>{step.step_description}</p>
          <p>📚 {step.resources}</p>

          <input
            type="checkbox"
            checked={step.completed || false}
            onChange={() => toggleStep(step)}
          /> Completed
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    background: "#1f2937",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px"
  }
};
