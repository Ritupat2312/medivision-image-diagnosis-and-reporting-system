import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";
import logo from "../assets/medivision_logo.png";

function Dashboard() {

  const [patientCount, setPatientCount] = useState(0);

  useEffect(() => {

    fetch("https://medivision-image-diagnosis-and-reporting-system.onrender.com/patients")
      .then(res => res.json())
      .then(data => {
        setPatientCount(data.length);
      })
      .catch(() => {
        setPatientCount(0);
      });

  }, []);

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

        {/* Dashboard Stats */}

        <div className="dashboard-stats">

          <div className="stat-box">
            <h3>{patientCount}</h3>
            <p>Total Reports</p>
          </div>

          <div className="stat-box">
            <h3>ResNet18</h3>
            <p>AI Model</p>
          </div>

          <div className="stat-box">
            <h3>Online</h3>
            <p>System Status</p>
          </div>

        </div>

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