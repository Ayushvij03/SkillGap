import { useEffect, useState } from "react";
import "./AddSkill.css";

export default function AddSkill() {
  const [skill_name, setSkillName] = useState("");
  const [level, setLevel] = useState("");
  const [progress, setProgress] = useState(0);
  const [skills, setSkills] = useState([]);
  const [editSkill, setEditSkill] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("https://skillgap-53du.onrender.com/api/skills", {
      headers: { Authorization: token }
    });
    const data = await res.json();
    setSkills(data);
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await fetch("https://skillgap-53du.onrender.com/api/skills", {
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

  const deleteSkill = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`https://skillgap-53du.onrender.com/api/skills/${id}`, {
      method: "DELETE",
      headers: { Authorization: token }
    });

    fetchSkills();
  };

  const updateSkill = async () => {
    const token = localStorage.getItem("token");

    await fetch(`https://skillgap-53du.onrender.com/api/skills/${editSkill.id}`, {
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
    <div className="addskill-wrapper">

      <div className="addskill-container">

        {/* FORM CARD */}
        <div className="form-card">
          <h2>Add New Skill</h2>

          <form onSubmit={handleAddSkill}>

            <input
              placeholder="Skill Name"
              value={skill_name}
              onChange={(e) => setSkillName(e.target.value)}
              required
            />

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
            >
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

            <button type="submit">Add Skill</button>

          </form>
        </div>

        {/* SKILLS LIST */}
        <div className="skills-section">
          <h2>Your Skills</h2>

          <div className="skills-grid">
            {skills.map(skill => (
              <div key={skill.id} className="skill-card">

                {editSkill?.id !== skill.id ? (
                  <>
                    <div className="skill-header">
                      <h3>{skill.skill_name}</h3>
                      <span className="level">{skill.level}</span>
                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>

                    <div className="progress-text">
                      {skill.progress}%
                    </div>

                    <div className="btn-row">
                      <button
                        className="edit"
                        onClick={() => setEditSkill(skill)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete"
                        onClick={() => deleteSkill(skill.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="edit-mode">
                    <input
                      value={editSkill.skill_name}
                      onChange={(e) =>
                        setEditSkill({ ...editSkill, skill_name: e.target.value })
                      }
                    />

                    <select
                      value={editSkill.level}
                      onChange={(e) =>
                        setEditSkill({ ...editSkill, level: e.target.value })
                      }
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editSkill.progress}
                      onChange={(e) =>
                        setEditSkill({ ...editSkill, progress: e.target.value })
                      }
                    />

                    <div className="btn-row">
                      <button className="save" onClick={updateSkill}>
                        Update
                      </button>

                      <button
                        className="cancel"
                        onClick={() => setEditSkill(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}