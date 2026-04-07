import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import API from "../services/api";

function Upload() {

  const navigate = useNavigate();

  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!image) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();

    formData.append("patient_name", patientName);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("image", image);

    setLoading(true);
    setProgress(0);

    let interval = setInterval(() => {

      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + 1;
      });

    }, 600);

    try {

      const response = await API.post("/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProgress(100);

      navigate("/report", {
        state: {
          ...response.data,
          image: image
        },
      });

    } catch (error) {

      console.error("Upload error:", error);
      alert("Error analyzing image");

    }

    clearInterval(interval);
    setLoading(false);
  };

  return (
    <div className="container">

      <div className="card upload-card">

        <h2>Upload X-Ray Image</h2>

        <form onSubmit={handleSubmit} className="upload-form">

          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <button className="btn">
            Analyze Image
          </button>

        </form>

        {loading && (

          <div className="progress-section">

            <p>🧠 AI analyzing X-ray... Please wait</p>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>

            </div>

            <p>{progress}%</p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Upload;