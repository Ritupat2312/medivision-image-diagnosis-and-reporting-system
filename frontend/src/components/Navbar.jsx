import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/medivision_logo.png";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="nav-logo">

        <img
          src={logo}
          alt="MediVision"
          className="nav-logo-img"
        />

        <span className="nav-title">MediVision</span>

      </div>

      <div className="nav-links">

        <Link to="/">Dashboard</Link>

        <Link to="/upload">Upload</Link>

        <Link to="/history">History</Link>

      </div>

    </nav>
  );
}

export default Navbar;