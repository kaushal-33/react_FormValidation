import { useEffect, useState } from "react"
import { requestFormReset } from "react-dom";

const StudentForm = ({ addStudent, editStudent, updateStudent }) => {

    const [studentInput, setStudentInput] = useState({
        name: "", course: "", contact: "", password: "", cPassword: "", gender: ""
    });

    const [error, setError] = useState({});

    useEffect(() => {
        if (editStudent) {
            setStudentInput(editStudent);
        }
    }, [editStudent])

    function handleChange(e) {
        setStudentInput({ ...studentInput, [e.target.id]: e.target.value, })
        setError({ ...error, [e.target.id]: "" })
    }

    function handleSubmit(e) {
        e.preventDefault();

        let objError = {};

        if (studentInput.name.trim() === "") objError.name = "Please enter your name...";
        if (studentInput.gender === "") objError.gender = "Please select your gender...";
        if (!/^\d{10}$/.test(studentInput.contact)) objError.contact = "Please enter valid number...";
        if (studentInput.password.trim().length < 8) objError.password = "Password must be greater than 7 characters...";
        if (studentInput.course === "") objError.course = "please select course...";
        if (studentInput.password !== studentInput.cPassword) objError.cPassword = "Passwords do not match...";

        setError(objError);

        if (Object.keys(objError).length > 0) return;

        if (editStudent) {
            updateStudent(studentInput);
        } else {
            addStudent({ ...studentInput, id: Date.now() });
        }

        setStudentInput({ name: "", course: "", contact: "", password: "", cPassword: "", gender: "" });
    }

    return (
        <div className="w-full lg:w-4/12 p-5 bg-[#463aca] rounded-xl flex flex-col justify-between">
            <h1 className="text-5xl font-bold capitalize text-white">Admin student management</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="my-5">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2 cursor-pointer" htmlFor="name">
                        Name
                    </label>
                    <input className="w-full border-b text-white py-2 px-4 mb-3 outline-none focus:border-0 focus:bg-[#e8f0fe] focus:text-black  bg-transparent shadow-xl" id="name" type="text" placeholder="John Doe" onChange={handleChange}
                        value={studentInput.name} name="name" />
                    {
                        error.name && <p className="text-red-500 text-xs italic">{error.name}</p>
                    }
                </div>
                {/* gender */}
                <div className="flex flex-col sm:flex-row justify-evenly my-5 py-2  space-y-2 sm:space-y-0">
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="gender" value="male" checked={studentInput.gender == "male"} className="accent-[#463aca] w-4 h-4" onChange={(e) => {
                            setStudentInput({ ...studentInput, [e.target.name]: e.target.value })
                        }} />
                        <span className="text-white">Male</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="gender" value="female" checked={studentInput.gender == "female"} className="accent-[#463aca] w-4 h-4" onChange={(e) => {
                            setStudentInput({ ...studentInput, [e.target.name]: e.target.value })
                        }} />
                        <span className="text-white">Female</span>
                    </label>
                </div>
                {
                    error.gender && <p className="text-red-500 text-xs italic">{error.gender}</p>
                }
                {/* course */}
                <div className="mt-14 mb-8">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2 cursor-pointer" htmlFor="course">
                        course
                    </label>
                    <select name="course" className="capitalize w-full border-0 py-2 px-4 focus:bg-[#e8f0fe] focus:text-black bg-transparent  shadow-xl border-b focus:border-0 text-white" id="course" onChange={handleChange} value={studentInput.course}>
                        <option value="">select course</option>
                        <option value="1">full-stack developer</option>
                        <option value="2">UI/UX graphic design</option>
                        <option value="3">AI/ML data science</option>
                        <option value="4">animation</option>
                    </select>
                    {error.course && <p className="text-red-500 text-xs italic">{error.course}</p>}
                </div>
                {/* contact */}
                <div className="mt-8">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2 cursor-pointer" htmlFor="contact">
                        CONTACT
                    </label>
                    <input className="w-full border-b text-white py-2 px-4 mb-3 outline-none focus:border-0 focus:bg-[#e8f0fe] focus:text-black  bg-transparent shadow-xl" id="contact" type="number" placeholder="0123456789" onChange={handleChange}
                        value={studentInput.contact} name="contact" />
                    {
                        error.contact && <p className="text-red-500 text-xs italic">{error.contact}</p>
                    }
                </div>
                {/* password */}
                <div className="mt-14">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2 cursor-pointer" htmlFor="password">
                        password
                    </label>
                    <input className="w-full border-b text-white py-2 px-4 mb-3 outline-none focus:border-0 focus:bg-[#e8f0fe] focus:text-black  bg-transparent shadow-xl" id="password" type="password" placeholder="* * * * * * * *" onChange={handleChange}
                        value={studentInput.password} name="password" />
                    {
                        error.password && <p className="text-red-500 text-xs italic mb-3">{error.password}</p>
                    }
                </div>
                {/* confirm password */}
                <div className="">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2 cursor-pointer" htmlFor="cPassword">
                        confirm password
                    </label>
                    <input className="w-full border-b text-white py-2 px-4 mb-3 outline-none focus:border-0 focus:bg-[#e8f0fe] focus:text-black  bg-transparent shadow-xl" id="cPassword" type="password" placeholder="* * * * * * * *" onChange={handleChange}
                        value={studentInput.cPassword} />
                    {
                        error.cPassword && <p className="text-red-500 text-xs italic mb-5">{error.cPassword}</p>
                    }
                </div>
                <button className="capitalize bg-white px-8 py-3 rounded-full">
                    {editStudent ? "update" : "submit"}
                </button>
            </form>
        </div>
    )
}

export default StudentForm