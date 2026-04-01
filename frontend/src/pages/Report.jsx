import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "../App.css";

import logo from "../assets/hospital_logo.png";
import sign from "../assets/doctor_sign.png";
import stamp from "../assets/hospital_stamp.png";

function Report() {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return (
      <div className="container">
        <div className="card">
          <h2>No report data available</h2>
        </div>
      </div>
    );
  }

  const shareOnWhatsApp = () => {
    const message = `
MEDIVISION Diagnostic Center

Patient: ${data.patient_name}
Age: ${data.age}
Gender: ${data.gender}

Diagnosis: ${data.diagnosis}
Confidence: ${data.confidence}

Recommendation:
${data.recommendation}
`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const generatePDF = (download = false) => {

    const doc = new jsPDF();
    const reportId = "MEDI-" + Math.floor(Math.random() * 100000);

    const reader = new FileReader();

    reader.onload = function (event) {

      const imgData = event.target.result;

      /* ---------- HEADER ---------- */

      doc.addImage(logo, "PNG", 15, 10, 25, 15);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("MEDIVISION DIAGNOSTIC CENTER", 50, 18);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text("AI Assisted Radiology Report", 55, 25);

      doc.line(15, 35, 195, 35);

      const date = new Date().toLocaleDateString();

      doc.setFontSize(10);
      doc.text(`Report ID: ${reportId}`, 150, 20);
      doc.text(`Date: ${date}`, 150, 27);

      /* ---------- PATIENT DETAILS ---------- */

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Patient Details", 20, 50);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      doc.text(`Name: ${data.patient_name}`, 20, 60);
      doc.text(`Age: ${data.age}`, 20, 68);
      doc.text(`Gender: ${data.gender}`, 20, 76);

      doc.line(20, 85, 190, 85);

      /* ---------- AI RESULT ---------- */

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("AI Diagnosis Result", 20, 100);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      doc.text(`Diagnosis: ${data.diagnosis}`, 20, 110);
      doc.text(`Confidence: ${data.confidence}`, 20, 118);

      doc.text("Recommendation:", 20, 130);
      doc.text(data.recommendation, 20, 138);

      /* ---------- XRAY IMAGE ---------- */

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("X-Ray Scan", 20, 160);

      doc.addImage(imgData, "JPEG", 20, 165, 80, 80);

      /* ---------- STAMP ---------- */

      doc.addImage(stamp, "PNG", 120, 210, 35, 35);

      /* ---------- SIGNATURE ---------- */

      doc.addImage(sign, "PNG", 120, 245, 50, 15);
      doc.text("Authorized Radiologist", 120, 265);

      /* ---------- FOOTER ---------- */

      doc.setFontSize(10);
      doc.text(
        "This report is AI-assisted and should be verified by a certified radiologist.",
        105,
        280,
        null,
        null,
        "center"
      );

      doc.text(
        "MEDIVISION Diagnostic Center | Navi Mumbai | +91-7777577775",
        105,
        287,
        null,
        null,
        "center"
      );

      /* ---------- OUTPUT ---------- */

      if (download) {
        doc.save("MEDIVISION_AI_Report.pdf");
      } else {
        window.open(doc.output("bloburl"));
      }
    };

    reader.readAsDataURL(data.image);
  };

  return (
    <div className="container">
      <div className="card">

        <h2>AI Diagnosis Report</h2>

        {data.image && (
          <img
            src={URL.createObjectURL(data.image)}
            alt="X-ray"
            style={{ width: "300px", marginBottom: "20px" }}
          />
        )}

        <p><b>Patient Name:</b> {data.patient_name}</p>
        <p><b>Age:</b> {data.age}</p>
        <p><b>Gender:</b> {data.gender}</p>
        <p><b>Image File:</b> {data.filename}</p>

        <hr />

        <p><b>Diagnosis:</b> {data.diagnosis}</p>
        <p><b>Confidence:</b> {data.confidence}</p>
        <p><b>Recommendation:</b> {data.recommendation}</p>

        <br/>

        <button className="btn" onClick={() => generatePDF(false)}>
          View Report
        </button>

        <br/><br/>

        <button className="btn" onClick={() => generatePDF(true)}>
          Download Professional PDF
        </button>

        <br/><br/>

        <button className="btn" onClick={shareOnWhatsApp}>
          Share Report on WhatsApp
        </button>

      </div>
    </div>
  );
}

export default Report;