import React from 'react'
import {ColorRing} from 'react-loader-spinner'
import {motion} from 'framer-motion'

const CustomButton = ({title , isLoading  , isDisabled, onClick , type }) => {
  return (
    <button className='bg-[#004AAD] p-3 w-full text-white rounded-xl font-semibold flex justify-center w-full' disabled={isDisabled||isLoading} onClick={onClick} type={type}>
      {isLoading?<motion.div initial={{width:0 ,opacity:0}} transition={{duration:0.3 , ease:"easeInOut"}} animate={{width:"100%" , opacity:1}} exit={{width:0 , opacity:0}} className='flex justify-center items-center gap-1'>
       <ColorRing height={24} width={24} colors={["white" ,"white" , "white","white","white"]}/> <span>Loading...</span>
      </motion.div>:<p>{title}</p>}
    </button>
  )
}

export default CustomButton
