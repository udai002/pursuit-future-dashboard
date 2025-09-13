import React, { useState, useEffect } from "react";

function AddAttendance() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState({});
  const token = JSON.parse(localStorage.getItem("session_token"));

  // Fetch employees
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/details", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.data) {
        const employeesArray = Array.isArray(result.data)
          ? result.data
          : [result.data];

        const initialAttendance = {};
        employeesArray.forEach((emp) => {
          initialAttendance[emp._id] = { attendance: "", remark: "" }; // 👈 use Mongo _id
        });

        setEmployees(employeesArray);
        setAttendanceData(initialAttendance);
      } else {
        console.error("No 'data' key found in API response:", result);
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle change
  const handleAttendanceChange = (employeeId, field, value) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [employeeId]: {
        ...prevData[employeeId],
        [field]: value,
      },
    }));
  };

  // Save attendance
  const handleSaveAttendance = async () => {
    const postData = employees.map((emp) => ({
      employee: emp._id,
      attendance: attendanceData[emp._id]?.attendance,
      remark: attendanceData[emp._id]?.remark,
    }));

    try {
      const response = await fetch(
        "http://localhost:3000/attendence/attendence",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post attendance data");
      }

      const result = await response.json();
      console.log("Attendance saved successfully:", result);
      alert("Attendance saved successfully!");
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Error saving attendance. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (employees.length === 0) {
    return <div>No employees found.</div>;
  }

  return (
    <div className="">
      <div className="border border-[#004AAD] rounded-xl">
        <div className="flex justify-center">
          <div>
            <h1 className="p-4 text-xl">Mark Attendance</h1>

            {employees.map((emp) => (
              <div className="flex gap-10 py-1 px-4" key={emp._id}>
                <div className="flex flex-col gap-2">
                  <p>{emp.username}</p>
                </div>
                <div className="flex gap-5">
                  <select
                    name="attendance"
                    required
                    className="border border-[#004AAD] h-10 w-[250px] rounded-lg text-[#004AAD]"
                    value={attendanceData[emp._id]?.attendance || ""}
                    onChange={(e) =>
                      handleAttendanceChange(
                        emp._id,
                        "attendance",
                        e.target.value
                      )
                    }
                  >
                    <option value="" disabled>
                      Attendance
                    </option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Remark"
                    name="remark"
                    className="border rounded-lg h-10 border-[#004AAD] outline-none placeholder-[#004AAD] px-1 flex-1 w-[250px]"
                    value={attendanceData[emp._id]?.remark || ""}
                    onChange={(e) =>
                      handleAttendanceChange(emp._id, "remark", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end m-5">
          <button
            onClick={handleSaveAttendance}
            className="bg-[#004AAD] text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAttendance;
