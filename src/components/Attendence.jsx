import React, { useEffect, useState } from "react";
import Table from "./table";

const buildCalendarData = (records, year, month) => {
  const attendanceMap = {};
  records.forEach((r) => {
    const day = new Date(r.date).getDate();
    attendanceMap[day] = {
      attendance: r.attendance,
      login: r.login || "",
    };
  });

  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const weeks = [];
  let currentWeek = {
    sun: "",
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
  };
  let day = 1;

 
  for (let i = startingDay; i < 7; i++) {
    const weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][i];
    currentWeek[weekday] = { day, ...attendanceMap[day] };
    day++;
  }
  weeks.push(currentWeek);

  while (day <= daysInMonth) {
    let week = {
      sun: "",
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
      sat: "",
    };
    for (let i = 0; i < 7 && day <= daysInMonth; i++) {
      const weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][i];
      week[weekday] = { day, ...attendanceMap[day] };
      day++;
    }
    weeks.push(week);
  }

  return weeks;
};


function Attendence() {
  const [rows, setRows] = useState([]);

const renderCell = (cell) => {
  if (!cell) return <div className="text-gray-300">-</div>;

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-lg">{cell.day}</span>

      {cell.attendance && (
        <span className="px-3 py-1 text-md rounded-full bg-[#E6EDF7] text-[#004AAD] border border-[#004AAD]">
          {cell.attendance}
        </span>
      )}

      {cell.login && (
        <span className="px-2 text-xl text-black">
          {cell.login}
        </span>
      )}
    </div>
  );
};


  const columns = [
    { id: "sun", header: "Sun", cell: (row) => renderCell(row.sun) },
    { id: "mon", header: "Mon", cell: (row) => renderCell(row.mon) },
    { id: "tue", header: "Tue", cell: (row) => renderCell(row.tue) },
    { id: "wed", header: "Wed", cell: (row) => renderCell(row.wed) },
    { id: "thu", header: "Thu", cell: (row) => renderCell(row.thu) },
    { id: "fri", header: "Fri", cell: (row) => renderCell(row.fri) },
    { id: "sat", header: "Sat", cell: (row) => renderCell(row.sat) },
  ];

  const dummyData = [
    { date: "2025-09-01", attendance: "Present", login: "on time" },
    { date: "2025-09-02", attendance: "Absent", login: "on time" },
    { date: "2025-09-03", attendance: "Leave", login: "on time" },
    { date: "2025-09-04", attendance: "Present", login: "on time" },
    { date: "2025-09-05", attendance: "Present", login: "on time" },
    { date: "2025-09-06", attendance: "Absent", login: "on time" },
    { date: "2025-09-07", attendance: "Present", login: "on time" },
  ];

  useEffect(() => {
    const formatted = buildCalendarData(dummyData, 2025, 9);
    setRows(formatted);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Attendance</h2>
      <Table data={rows} columns={columns} emptyMessage="No attendance data." />
    </div>
  );
}

export default Attendence;
