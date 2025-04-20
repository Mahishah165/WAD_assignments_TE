import React, { useState } from "react";
import axios from "axios";
import "./App.css";  // Import the CSS file

function App() {
  const [rollno, setRollno] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`/api/student/${rollno}`);
      setStudent(response.data);
      setError("");
    } catch (err) {
      setStudent(null);
      setError("Student not found");
    }
  };

  return (
    <div className="container">
      <h2>Search Student by Roll Number</h2>
      <div className="input-container">
        <input
          type="text"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
          placeholder="Enter Roll Number"
        />
        <button onClick={fetchStudent}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {student && (
        <div className="student-info">
          <h3>Student Details</h3>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Age:</strong> {student.age}</p>
          <p><strong>Department:</strong> {student.department}</p>
        </div>
      )}
    </div>
  );
}

export default App;
