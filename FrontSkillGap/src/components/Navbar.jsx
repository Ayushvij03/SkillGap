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

        {/* Logo */}
        <div style={styles.logoContainer}>
          <div style={styles.logoBox}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
          </div>
          <span style={styles.logoText}>SkillGap</span>
        </div>

        {/* Main Features */}
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/add-skill" style={styles.link}>Skill Manager</Link>
        <Link to="/add-project" style={styles.link}>Add Project</Link>
        <Link to="/career-roadmap" style={styles.link}>Career Roadmap</Link>
        <Link to="/skill-analytics" style={styles.link}>Skill Analytics</Link>
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
    padding: "12px 30px",
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

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginRight: "25px",
    cursor: "pointer"
  },

  logoBox: {
    width: "30px",
    height: "30px",
    backgroundColor: "#f97316",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  logoText: {
    color: "white",
    fontWeight: "600",
    fontSize: "17px"
  },

  link: {
    color: "white",
    textDecoration: "none",
    marginRight: "18px",
    fontSize: "15px",
    transition: "0.2s"
  },

  logoutBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};