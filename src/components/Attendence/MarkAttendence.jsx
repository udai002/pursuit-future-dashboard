import React, { useEffect, useState } from "react";
import CustomSelect from "../button/CustomSelect";
import CustomInput from "../ui/CustomInput";
import useFetchEmployees from "../../utils/useFetchEmployeesUtils";

function MarkAttendance() {
  const { data, loading, message } = useFetchEmployees();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (data?.users && data.users.length > 0) {
      console.log("Fetched employees data:", data);

      const formatted = data.users.map((emp) => ({
        employeeId: emp.employeeId,
        employee: emp._id,
        empname: emp.username,
        attendance: "Present",
        remark: "No",
      }));

      setEmployees(formatted);
    }
  }, [data]);

  const handleChange = (id, field, value) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.employee === id ? { ...emp, [field]: value } : emp
      )
    );
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:3000/attendence/attendence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employees),
      });

      const result = await res.json();

      if (res.ok) {
        console.log("Attendance saved successfully", result);
        alert("Attendance saved successfully!");

        // Reset remarks only, keep attendance default as "Present"
        setEmployees((prev) =>
          prev.map((emp) => ({
            ...emp,
            attendance: "Present",
            remark: "No",
          }))
        );
      } else {
        console.error("Error saving attendance", result);
        alert(result.message || "Error saving attendance");
      }
    } catch (err) {
      console.error("Error saving attendance:", err);
      alert("Something went wrong while saving attendance");
    }
  };

  if (loading) return <p>Loading employees...</p>;
  if (message) return <p>{message}</p>;

  return (
    <div>
      <h2 className="text-[#444444] text-xl font-DMSans p-1">
        Mark Attendance
      </h2>

      <div className="flex-1 overflow-y-auto max-h-[400px] max-w-[500px] scrollbar-hide">
        <div className="flex flex-col gap-4">
          {employees.map((emp) => (
            <div
              key={emp.employee}
              className="flex items-center justify-between pb-3 gap-2"
            >
              <div className="flex flex-col text-[#444444] w-[180px] h-[31px]">
                <p>{emp.employeeId}</p>
                <p>{emp.empname}</p>
              </div>

              <CustomSelect
                title="Attendance"
                options={[
                  { id: "Present", label: "Present" },
                  { id: "Absent", label: "Absent" },
                  { id: "Leave", label: "Leave" },
                ]}
                value={emp.attendance}
                onChange={(e) =>
                  handleChange(emp.employee, "attendance", e.target.value)
                }
              />

              <CustomInput
                type="text"
                title="Remark"
                value={emp.remark}
                onChange={(e) =>
                  handleChange(emp.employee, "remark", e.target.value)
                }
                placeholder={
                  emp.attendance === "Absent" ? "Reason for absence" : ""
                }
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
