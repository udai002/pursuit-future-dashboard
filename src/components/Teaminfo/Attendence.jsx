import React from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import Table from "../table";
import arrow from "../../assets/arrow.png"

const Employees = () => {
    const { teamId } = useParams();
    const location = useLocation();
    const team = location.state;
    

    if (!team) {
        return <p>No team data found. Go back and try again.</p>;
    }

    const columns = [
        {
            id: "attendence", header: "Employee Name", cell: (row) => (
                
                    <div className='flex flex-col jusify-center align-center item-center gap-2'>
                        <p className='text-[#004aad]'>{row.attendence}</p>
                               <p className='text-[#004aad]'>{row.remark}</p>
                        <img src={arrow} alt="arrow" className='w-3 h-3' />

                    </div>
              
            )
        },
       
    ];

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">
                Employees
            </h2>
            <Table data={team.employees || []} columns={columns} />
        </div>
    );
};

export default Employees;
