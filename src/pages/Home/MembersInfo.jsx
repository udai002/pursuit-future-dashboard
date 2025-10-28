import React, { useEffect, useState } from 'react'
import Table from '../../components/table'
import { GoArrowUpRight } from "react-icons/go";
import useAuth from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const MembersInfo = () => {

    const [data, setData] = useState([]);
    const [totalTarget, setTotalTarget] = useState(0);
    const { userDetails } = useAuth();
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("session_token"));

    const FetchMembers = async () => {
        try {
            if (!userDetails?.teamId?.[0]) return; 
            
            const response = await fetch(
                `http://localhost:3000/team/team/${userDetails.teamId[0]}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const result = await response.json();
            const employees = result?.employees || [];

            const updatedEmployees = employees.map(emp => ({
                ...emp,
                amount: 100000,
                pr: emp.pr ?? 0,
                cr: emp.cr ?? 0,
                penre: emp.penre ?? 0,
                pc: emp.pc ?? 0
            }));

            setData(updatedEmployees);
            setTotalTarget(updatedEmployees.length * 100000);

        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    useEffect(() => {
        FetchMembers();
    }, [userDetails]); 

    const columns = [
        {
            id: "username", header: "Member Name", cell: (row) => (
                <button
                    onClick={() => navigate(`/salesLeadInfo/${row._id}`, { state: row })}
                >
                    <div className='flex gap-1 justify-center items-center'>
                        <h1>{row.username}</h1>
                        <GoArrowUpRight className='hover:cursor-pointer' />
                    </div>
                </button>
            )
        },
        {
            id: "amount", header: "Total Target", cell: (row) => (
                <div className='flex gap-1 justify-center items-center'>
                    <p>Rs</p>
                    <h1>{row.amount.toLocaleString()}</h1>
                </div>
            )
        },
        {
            id: "pr", header: "Projected Revenue", cell: (row) => (
                <div className='flex gap-1 justify-center items-center'>
                    <p>Rs</p>
                    <h1>{row.pr.toLocaleString()}</h1>
                </div>
            )
        },
        {
            id: "cr", header: "Credited Revenue", cell: (row) => (
                <div className='flex gap-1 justify-center items-center'>
                    <p>Rs</p>
                    <h1>{row.cr.toLocaleString()}</h1>
                </div>
            )
        },
        {
            id: "penre", header: "Pending Revenue", cell: (row) => (
                <div className='flex gap-1 justify-center items-center'>
                    <p>Rs</p>
                    <h1>{row.penre.toLocaleString()}</h1>
                </div>
            )
        },
        {
            id: "pc", header: "Payment Count", cell: (row) => (
                <h1 className="text-center">{row.pc}</h1>
            )
        }
    ];

    return (
        <>
        <div className=''>
            <h1 className='text-[24px]'>Members Info</h1>

        </div>
        <div className=''>
            <Table columns={columns} data={data} />

            <div className='flex justify-end mt-5 pr-10'>
                <h2 className='text-lg font-semibold'>
                    Total Team Target: <span className='text-green-600'>
                        Rs {totalTarget.toLocaleString()}
                    </span>
                </h2>
            </div>
        </div>
        </>
    )
}

export default MembersInfo;
