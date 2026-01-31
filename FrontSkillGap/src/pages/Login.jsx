import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input 
          placeholder="Email" 
          onChange={e => setEmail(e.target.value)} 
          required
        /><br />

        <input 
          type="password" 
          placeholder="Password" 
          onChange={e => setPassword(e.target.value)} 
          required
        /><br />

        <button type="submit">Login</button>
      </form>

      <p>
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
