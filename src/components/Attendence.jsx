import React, { useEffect, useState } from "react";
import Table from "./table";
import useAuth from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { buildCalendarData } from "../utils/CalendarUtils";
import AttendanceCell from "./Teaminfo/AttendanceCell";

function AttendanceCalendar({ employee: propEmployee }) {
  const { userDetails } = useAuth();
  const token = JSON.parse(localStorage.getItem("session_token"));
  const location = useLocation();


  const employee = propEmployee || location.state || userDetails;

  const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
    if (!employee?._id || !token) return;

    const fetchAttendance = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:3000/attendence/attendence/${employee._id}?month=${selectedMonth}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load attendance.");

        const calendarData = buildCalendarData(data, currentYear, selectedMonth);
        setRows(calendarData);
      } catch (err) {
        console.error("Error fetching attendance:", err);
        setError(err.message);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [employee, token, selectedMonth]);

  return (
    <div className="p-4 flex-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[#444]">
          {employee?.username || "Employee"}
        </h2>

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

      {loading ? (
        <p className="text-center text-gray-500">Loading attendance...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <Table data={rows} columns={columns} emptyMessage="No attendance data." />
      )}
    </div>
  );
}

export default AttendanceCalendar;
