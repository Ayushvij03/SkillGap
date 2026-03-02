import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://skillgap-53du.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ Store token with Bearer
      localStorage.setItem("token", `Bearer ${data.token}`);

      alert("Login Successful");
      navigate("/dashboard");

    } catch (error) {
      console.error("Login Error:", error);
      alert("Server not responding");
    }
  };

  return (
  <div className="login-container">
    <div className="login-box">

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
        <span>SkillGap</span>
      </div>

      <h1>Welcome back</h1>
      <p className="subtitle">
        Enter your credentials to access your account
      </p>

      <form onSubmit={handleLogin}>

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
          Sign in →
        </button>

      </form>

      <p className="register-text">
        New user? <Link to="/register">Register here</Link>
      </p>

    </div>
  </div>
);
}
