export default function RoadmapPreview({ roadmap, onSave }) {
  if (!roadmap || !roadmap.steps) {
  return <p>No roadmap generated yet...</p>;
}

  return (
    <div style={{ border: "1px solid gray", padding: 15, marginTop: 20 }}>
      <h2>{roadmap.role}</h2>
      <p>{roadmap.description}</p>

      <h3>Steps</h3>
      {roadmap.steps.map((step) => (
        <div key={step.step_order} style={{ marginBottom: 10 }}>
          <b>{step.step_order}. {step.step_title}</b>
          <p>{step.step_description}</p>

          <ul>
            {step.resources.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      ))}

      <button onClick={onSave} style={{ background: "green", color: "white", padding: 10 }}>
        ✅ Accept & Save
      </button>

      <button onClick={() => window.location.reload()} style={{ marginLeft: 10 }}>
        ❌ Reject & Regenerate
      </button>
    </div>
  );
}
