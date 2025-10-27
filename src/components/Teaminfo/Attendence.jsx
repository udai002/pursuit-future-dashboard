
import React, { useEffect, useState } from "react";
import Table from "../table";
import useAuth from "../../context/AuthContext";
import { useLocation } from "react-router";
import { buildCalendarData } from "../../utils/CalendarUtils";
import AttendanceCell from "./AttendanceCell";

function AttendanceCalendar() {
  const { userDetails } = useAuth();
  const token = JSON.parse(localStorage.getItem("session_token"));
  const location = useLocation();
  const employee = location.state;

  const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const currentYear = new Date().getFullYear();

  const columns = [
    { id: "sun", header: "Sunday", cell: (row) => <AttendanceCell cell={row.sun} /> },
    { id: "mon", header: "Monday", cell: (row) => <AttendanceCell cell={row.mon} /> },
    { id: "tue", header: "Tuesday", cell: (row) => <AttendanceCell cell={row.tue} /> },
    { id: "wed", header: "Wednesday", cell: (row) => <AttendanceCell cell={row.wed} /> },
    { id: "thu", header: "Thursday", cell: (row) => <AttendanceCell cell={row.thu} /> },
    { id: "fri", header: "Friday", cell: (row) => <AttendanceCell cell={row.fri} /> },
    { id: "sat", header: "Saturday", cell: (row) => <AttendanceCell cell={row.sat} /> },

  ];

  useEffect(() => {
    if (!userDetails || !token || !employee?._id) return;

    const fetchAttendance = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/attendence/attendence/${employee._id}?month=${selectedMonth}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();

        if (!res.ok) {
          console.error("API error:", data);
          setRows([]);
          return;
        }

        const calendarData = buildCalendarData(data, currentYear, selectedMonth);
        setRows(calendarData);
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };

    fetchAttendance();
  }, [userDetails, token, selectedMonth, employee]);

  return (
    <div className="p-4 flex-1">
      <div className="flex">
        <h2 className="flex-1 text-2xl font-semibold mb-4">
         {employee?.username || "Employee"}
        </h2>
        <div className="flex justify-end items-center mb-4 gap-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="bg-[#004AAD] text-white font-medium px-6 py-2 rounded-full cursor-pointer focus:outline-none"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1} className="text-black">
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Table data={rows} columns={columns} emptyMessage="No attendance data ." />
    </div>
  );
}

export default AttendanceCalendar;
