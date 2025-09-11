import React from 'react'

const Addteamform = () => {
    return (
        <div className='flex justify-center'>
            <div className=' p-6 bg-white border border-[#004AAD] rounded-lg'>
                <form className='grid-cols-2 gap-4'>
                    <div className='flex gap-3 p-2'>
                    <p className='font-Regular font-family:DM Sans text-[#444444] flex-1  text-2xl'>Adding Team </p>
                    <div>
                        <select
                            className="border border-[#004AAD] p-3 rounded-lg  text-[#004AAD]"
                            defaultValue="">
                            <option value="" disabled className='text-[#004AAD]'>Select Office Location</option>
                        </select>
                    </div>
                    </div>
                    <div className='flex gap-3 w-full p-2 '>
                        <input type="text" placeholder='Team name' className='border-2 border-[#004AAD] p-3 rounded-lg ' />
                        <input type="text" placeholder='Team Contact Number' className='border-2 border-[#004AAD] p-3 rounded-lg' />
                    </div>
                    <div>
                        <button className='bg-[#004AAd] text-white p-2 rounded-lg ml-80' >Add Team</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Addteamform
