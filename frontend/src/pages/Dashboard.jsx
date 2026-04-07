import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import "../App.css";
import logo from "../assets/medivision_logo.png";

function Dashboard() {

  const [patientCount, setPatientCount] = useState(0);

  useEffect(() => {

    API.get("/patients")
      .then(res => {
        setPatientCount(res.data.length);
      })
      .catch(err => {
        console.error("Error fetching patients:", err);
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
            <h3 style={{color:"green"}}>Online</h3>
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
