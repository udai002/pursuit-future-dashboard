 import React from 'react'
import useAuth from '../../context/AuthContext'

const Home = () => {
  const {userDetails} = useAuth()
  
  return (
    <div className=''>
      this is home page
    </div>
  )
}

export default Home
