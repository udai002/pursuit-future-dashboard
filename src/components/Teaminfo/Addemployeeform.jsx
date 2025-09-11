import React from 'react'

const Addemployeeform = () => {
    return (
        <div className='flex justify-center'>
            <div className='w-[850px] p-6 bg-white border border-[#004AAD] rounded-lg'>
                <form className='grid-cols-2 gap-4'>
                    <p className='font-Regular font-family:DM Sans text-[#444444]'>Add Employee</p>
                    <div className='flex gap-3 p-2 '>
                        <input type="text" placeholder='Employee name' className='border-2 border-[#004AAD] p-3 rounded-lg w-full' />
                        <input type="text" placeholder='Employee Email ID' className='border-2 border-[#004AAD] p-3 rounded-lg w-full' />
                    </div>
                    <div className='flex gap-3 p-2'>
                        <input type="text" placeholder='Employee Contact Number' className='border-2 border-[#004AAD] p-3 rounded-lg w-full' />
                        <input type="text" placeholder='Employee  WhatsApp Number' className='border-2 border-[#004AAD] p-3 rounded-lg w-full' />
                    </div>
                    <div className='flex gap-3 p-2'>
                        <select
                            className="border border-[#004AAD] p-3 rounded-lg w-full text-[#004AAD]"
                            defaultValue="">
                            <option value="" disabled className='text-[#004AAD]'>Select Team</option>
                        </select>
                        <select
                            className="border border-[#004AAD] p-3 rounded-lg w-full text-[#004AAD]"
                            defaultValue="">
                            <option value="" disabled className="text-[#004AAD]">Select Office Location</option>
                        </select>
                    </div>
                    <div>
                        <button className='bg-[#004AAd] text-white p-2 rounded-lg'>Add </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Addemployeeform
