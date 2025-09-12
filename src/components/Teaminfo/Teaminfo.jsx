import React, { useEffect } from 'react'
import Addteamform from './Addteamform';
import { useState } from 'react';
import Addemployeeform from './Addemployeeform';
import Table from '../table'
import arrow from "../../assets/arrow.png"
import { useNavigate } from 'react-router';
import Delete from '../../assets/Teaminfo/delete.svg';
import Edit from '../../assets/Teaminfo/edit.svg';
import toast, {Toaster} from 'react-hot-toast'

const Teaminfo = () => {
  const [modalType, setModalType] = useState(null);
  const[team,setTeam]=useState([])
    const [loading, setLoading] = useState(true);
   const [editAddteam, setEditAddteam] = useState(null); 
  const navigate = useNavigate()

   const handleOpenModal = (type, data = null) => {
    setModalType(type);
    if (type === 'team' && data) {
      setEditAddteam(data);
    } else {
      setEditAddteam(null);
    }
  };

   const handleCloseModal = () => {
    setModalType(null);
    setEditAddteam(null);
    Teams(); 
  };

  const Teams = async()=>{
    try{
    const data = await fetch("http://localhost:3000/team/team")
    const response = await data.json()
    setTeam(response)
    }
    catch(error){
      console.log("error occured",error)
    }finally {
      setLoading(false)
    }
    
  }

  useEffect(()=>{
    Teams()
  },[])

    const handleDelete = async (id) => {
      if(window.confirm('Are you sure you want to delete?')){
    try {
      const response = await fetch(`http://localhost:3000/team/team/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.warning("are you sure")
        console.log('Team deleted successfully');
        Teams();
      } else {
        console.error('Failed to delete the team.');
      }
    } catch (error) {
      console.error('Error during deletion:', error);
    }
  }
  };

  const handleEdit = (addteam) => {
    setEditAddteam(addteam);
    setModalType("edit")
  };

  const onClose = () => {
    setModalType(null);
    setEditAddteam(null);
  };

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
    {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-5 ml-5">
          <button onClick={() =>handleDelete(row._id)}>
            <img src={Delete} className="w-5 h-6" />
          </button>
          <button onClick={() =>{handleEdit(row)}}>
            <img src={Edit} alt="Edit" className="w-7 h-7" />
          </button>
        </div>
      ),
    },
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
        {loading ? <p>Loading...</p> : <Table  data={team} columns={columns}/>}
      </div>


      {(modalType === 'team' || modalType === "edit") && (
        <Addteamform 
        onClose={handleCloseModal}
        editAddteam={editAddteam} />)}

      {modalType === 'employee' && (
        <Addemployeeform onClose={handleCloseModal} />)}
    </div>

  )
}

export default Teaminfo
