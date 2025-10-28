import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { GoArrowUpRight } from "react-icons/go";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import CustomSelect from "../../components/button/CustomSelect";
import useFetchEmployees from "../../utils/useFetchEmployeesUtils";
import { useNavigate } from "react-router-dom"; 


const EmployeesInfo = () => {
  const [employees, setEmployees] = useState([]);
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(9);

  const { data, loading, error } = useFetchEmployees(month);
   const navigate = useNavigate();

  const handleMonthChange = (e) => {
    setMonth(Number(e.target.value));
    setPage(1);
  };

  useEffect(() => {
    if (Array.isArray(data.users)) {
      setEmployees(data.users);
    } else {
      setEmployees([]);
    }
  }, [data]);

  const totalPages = Math.ceil(employees.length / pageSize);
  const paginatedEmployees = employees.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

    const handleEmployeeClick = (employee) => {
    navigate("attendence", { state: employee });
  };

  const columns = [
    {
      id: "username",
      header: "Employee Name",
      cell: (row) => (
        <div className="flex gap-1 justify-center items-center"  onClick={() => handleEmployeeClick(row)}>
          <h1>{row.username}</h1>
          <GoArrowUpRight className="hover:cursor-pointer" />
        </div>
      ),
    },
    { id: "email", header: "Email ID" },
    { id: "phone", header: "Contact Number" },
    {
      id: "workingCount",
      header: "Working Days",
      cell: (row) => <p>{row.attendance?.workingCount || 0}</p>,
    },
    {
      id: "leaveCount",
      header: "Leave Days",
      cell: (row) => <p>{row.attendance?.leaveCount || 0}</p>,
    },
    {
      id: "absentCount",
      header: "Absent",
      cell: (row) => <p>{row.attendance?.absentCount || 0}</p>,
    },
  ];

  return (
    <div className="w-full p-4">
     
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
          <h2 className="text-2xl sm:text-3xl text-[#444444]">
            Employees Info
          </h2>
          <CustomSelect title={new Date().toLocaleString('default', { month: 'long' })} onChange={handleMonthChange}
            options={[
              { id: 1, label: "January" },
              { id: 2, label: "February" },
              { id: 3, label: "March" },
              { id: 4, label: "April" },
              { id: 5, label: "May" },
              { id: 6, label: "June" },
              { id: 7, label: "July" },
              { id: 8, label: "August" },
              { id: 9, label: "September" },
              { id: 10, label: "October" },
              { id: 11, label: "November" },
              { id: 12, label: "December" },
            ]}
          />
        </div>
      </div>

      <div className="mt-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading employees...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : paginatedEmployees.length === 0 ? (
          <p className="text-center text-gray-500">
            No data available for the selected month.
          </p>
        ) : (
          <Table data={paginatedEmployees} columns={columns} />
        )}

        
        {employees.length > 0 && (
          <div className="flex justify-center items-center mt-10 gap-4 px-7 mb-5">
            <span className="text-lg text-[#444444] font-medium">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className={`p-2 bg-[#004AAD] rounded-full ${
                  page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaArrowLeftLong className="text-2xl text-white" />
              </button>
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className={`p-2 bg-[#004AAD] rounded-full ${
                  page === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaArrowRightLong className="text-2xl text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeesInfo;