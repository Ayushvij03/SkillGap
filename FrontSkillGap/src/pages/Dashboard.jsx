import { Layers, FolderPlus, Map, BarChart3, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const features = [
  {
    to: "/add-skill",
    icon: Layers,
    title: "Skill Manager",
    description: "Add, update, and manage your skills efficiently.",
  },
  {
    to: "/add-project",
    icon: FolderPlus,
    title: "Add Project",
    description: "Showcase your projects and track experience growth.",
  },
  {
    to: "/career-roadmap",
    icon: Map,
    title: "Career Roadmap",
    description: "Generate structured learning paths toward your dream role.",
  },
  {
    to: "/skill-analytics",
    icon: BarChart3,
    title: "Skill Analytics",
    description: "Visualize your strengths and identify skill gaps.",
  },
  {
    to: "/ai-roadmap",
    icon: Bot,
    title: "AI Roadmap",
    description: "Get AI-powered recommendations tailored to your profile.",
  },
];

export default function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">

      {/* HERO */}
      <div className="dashboard-hero">
        <h1>Welcome back 👋</h1>
        <p>
          Analyze your skills, identify gaps, and generate personalized career
          roadmaps powered by AI.
        </p>
      </div>

      {/* SECTION */}
      <div className="dashboard-section">
        <h2>What You Can Do</h2>
        <p>
          Track skills, analyze strengths, manage projects, and generate AI-powered roadmaps.
        </p>
      </div>

      {/* GRID */}
      <div className="dashboard-grid">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <Link
              key={index}
              to={feature.to}
              className={`dashboard-card ${feature.highlight ? "highlight" : ""}`}
            >
              <div className="card-icon">
                <Icon size={20} />
              </div>

              <h3>{feature.title}</h3>
              <p>{feature.description}</p>

              <span className="card-link">
                Get started →
              </span>
            </Link>
          );
        })}
      </div>

    </div>
      </div>
  );
}