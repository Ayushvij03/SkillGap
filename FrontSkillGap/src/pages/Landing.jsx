import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing-container">

      <div className="landing-content">

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

        {/* Hero Text */}
        <h1 className="landing-title">
          Track. Improve. Succeed.
        </h1>

        <p className="landing-subtitle">
          Identify your strengths, close your skill gaps, and build a smarter career path.
        </p>

        {/* Buttons */}
        <div className="landing-buttons">
          <Link to="/login">
            <button className="primary-btn">Login</button>
          </Link>

          <Link to="/register">
            <button className="secondary-btn">Register</button>
          </Link>
        </div>

      </div>
    </div>
  );
}