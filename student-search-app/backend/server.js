const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // Allow frontend requests
app.use(express.json());

// API to fetch student details by roll number
app.get("/api/student/:rollno", (req, res) => {
  const rollno = req.params.rollno;
  const data = JSON.parse(fs.readFileSync("../students.json", "utf8"));
  const student = data.find((s) => s.rollno === rollno);

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
