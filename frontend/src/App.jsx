import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Report from "./pages/Report";
import PatientHistory from "./pages/PatientHistory";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/report" element={<Report />} />
        <Route path="/history" element={<PatientHistory />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

    </Router>
  );
}

export default App;