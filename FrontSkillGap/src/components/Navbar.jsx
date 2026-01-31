import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <h3 style={{ color: "white", marginRight: "20px" }}>SkillGap</h3>

        {/* Main Features */}
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/add-skill" style={styles.link}>Skill Manager</Link>
        <Link to="/add-project" style={styles.link}>Add Project</Link>
        <Link to="/career-roadmap" style={styles.link}>Career Roadmap</Link>
        <Link to="/skill-analytics" style={styles.link}>Skill Analytics</Link>

        {/* AI ROADMAP FEATURE (same style) */}
        <Link to="/ai-roadmap" style={styles.link}>AI Roadmap</Link>
      </div>

      <button onClick={handleLogout} style={styles.logoutBtn}>
        Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#111",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },
  left: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
  },
  link: {
    color: "white",
    textDecoration: "none",
    marginRight: "15px",
    fontSize: "15px",
    transition: "0.2s"
  },
  logoutBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};
