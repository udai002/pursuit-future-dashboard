import React from 'react'

const CustomInput = ({icon , title , onChange  , value , type,name}) => {
  return (
        <div className='flex items-center gap-3 border-2 border-[#004AAD] p-2 rounded-xl w-full'>
        {icon}
      <input type={type} placeholder={title} onChange={onChange} name={name} value={value} className='outline-none w-full' />
    </div>
  )
}

export default CustomInput
