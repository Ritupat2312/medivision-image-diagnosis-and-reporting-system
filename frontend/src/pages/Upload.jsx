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

      console.log(response.data);

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
      <div className="card">

        <h2>Upload X-Ray Image</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />

          <br /><br />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <br /><br />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <br /><br />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <br /><br />

          <button className="btn">
            Analyze Image
          </button>

        </form>

        {loading && (
          <div style={{ marginTop: "20px" }}>

            <p>🧠 AI analyzing X-ray... Please wait</p>

            <div
              style={{
                width: "100%",
                background: "#ddd",
                height: "20px",
                borderRadius: "10px"
              }}
            >

              <div
                style={{
                  width: `${progress}%`,
                  background: "#4CAF50",
                  height: "100%",
                  borderRadius: "10px",
                  transition: "width 0.4s"
                }}
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