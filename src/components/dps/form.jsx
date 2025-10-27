import React, { useState } from "react";
import cross from "../../assets/cross.png";
import useAuth from "../../context/AuthContext";

const DpsForm = () => {
  const [showCreate, setShowCreate] = useState(false);
  const handleOpen = () => setShowCreate(true);
  const handleClose = () => setShowCreate(false);
  const { userDetails } = useAuth();
  const token = JSON.parse(localStorage.getItem("session_token"));

  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    studentContact: "",
    studentWhatsapp: "",
    studyDepartment: "",
    yearOfStudy: "",
    domainCourse: "",
    preferredMonth: "",
    amountPitched:0,
      amountPaid:0,
      employee:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      studentName: "",
      studentEmail: "",
      studentContact: "",
      studentWhatsapp: "",
      studyDepartment: "",
      yearOfStudy: "",
      domainCourse: "",
      preferredMonth: "",
      amountPitched:0,
      amountPaid:0,
      employee:""

    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      studentName: formData.studentName,
      studentEmail: formData.studentEmail,
      studentContactNo: formData.studentContact,
      studentWhatsAppNo: formData.studentWhatsapp,
      studyDepartment: formData.studyDepartment,
      yearOfStudy: formData.yearOfStudy,
      domainCourseOpted: formData.domainCourse,
      preferredProgramMonth: formData.preferredMonth, 
      amountPitched:formData.amountPitched,
      amountPaid:formData.amountPaid,
      employee:userDetails._id
    };

    try {
      const response = await fetch("http://localhost:3000/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Form submitted successfully!");
        handleReset();
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white text-xl rounded-xl ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Fill DPS Data</h2>
        {/* <button onClick={handleClose}>
          <img src={cross} alt="Close" className="w-8 h-8 cursor-pointer hover:opacity-80"/>
        </button> */}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <input type="text" name="studentName" placeholder="Student Name" value={formData.studentName} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700" />
          <input type="email" name="studentEmail" placeholder="Student Email ID" value={formData.studentEmail} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="tel" name="studentContact" placeholder="Student Contact Number" value={formData.studentContact} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700"/>
          <input type="tel" name="studentWhatsapp" placeholder="Student WhatsApp Number" value={formData.studentWhatsapp} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" name="studyDepartment" placeholder="Study Department" value={formData.studyDepartment} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700"/>
          <select name="yearOfStudy"  value={formData.yearOfStudy}  onChange={handleChange} className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700 ${formData.yearOfStudy === "" ? "text-blue-900" : "text-gray-700"}`}>
            <option value="" disabled>Year of Study</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select name="domainCourse"  value={formData.domainCourse} onChange={handleChange} className={`w-full p-2 placeholder-blue-900 border-blue-700 border rounded-lg focus:ring focus:ring-blue-200 ${formData.domainCourse === "" ? "text-blue-900" : "text-gray-700"}`}>
            <option value="" disabled>Domain/Course Opted</option>
            <option value="cs">Computer Science</option>
            <option value="it">Information Technology</option>
            <option value="ece">Electronics</option>
            <option value="mech">Mechanical</option>
          </select>
          <select name="preferredMonth" value={formData.preferredMonth} onChange={handleChange} className={`w-full p-2 border-blue-700 border rounded-lg focus:ring focus:ring-blue-200 ${formData.preferredMonth === "" ? "text-blue-900" : "text-gray-700"}`}>
            <option value="">Preferred Program Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="number" name="amountPitched" placeholder="Amount Pitched" value={formData.amountPitched} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700"/>
          <input type="number" name="amountPaid" placeholder="Amount Paid" value={formData.amountPaid} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 border-blue-700"/>
        </div>
        <div className="flex justify-between pt-4">
          <button type="button" onClick={handleReset} className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">Reset Form</button>
          <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">Add</button>
        </div>
      </form>
    </div>
  );
};

export default DpsForm;
