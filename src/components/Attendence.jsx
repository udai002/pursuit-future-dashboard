import React, { useEffect, useState } from "react";
import Table from "./table";


const buildCalendarData = (records, year, month) => {
  const attendanceMap = {};
  records.forEach(r => {
    const day = new Date(r.date).getDate();
    attendanceMap[day] = r.attendance;
  });

  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const weeks = [];
  let currentWeek = { sun: "", mon: "", tue: "", wed: "", thu: "", fri: "", sat: "" };
  let day = 1;

  for (let i = startingDay; i < 7; i++) {
    const weekday = ["sun","mon","tue","wed","thu","fri","sat"][i];
    currentWeek[weekday] = `${day} (${attendanceMap[day] || ""})`;
    day++;
  }
  weeks.push(currentWeek);

  while (day <= daysInMonth) {
    let week = { sun: "", mon: "", tue: "", wed: "", thu: "", fri: "", sat: "" };
    for (let i = 0; i < 7 && day <= daysInMonth; i++) {
      const weekday = ["sun","mon","tue","wed","thu","fri","sat"][i];
      week[weekday] = `${day} (${attendanceMap[day] || ""})`;
      day++;
    }
    weeks.push(week);
  }

  return weeks;
};

function Attendence() {
  const [rows, setRows] = useState([]);

  const columns = [
    { id: "sun", header: "Sun" },
    { id: "mon", header: "Mon" },
    { id: "tue", header: "Tue" },
    { id: "wed", header: "Wed" },
    { id: "thu", header: "Thu" },
    { id: "fri", header: "Fri" },
    { id: "sat", header: "Sat" },
  ];

  const dummyData = [
    { date: "2025-09-01", attendance: "Present" },
    { date: "2025-09-02", attendance: "Absent" },
    { date: "2025-09-03", attendance: "Leave" },
    { date: "2025-09-04", attendance: "Present" },
    { date: "2025-09-05", attendance: "Present" },
    { date: "2025-09-06", attendance: "Absent" },
    { date: "2025-09-07", attendance: "Present" },
   
  ];

  useEffect(() => {
    const formatted = buildCalendarData(dummyData, 2025, 9);
    setRows(formatted);
  }, []);

  return (
    <div>
      <Table data={rows} columns={columns} emptyMessage="No attendance data." />
    </div>
  );
}

export default Attendence;
