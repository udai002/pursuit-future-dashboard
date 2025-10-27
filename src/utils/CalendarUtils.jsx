
export const buildCalendarData = (records, year, month) => {
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
  const daysInMonth = new Date(year, month, 0).getDate();
  const startingDay = firstDay.getDay();

  const weeks = [];
  let currentWeek = { sun: "", mon: "", tue: "", wed: "", thu: "", fri: "", sat: "" };
  let day = 1;


  for (let i = 0; i < 7; i++) {
    const weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][i];
    if (i < startingDay) {
      currentWeek[weekday] = "";
    } else if (day <= daysInMonth) {
      currentWeek[weekday] = { day, ...attendanceMap[day] };
      day++;
    }
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
