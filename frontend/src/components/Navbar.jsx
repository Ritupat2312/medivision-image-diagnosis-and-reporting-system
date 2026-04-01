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

        <span>MediVision</span>

      </div>

      <div className="nav-links">

        <Link to="/">Dashboard</Link>

        <Link to="/upload">Upload</Link>

        <Link to="/patients">History</Link>

        <Link to="/admin">Admin</Link>

      </div>

    </nav>
  );
}

export default Navbar;