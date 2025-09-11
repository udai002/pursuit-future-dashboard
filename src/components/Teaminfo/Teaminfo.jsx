import React, { useEffect } from 'react'
import Addteamform from './Addteamform';
import { useState } from 'react';
import Addemployeeform from './Addemployeeform';
import Table from '../table'
import arrow from "../../assets/arrow.png"
import { useNavigate } from 'react-router';

const Teaminfo = () => {
  const [modalType, setModalType] = useState(null);
  const[team,setTeam]=useState([])
  const navigate = useNavigate()

  const handleOpenModal = (type) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const Teams = async()=>{
    try{
    const data = await fetch("http://localhost:3000/team/team")
    const response = await data.json()
    setTeam(response)
    }
    catch(error){
      console.log("error occured",error)
    }
    
  }

  useEffect(()=>{
    Teams()
  },[])

  const columns = [
    { id: 'name', header: 'Team Name', cell:(row)=>(
    <button onClick={() => navigate(`/teams/${row.id}/employees`, { state: row })}>
        <div className='flex jusify-center align-center item-center gap-2'>
        <p className='text-[#004aad]'>{row.name}</p>
        <img src={arrow} alt="arrow" className='w-3 h-3' />

      </div>
      </button>
    )},

    { id: 'No. of Members', header: 'No. of Members' },
    { id: 'contact', header: 'Contact Number' },
    { id: 'Payment Count', header: 'Payment Count' },
    { id: 'Action', header: 'Action' }
  ]
  return (
    <div>
      <div className='flex'>
        <div className='flex-1'>
          <p>Team Info</p>
        </div>
        <div className='flex gap-3'>
          <div>
            <button className='bg-[#004AAd] text-white p-2 rounded-lg ' onClick={() => handleOpenModal('team')}>Add Team</button>

          </div>
          <div>
            <button className='bg-[#004AAD] text-white p-2 rounded-lg' onClick={() => handleOpenModal('employee')}>Add Employee</button>

          </div>
        </div>
      </div>
      <div className='p-10'>
        <Table  data={team} columns={columns}/>

      </div>
      {modalType === 'team' && (
        <Addteamform onClose={handleCloseModal} />)}

      {modalType === 'employee' && (
        <Addemployeeform onClose={handleCloseModal} />)}
    </div>

  )
}

export default Teaminfo
