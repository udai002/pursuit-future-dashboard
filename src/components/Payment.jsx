import React from 'react'

export default function Payment() {


    // const data=[
    //     {
    //         id:1,
            
    //     }
    // ]
  return (
   <div className='p-3 m-5 border-[#004AAD]   border  w-64  rounded-md border-2 bg-[#004AAD1A] items-center cursor-pointer '>
    <div className='flex justify-between gap-7'>
        <div>
            <h1>Pending Payment</h1>
        <h1>Count</h1>

        </div>

        <div>
            <h1 className='text-[#004AAD] font-bold text-2xl '>50</h1>
        </div>
        
    </div>

    <div className='flex justify-between gap-7 mt-3'>
        <div>
            <h1>Partial Payment</h1>
        <h1>Count</h1>

        </div>

        <div className='text-[#004AAD] font-bold '>
            <h1  className='text-2xl'>50</h1>
        </div>
        
    </div>

    <div className='flex justify-between gap-7 mt-3'>
        <div>
            <h1>Full Payment</h1>
        <h1>Count</h1>

        </div>

        <div className='text-[#004AAD] font-bold '>
            <h1 className='text-2xl' >50</h1>
        </div>
        
    </div>
      
    </div>
  )
}
