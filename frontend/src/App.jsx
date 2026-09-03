import { useEffect, useState } from "react";

import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  async function getStudents() {
    const response = await fetch("http://127.0.0.1:5000/api/students");

    const data = await response.json();

    setStudents(data);
  }

  async function deleteStudent(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) {
      return;
    }

    await fetch(`http://127.0.0.1:5000/api/students/${id}`, {
      method: "DELETE",
    });

    getStudents();
  }

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="app">
      <h1>School Management System</h1>

      <StudentForm onStudentAdded={getStudents} />

      <StudentList students={students} onDelete={deleteStudent} />
    </div>
  );
}

export default App;
