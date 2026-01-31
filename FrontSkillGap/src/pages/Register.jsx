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
    <div>
      <h2>Register Page</h2>

      <form onSubmit={handleRegister}>
        <input placeholder="Name" onChange={e => setName(e.target.value)} />
        <br />

        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <br />

        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <br />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
