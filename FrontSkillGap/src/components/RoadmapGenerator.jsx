import { useState } from "react";
import RoadmapPreview from "./RoadmapPreview";

export default function RoadmapGenerator() {
  const [role, setRole] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  // Generate AI (NO DB)
  async function handleGenerate() {
    if (!role) return alert("Enter a role");

    setLoading(true);

    const res = await fetch("http://localhost:5000/api/generate-roadmap/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: role }),
    });

    const data = await res.json();
    console.log("AI Response:", data);

    setRoadmap(data.roadmap);
    setLoading(false);
  }

  // Save when user approves
  async function handleSave() {
    if (!roadmap) return alert("No roadmap to save");

    const confirmSave = window.confirm("Save roadmap?");
    if (!confirmSave) return;

    await fetch("http://localhost:5000/api/generate-roadmap/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roadmap),
    });

    alert("✅ Roadmap saved!");
  }

  return (
    <div>
      <input
        placeholder="Enter role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <button onClick={handleGenerate}>
        {loading ? "Generating..." : "Generate Roadmap"}
      </button>

      {roadmap && <RoadmapPreview roadmap={roadmap} onSave={handleSave} />}
    </div>
  );
}
