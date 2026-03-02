import { useEffect, useState } from "react";
import "./AddProject.css";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("https://skillgap-53du.onrender.com/api/projects", {
      headers: { Authorization: token }
    });
    const data = await res.json();
    setProjects(data);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await fetch("https://skillgap-53du.onrender.com/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        title,
        description,
        tech_stack: tech,
        github_link: github,
        live_link: live
      })
    });

    setTitle("");
    setDescription("");
    setTech("");
    setGithub("");
    setLive("");
    fetchProjects();
  };

  const deleteProject = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`https://skillgap-53du.onrender.com/api/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: token }
    });
    fetchProjects();
  };

  const updateProject = async () => {
    const token = localStorage.getItem("token");

    await fetch(`https://skillgap-53du.onrender.com/api/projects/${editProject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(editProject)
    });

    setEditProject(null);
    fetchProjects();
  };

  return (
    <div className="project-wrapper">
      <div className="project-container">

        {/* FORM */}
        <div className="project-form-card">
          <h2>Add New Project</h2>

          <form onSubmit={handleAddProject}>
            <input
              placeholder="Project Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Project Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />

            <input
              placeholder="Tech Stack (React, Node, PostgreSQL)"
              value={tech}
              onChange={e => setTech(e.target.value)}
              required
            />

            <input
              placeholder="GitHub Link"
              value={github}
              onChange={e => setGithub(e.target.value)}
            />

            <input
              placeholder="Live Demo Link"
              value={live}
              onChange={e => setLive(e.target.value)}
            />

            <button type="submit">Add Project</button>
          </form>
        </div>

        {/* PROJECT LIST */}
        <div className="project-list-section">
          <h2>Your Projects</h2>

          <div className="project-grid">
            {projects.map(p => (
              <div key={p.id} className="project-card">

                {editProject?.id !== p.id ? (
                  <>
                    <h3>{p.title}</h3>
                    <p className="description">{p.description}</p>

                    <div className="tech-badge">
                      {p.tech_stack}
                    </div>

                    <div className="project-links">
                      {p.github_link && (
                        <a href={p.github_link} target="_blank" rel="noreferrer">
                          GitHub
                        </a>
                      )}
                      {p.live_link && (
                        <a href={p.live_link} target="_blank" rel="noreferrer">
                          Live
                        </a>
                      )}
                    </div>

                    <div className="btn-row">
                      <button
                        className="edit"
                        onClick={() => setEditProject(p)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete"
                        onClick={() => deleteProject(p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="edit-mode">
                    <input
                      value={editProject.title}
                      onChange={e => setEditProject({ ...editProject, title: e.target.value })}
                    />
                    <textarea
                      value={editProject.description}
                      onChange={e => setEditProject({ ...editProject, description: e.target.value })}
                    />
                    <input
                      value={editProject.tech_stack}
                      onChange={e => setEditProject({ ...editProject, tech_stack: e.target.value })}
                    />
                    <input
                      value={editProject.github_link}
                      onChange={e => setEditProject({ ...editProject, github_link: e.target.value })}
                    />
                    <input
                      value={editProject.live_link}
                      onChange={e => setEditProject({ ...editProject, live_link: e.target.value })}
                    />

                    <div className="btn-row">
                      <button className="save" onClick={updateProject}>
                        Update
                      </button>
                      <button
                        className="cancel"
                        onClick={() => setEditProject(null)}
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