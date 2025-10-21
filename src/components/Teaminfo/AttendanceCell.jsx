import React from "react";

const AttendanceCell = ({ cell }) => {
  if (!cell) return <div className="text-gray-300">-</div>;

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-lg font-semibold">{cell.day}</span>

      {cell.attendance && (
        <span className="px-2 py-1 text-sm rounded-full bg-[#E6EDF7] text-[#004AAD] border border-[#004AAD]">
          {cell.attendance}
        </span>
      )}
      {cell.login && <span className="text-sm text-gray-700">{cell.login}</span>}
      {cell.remark && <span className="text-md font-semibold text-[#444444]">{cell.remark}</span>}
    </div>
  );
};

export default AttendanceCell;
