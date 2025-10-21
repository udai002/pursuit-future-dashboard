import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import Table from "../table";
import arrow from "../../assets/arrow.png"

const Employees = () => {
    const { teamId } = useParams();
    const location = useLocation();
    const team = location.state;
    const navigate = useNavigate()
   

    if (!team) {
        return <p>No team data found. Go back and try again.</p>;
    }
    


    const columns = [
        {
            id: "username", header: "Employee Name", cell: (row) => (
                <button onClick={() => navigate(`/employees/${row._id}/attendence`, { state: row })}>
                    <div className='flex jusify-center align-center item-center gap-2'>
                        <p className='text-[#004aad]'>{row.username}</p>
                        <img src={arrow} alt="arrow" className='w-3 h-3' />

                    </div>
                </button>
            )
        },
        { id: "email", header: "Email" },
        { id: "phone", header: "Contact" },
        { id: "whatsappNumber", header: "WhatsApp" },
        { id: "location", header: "Location" },
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
