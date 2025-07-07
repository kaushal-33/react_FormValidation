import { useEffect, useState } from "react"
import StudentForm from "./components/StudentForm"
import DisplayStudent from "./components/displayStudent"

const App = () => {

  const [students, setStudents] = useState([])
  const [updateStudent, setUpdateStudent] = useState(null)
  useEffect(() => {
    setStudents(JSON.parse(localStorage.getItem("studentDetails")) || [])
  }, [])
  useEffect(() => {
    localStorage.setItem("studentDetails", JSON.stringify(students))
  }, [students])

  function addStudent(student) {
    setStudents([...students, student]);
  }

  function deleteStudent(id) {
    let newstudentList = students.filter((student) => {
      return student.id !== id;
    })

    setStudents(newstudentList);
  }

  function editStudent(editStudent) {
    setUpdateStudent(editStudent);
  }

  function updateExistingStudent(updatedStudent) {
    const updatedList = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedList);
    setUpdateStudent(null);
  }

  return (
    <div className="md:h-screen flex flex-col lg:flex-row py-5 px-3 gap-5">
      <StudentForm addStudent={addStudent} editStudent={updateStudent} updateStudent={updateExistingStudent} />
      <DisplayStudent studentArr={students} deleteStudent={deleteStudent} editStudent={editStudent} />
    </div>

  )
}

export default App