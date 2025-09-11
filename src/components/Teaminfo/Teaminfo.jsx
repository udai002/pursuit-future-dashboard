import React from 'react'
import Addteamform from './Addteamform';
import { useState } from 'react';
import Addemployeeform from './Addemployeeform';
import Table from '../table'

const Teaminfo = () => {
  const [modalType, setModalType] = useState(null);

  const handleOpenModal = (type) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const columns = [
    { id: 'Team Name', header: 'Team Name' },
    { id: 'No. of Members', header: 'No. of Members' },
    { id: 'Contact Number', header: 'Contact Number' },
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
      <div>
        <Table />

      </div>
      {modalType === 'team' && (
        <Addteamform onClose={handleCloseModal} />)}

      {modalType === 'employee' && (
        <Addemployeeform onClose={handleCloseModal} />)}
    </div>

  )
}

export default Teaminfo
