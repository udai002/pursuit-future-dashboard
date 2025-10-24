import React from 'react'
import Table from '../../components/table'
import { GoArrowUpRight } from "react-icons/go";
import useFetchEmployees from '../../utils/useFetchEmployeesUtils';
import { useEffect, useState } from 'react';
import CustomSelect from '../../components/button/CustomSelect';

const EmployeesInfo = () => {
  const [employees, setEmployees] = useState([]);
   const [month, setMonth] = useState(() => new Date().getMonth() + 1);
   const { data, loading, error } = useFetchEmployees(month);

  const handleMonthChange = (e) => {
    const selectedMonth=Number(e.target.value);
    console.log(selectedMonth);
    setMonth(selectedMonth);
  };

  useEffect(() => {
    if (Array.isArray(data.users)) {
      setEmployees(data.users);
    } else {
      setEmployees([]);
    }
  }, [data]);

  if (loading) return <p>Loading employees...</p>;
  if (error === "No data available") return <p className="text-center text-gray-500">No data available for the selected month.</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const columns = [
    {
      id: "username",
      header: "Employee Name",
      cell: (row) => (
        <>
          <div className='flex gap-1 justify-center items-center'>
            <h1>{row.username}</h1>
            <GoArrowUpRight className='hover:cursor-pointer' />
          </div>
        </>
      )
    },

    { id: "email", header: "Email ID" },
    { id: "phone", header: "Contact Number" },
    { id: "workingCount", header: "Working Days", cell:(row)=>( <div>
      <p>{row.attendance.workingCount} </p>
    </div>)

    } ,
    { id: "leaveCount", header: "Leave Day" , cell:(row)=>(
      <div>
        <p>{row.attendance.leaveCount}</p>
      </div>
    )},
    { id: "absentCount", header: "Absent" , cell:(row)=>(
      <div>
        <p>{row.attendance.absentCount}</p>
      </div>
    )},
  ]

  console.log("Employees", employees)
 
  return (
    <div className="w-full p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 ">
          <div className="text-2xl sm:text-3xl text-[#444444] ">Employees Info</div>
          <CustomSelect title={new Date().toLocaleString('default', { month: 'long' })} onChange={handleMonthChange} 
            options={[
              { value: 1, label: "January" },
              { value: 2, label: "February" },
              { value: 3, label: "March" },
              { value: 4, label: "April" },
              { value: 5, label: "May" },
              { value: 6, label: "June" },
              { value: 7, label: "July" },
              { value: 8, label: "August" },
              { value: 9, label: "September" },
              { value: 10, label: "October" },
              { value: 11, label: "November" },
              { value: 12, label: "December" },
            ]}
          />
        </div>
        </div>

        <div>

            {loading ? <p>Loading...</p> : <Table data={employees} columns={columns} />}
          </div>
    </div>
  );
}
export default EmployeesInfo;