import React, { useEffect, useState } from "react";
import Table from "./table";
import useAuth from "../context/AuthContext";

const buildCalendarData = (records, year, month) => {
  const attendanceMap = {};
  records.forEach((r) => {
    const day = new Date(r.createdAt).getDate();
    attendanceMap[day] = {
      attendance: r.attendance,
      login: r.login || "",
      remark: r.remark || "",
    };
  });

  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const weeks = [];
  let currentWeek = { sun: "", mon: "", tue: "", wed: "", thu: "", fri: "", sat: "" };
  let day = 1;

  for (let i = startingDay; i < 7; i++) {
    const weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][i];
    currentWeek[weekday] = { day, ...attendanceMap[day] };
    day++;
  }
  weeks.push(currentWeek);

  while (day <= daysInMonth) {
    let week = { sun: "", mon: "", tue: "", wed: "", thu: "", fri: "", sat: "" };
    for (let i = 0; i < 7 && day <= daysInMonth; i++) {
      const weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][i];
      week[weekday] = { day, ...attendanceMap[day] };
      day++;
    }
    weeks.push(week);
  }
  return weeks;
};

function AttendanceCalendar() {
  const { userDetails } = useAuth();
  const token = JSON.parse(localStorage.getItem("session_token"));
  const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const currentYear = new Date().getFullYear();

  const columns = [
    { id: "mon", header: "Monday", cell: (row) => renderCell(row.mon) },
    { id: "tue", header: "Tuesday", cell: (row) => renderCell(row.tue) },
    { id: "wed", header: "Wednesday", cell: (row) => renderCell(row.wed) },
    { id: "thu", header: "Thursday", cell: (row) => renderCell(row.thu) },
    { id: "fri", header: "Friday", cell: (row) => renderCell(row.fri) },
    { id: "sat", header: "Saturday", cell: (row) => renderCell(row.sat) },
    { id: "sun", header: "Sunday", cell: (row) => renderCell(row.sun) },
  ];

  function renderCell(cell) {
    if (!cell) return <div className="text-gray-300">-</div>;

    return (
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-lg font-semibold">{cell.day}</span>

        {cell.attendance && (
          <span
            className={`px-2 py-1 text-sm rounded-full bg-[#E6EDF7] text-[#004AAD] border border-[#004AAD]
            ${cell.attendance}`}
          >
            {cell.attendance}
          </span>
        )}

        {cell.login && <span className="text-sm text-gray-700">{cell.login}</span>}
        {cell.remark && (
          <span className="text-md font-semibold text-[#444444]">{cell.remark}</span>
        )}
      </div>
    );
  }

  useEffect(() => {
    if (!userDetails || !token) return;

    const fetchAttendance = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/attendence/attendence/${userDetails._id}?month=${selectedMonth}`,
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
  }, [userDetails, token, selectedMonth]);

  return (
    <div className="p-4 flex-1">
      <div className="flex">
      <h2 className="flex-1 text-2xl font-semibold mb-4">Attendance {userDetails?.name || "Employee"}</h2>
      <div className="flex justify-end items-center mb-4 gap-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="bg-[#004AAD] text-white font-medium px-6 py-2 rounded-full cursor-pointer focus:outline-none" >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1} className="text-black">
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>
      </div>
      <Table data={rows} columns={columns} emptyMessage="No attendance data." />
    </div>
  );
}

export default AttendanceCalendar;
