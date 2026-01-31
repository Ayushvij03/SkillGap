import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>🚀 SkillGap</h1>
      <p>Track and improve your skills professionally</p>

      <Link to="/login">
        <button>Login</button>
      </Link>

      <Link to="/register">
        <button style={{ marginLeft: "10px" }}>Register</button>
      </Link>
    </div>
  );
}
