import { useEffect, useState } from "react";
import API from "../services/api";

function PatientHistory() {

  const [patients, setPatients] = useState([]);

  useEffect(() => {

    API.get("/patients")
      .then(res => {
        setPatients(res.data);
      });

  }, []);

  return (
    <div className="container">
      <div className="card">

        <h2>Patient History</h2>

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Diagnosis</th>
              <th>Confidence</th>
            </tr>
          </thead>

          <tbody>

            {patients.map((p) => (

              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.diagnosis}</td>
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