import { useEffect, useState } from "react";
import "../App.css";

function PatientHistory() {

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("https://medivision-image-diagnosis-and-reporting-system.onrender.com/patients")
      .then(res => res.json())
      .then(data => setPatients(data));
  }, []);

  return (
    <div className="history-container">

      <h2>Patient History</h2>

      <div className="table-wrapper">

        <table className="history-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Confidence</th>
            </tr>
          </thead>

          <tbody>

            {patients.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>

                <td className="status-cell">
                  {p.diagnosis === "PNEUMONIA" ? (
                    <>
                      <span className="status-dot red"></span>
                      Positive
                    </>
                  ) : (
                    <>
                      <span className="status-dot green"></span>
                      Negative
                    </>
                  )}
                </td>

                <td>{p.confidence}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default PatientHistory;