import { useState } from "react";

function StudentForm({ onStudentAdded }) {
  const [form, setForm] = useState({
    name: "",
    student_class: "",
    father_name: "",
    address: "",
    mobile: "",
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:5000/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Student Added Successfully");

      setForm({
        name: "",
        student_class: "",
        father_name: "",
        address: "",
        mobile: "",
      });

      onStudentAdded();
    } else {
      alert(data.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <input
        type="text"
        name="name"
        placeholder="Student Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="student_class"
        placeholder="Class"
        value={form.student_class}
        onChange={handleChange}
      />

      <input
        type="text"
        name="father_name"
        placeholder="Father Name"
        value={form.father_name}
        onChange={handleChange}
      />

      <textarea
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      />

      <input
        type="text"
        name="mobile"
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={handleChange}
      />

      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;
