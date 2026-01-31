import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddSkill from "./pages/AddSkill";
import AddProject from "./pages/AddProject";
import SkillAnalytics from "./pages/SkillAnalytics";
import CareerRoadmap from "./pages/CareerRoadmap";
import RoadmapPage from "./pages/RoadmapPage";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Navbar />
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/skill-analytics"
          element={
            <PrivateRoute>
              <Navbar />
              <SkillAnalytics />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-skill"
          element={
            <PrivateRoute>
              <Navbar />
              <AddSkill />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-project"
          element={
            <PrivateRoute>
              <Navbar />
              <AddProject />
            </PrivateRoute>
          }
        />

        <Route
          path="/career-roadmap"
          element={
            <PrivateRoute>
              <Navbar />
              <CareerRoadmap />
            </PrivateRoute>
          }
        />

        {/* 🔥 AI GENERATED ROADMAP PAGE */}
        <Route
          path="/ai-roadmap"
          element={
            <PrivateRoute>
              <Navbar />
              <RoadmapPage />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
