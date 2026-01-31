import { useEffect, useState } from "react";

export default function AddSkill() {
  const [skill_name, setSkillName] = useState("");
  const [level, setLevel] = useState("");
  const [progress, setProgress] = useState(0);
  const [skills, setSkills] = useState([]);
  const [editSkill, setEditSkill] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  // GET SKILLS
  const fetchSkills = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/skills", {
      headers: { Authorization: token }
    });
    const data = await res.json();
    setSkills(data);
  };

  // ADD SKILL
  const handleAddSkill = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ skill_name, level, progress })
    });

    setSkillName("");
    setLevel("");
    setProgress(0);
    fetchSkills();
  };

  // DELETE SKILL
  const deleteSkill = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/skills/${id}`, {
      method: "DELETE",
      headers: { Authorization: token }
    });

    fetchSkills();
  };

  // UPDATE SKILL
  const updateSkill = async () => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/skills/${editSkill.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(editSkill)
    });

    setEditSkill(null);
    fetchSkills();
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>

      {/* ADD SKILL FORM */}
      <h2>➕ Add Skill</h2>

      <form onSubmit={handleAddSkill} style={styles.form}>
        <input
          placeholder="Skill Name"
          value={skill_name}
          onChange={(e) => setSkillName(e.target.value)}
          style={styles.input}
        />

        <select value={level} onChange={(e) => setLevel(e.target.value)} style={styles.input}>
          <option value="">Select Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <label>Progress: {progress}%</label>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
        />

        <button type="submit" style={styles.addBtn}>Add Skill</button>
      </form>

      {/* SKILL LIST */}
      <h2 style={{ marginTop: "30px" }}>📋 Your Skills</h2>

      {skills.map(skill => (
        <div key={skill.id} style={styles.card}>

          {/* NORMAL VIEW */}
          {editSkill?.id !== skill.id ? (
            <>
              <b>{skill.skill_name}</b> | {skill.level} | {skill.progress}%

              <div style={styles.btnRow}>
                <button onClick={() => setEditSkill(skill)} style={styles.editBtn}>Edit</button>
                <button onClick={() => deleteSkill(skill.id)} style={styles.deleteBtn}>Delete</button>
              </div>
            </>
          ) : (

            /* EDIT MODE */
            <div>
              <input
                value={editSkill.skill_name}
                onChange={(e) => setEditSkill({ ...editSkill, skill_name: e.target.value })}
                style={styles.input}
              />

              <select
                value={editSkill.level}
                onChange={(e) => setEditSkill({ ...editSkill, level: e.target.value })}
                style={styles.input}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

              <label>Progress: {editSkill.progress}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={editSkill.progress}
                onChange={(e) => setEditSkill({ ...editSkill, progress: e.target.value })}
              />

              <button onClick={updateSkill} style={styles.saveBtn}>Update</button>
              <button onClick={() => setEditSkill(null)} style={styles.cancelBtn}>Cancel</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  form: {
    background: "#111827",
    padding: "15px",
    borderRadius: "8px",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "none"
  },
  addBtn: {
    background: "#2563eb",
    color: "white",
    padding: "8px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  card: {
    background: "#1f2937",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "6px",
    width: "350px"
  },
  btnRow: {
    marginTop: "8px"
  },
  editBtn: {
    background: "orange",
    border: "none",
    padding: "5px",
    marginRight: "5px",
    cursor: "pointer"
  },
  deleteBtn: {
    background: "red",
    border: "none",
    padding: "5px",
    color: "white",
    cursor: "pointer"
  },
  saveBtn: {
    background: "green",
    padding: "6px",
    border: "none",
    color: "white",
    marginRight: "5px"
  },
  cancelBtn: {
    background: "gray",
    padding: "6px",
    border: "none",
    color: "white"
  }
};
