import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/medivision_logo.png";

function Dashboard() {
  return (
    <div className="container">
      <div className="card">

        <img
          src={logo}
          alt="MediVision Logo"
          className="dashboard-logo"
        />

        <h1 className="title">MediVision</h1>

        <p className="subtitle">
          AI Powered Medical Image Diagnosis & Reporting System
        </p>

        <Link to="/upload">
          <button className="btn">
            Start X-Ray Scan
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Dashboard;