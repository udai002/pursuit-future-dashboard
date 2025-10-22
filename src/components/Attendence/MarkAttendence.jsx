import React, { useEffect, useState } from "react";
import CustomSelect from "../button/CustomSelect";
import CustomInput from '../ui/CustomInput';
import useFetchEmployees from "../../utils/useFetchEmployeesUtils";

function MarkAttendance() {
    const { data, loading, error } = useFetchEmployees();
  const [employees, setEmployees] = useState([]);
  
 useEffect(() => {
    if (data?.users) {
      const formatted = data.users.map(emp => ({
        employee: emp._id,
        empname: emp.username,
        attendance: "",
        remark: ""
      }));
      setEmployees(formatted);
    }
  }, [data]);

 
  console.log("formated data",employees.users)

  const handleChange = (id, field, value) => {
    setEmployees(prev =>
      prev.map(emp => (emp.employee === id ? { ...emp, [field]: value } : emp))
    );
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:3000/attendence/attendence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employees),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Attendance saved successfully", data);
        alert("Attendance saved successfully");
      } else {
        console.error("Error saving attendance", data);
        alert(data.message || "Error saving attendance");
      }
    } catch (err) {
      console.error("Error saving attendance", err);
      alert("Something went wrong while saving");
    }
  };

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-[#444444] text-xl font-DMSans p-1">Mark Attendance</h2>

      <div className="flex-1 overflow-y-auto max-h-[400px] max-w-[500px] scrollbar-hide">
        <div className="flex flex-col gap-4">
          {employees?.map(emp => (
            <div key={emp.employee} className="flex items-center justify-between pb-3 gap-2">
              <div className="flex flex-col text-[#444444] w-[180px] h-[31px]">
                <p>{emp.employee.slice(-5)}</p>
                <p>{emp.empname}</p>
              </div>

              <CustomSelect
                title="Attendance"
                options={[{id:"Present",label:"Present"}, {id:"Absent",label:"Absent"}]}
                onChange={e => handleChange(emp.employee, "attendance", e.target.value)}
              />

              <CustomInput
                type="text"
                title="Remark"
                value={emp.remark}
                onChange={(e) => handleChange(emp.employee, "remark", e.target.value)}
                placeholder={emp.attendance === "Absent" ? "Reason for absence" : ""}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={handleSave}
          className="bg-[#004AAD] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#003377] transition-all"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default MarkAttendance;
