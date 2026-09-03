function StudentList({ students, onDelete }) {
  return (
    <div className="student-list">
      <h2>Students</h2>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Father</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>

                <td>{student.name}</td>

                <td>{student.student_class}</td>

                <td>{student.father_name}</td>

                <td>{student.address}</td>

                <td>{student.mobile}</td>

                <td>
                  <button onClick={() => onDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;
