import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("https://skillgap-53du.onrender.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    alert(data.message || "Registered Successfully");
  };

  return (
  <div className="login-container">
    <div className="login-box">

      {/* Logo */}
      <div className="logo">
        <div className="logo-icon">
          <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            fill="white"
          >
            <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
          </svg>
        </div>
        <span className="logo-text">SkillGap</span>
      </div>

      <h1>Create account</h1>
      <p className="subtitle">
        Start your journey by creating an account
      </p>

      <form onSubmit={handleRegister}>

        <label>Name</label>
        <div className="input-group">
          <span className="icon">👤</span>
          <input
            type="text"
            placeholder="Your full name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <label>Email</label>
        <div className="input-group">
          <span className="icon">📧</span>
          <input
            type="email"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <label>Password</label>
        <div className="input-group">
          <span className="icon">🔒</span>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Create account →
        </button>

      </form>

      <p className="register-text">
        Already have account? <Link to="/login">Login here</Link>
      </p>

    </div>
  </div>
);
}
