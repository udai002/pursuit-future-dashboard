import React, { useEffect, useState } from 'react'
import Table from '../../components/table'
import { GoArrowUpRight } from "react-icons/go";
import useAuth from '../../context/AuthContext';

const MembersInfo = () => {

    const [data, setData] = useState([])
    const { userDetails } = useAuth();
    const token = JSON.parse(localStorage.getItem("session_token"));
    console.log("from team members",userDetails.team)
    const FetchMembers = async () => {
        console.log("from team lead")
        const response = await fetch(`http://localhost:3000/team/team/${userDetails.team}`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await response.json();
        setData(data)
        console.log("from team lead", data)
    }
    useEffect(() => {
        FetchMembers()
    }, [])

    // const data=[
    //     { name:"rahulkumar", amount:"8000",pr:"8000",cr:"8000",penre:"1000",pc:"50"},
    //     { name:"rahulkumar", amount:"8000",pr:"8000",cr:"8000",penre:"1000",pc:"50"},
    //     { name:"rahulkumar", amount:"8000",pr:"8000",cr:"8000",penre:"1000",pc:"50"},
    //     { name:"rahulkumar", amount:"8000",pr:"8000",cr:"8000",penre:"1000",pc:"50"},
    //     { name:"rahulkumar", amount:"8000",pr:"8000",cr:"8000",penre:"1000",pc:"50"},
    //     { name:"rahulkumar", amount:"8000",pr:"8000",cr:"8000",penre:"1000",pc:"50"},
    //     { name:"rahulkumar", amount:"8000",pr:"8000",cr:"8000",penre:"1000",pc:"50"}
    // ]
    const columns = [
        {
            id: "name", header: "Member Name", cell: (row) => (
                <>
                    <div className='flex gap-1 justify-center items-center'>
                        <h1>{row.name}</h1>
                        <GoArrowUpRight className='hover:cursor-pointer' />
                    </div>
                </>
            )
        },
        {
            id: "amount", header: "Total Target", cell: (row) => (
                <>
                    <div className='flex gap-1 justify-center items-center'>
                        <p>Rs</p>
                        <h1>{row.amount}</h1>
                    </div>
                </>
            )
        },
        {
            id: "pr", header: "Projected Revenue", cell: (row) => (
                <>
                    <div className='flex gap-1 justify-center items-center'>
                        <p>Rs</p>
                        <h1>{row.pr}</h1>
                    </div>
                </>
            )
        },
        {
            id: "cr", header: "Credited Revenue", cell: (row) => (
                <>
                    <div className='flex gap-1 justify-center items-center'>
                        <p>Rs</p>
                        <h1>{row.cr}</h1>
                    </div>
                </>
            )
        },
        {
            id: "penre", header: "Pending Revenue", cell: (row) => (
                <>
                    <div className='flex gap-1 justify-center items-center'>
                        <p>Rs</p>
                        <h1>{row.penre}</h1>
                    </div>
                </>
            )
        },
        { id: "pc", header: "Payment Count" }
    ]
    return (
        <>
            <div className='mt-[5%]'>
                <Table columns={columns} data={data} />
            </div>
        </>
    )
}

export default MembersInfo