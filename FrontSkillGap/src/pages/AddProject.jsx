import { useEffect, useState } from "react";

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

  // GET PROJECTS
  const fetchProjects = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("https://skillgap-53du.onrender.com/api/projects", {
      headers: { Authorization: token }
    });
    const data = await res.json();
    setProjects(data);
  };

  // ADD PROJECT
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

  // DELETE PROJECT
  const deleteProject = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`https://skillgap-53du.onrender.com/api/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: token }
    });
    fetchProjects();
  };

  // UPDATE PROJECT
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
    <div style={{ padding: "20px", color: "white" }}>
      <h2>➕ Add Project</h2>

      {/* ADD PROJECT FORM */}
      <form onSubmit={handleAddProject} style={styles.form}>
        <input placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input placeholder="Tech Stack (React, Node, PostgreSQL)" value={tech} onChange={e => setTech(e.target.value)} />
        <input placeholder="GitHub Link" value={github} onChange={e => setGithub(e.target.value)} />
        <input placeholder="Live Demo Link" value={live} onChange={e => setLive(e.target.value)} />

        <button type="submit">Add Project</button>
      </form>

      {/* PROJECT LIST */}
      <h3 style={{ marginTop: "20px" }}>📂 Your Projects</h3>

      {projects.map(p => (
        <div key={p.id} style={styles.card}>

          {/* NORMAL VIEW */}
          {editProject?.id !== p.id ? (
            <>
              <h4>{p.title}</h4>
              <p>{p.description}</p>
              <p><b>Tech:</b> {p.tech_stack}</p>

              <a href={p.github_link} target="_blank">GitHub</a> |{" "}
              <a href={p.live_link} target="_blank">Live</a>

              <div style={styles.btnRow}>
                <button onClick={() => setEditProject(p)} style={styles.editBtn}>Edit</button>
                <button onClick={() => deleteProject(p.id)} style={styles.deleteBtn}>Delete</button>
              </div>
            </>
          ) : (

            /* EDIT MODE */
            <div>
              <input value={editProject.title} onChange={e => setEditProject({ ...editProject, title: e.target.value })} />
              <textarea value={editProject.description} onChange={e => setEditProject({ ...editProject, description: e.target.value })} />
              <input value={editProject.tech_stack} onChange={e => setEditProject({ ...editProject, tech_stack: e.target.value })} />
              <input value={editProject.github_link} onChange={e => setEditProject({ ...editProject, github_link: e.target.value })} />
              <input value={editProject.live_link} onChange={e => setEditProject({ ...editProject, live_link: e.target.value })} />

              <button onClick={updateProject} style={styles.saveBtn}>Update</button>
              <button onClick={() => setEditProject(null)} style={styles.cancelBtn}>Cancel</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "400px",
    background: "#111827",
    padding: "15px",
    borderRadius: "8px"
  },
  card: {
    background: "#1f2937",
    padding: "12px",
    marginTop: "12px",
    borderRadius: "6px",
    width: "420px"
  },
  btnRow: {
    marginTop: "8px"
  },
  editBtn: {
    background: "orange",
    border: "none",
    padding: "6px",
    marginRight: "5px",
    cursor: "pointer"
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px",
    cursor: "pointer"
  },
  saveBtn: {
    background: "green",
    padding: "6px",
    color: "white",
    border: "none",
    marginRight: "5px"
  },
  cancelBtn: {
    background: "gray",
    padding: "6px",
    color: "white",
    border: "none"
  }
};
