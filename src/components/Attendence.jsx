import React, { useEffect, useState } from "react";
import Table from "./table";
import useAuth from "../context/AuthContext";

const buildCalendarData = (records, year, month) => {
  const attendanceMap = {};
  records.forEach((r) => {
    const day = new Date(r.date).getDate();
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
  const [rows, setRows] = useState([]);
  const { userDetails } = useAuth();
  const token = JSON.parse(localStorage.getItem("session_token"));

  const columns = [
    { id: "sun", header: "Sun", cell: (row) => renderCell(row.sun) },
    { id: "mon", header: "Mon", cell: (row) => renderCell(row.mon) },
    { id: "tue", header: "Tue", cell: (row) => renderCell(row.tue) },
    { id: "wed", header: "Wed", cell: (row) => renderCell(row.wed) },
    { id: "thu", header: "Thu", cell: (row) => renderCell(row.thu) },
    { id: "fri", header: "Fri", cell: (row) => renderCell(row.fri) },
    { id: "sat", header: "Sat", cell: (row) => renderCell(row.sat) },
  ];

 const renderCell = (cell) => {
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
};


  useEffect(() => {
    if (!userDetails || !token) return;

    const fetchAttendance = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/attendence/attendence/${userDetails._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = await res.json();
        if (!res.ok) {
          console.error("API error:", data);
          setRows([]);
        } else {
         
          const now = new Date();
          const calendarData = buildCalendarData(data, now.getFullYear(), now.getMonth() + 1);
          setRows(calendarData);
        }
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };

    fetchAttendance();
  }, [userDetails, token]);

  return (
    <div className=" w-full">
      <h2 className="text-2xl font-semibold mb-4">Attendance</h2>
      <Table data={rows} columns={columns} emptyMessage="No attendance data." />
    </div>
  );
}

export default AttendanceCalendar;
