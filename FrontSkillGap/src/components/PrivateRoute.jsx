import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const [valid, setValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setValid(false);
      return;
    }

    fetch("https://skillgap-53du.onrender.com/api/auth/me", {
      headers: { Authorization: token }
    })
      .then(res => res.ok ? setValid(true) : setValid(false))
      .catch(() => setValid(false));
  }, []);

  if (valid === null) return <p>Loading...</p>;
  if (!valid) return <Navigate to="/login" />;

  return children;
}
