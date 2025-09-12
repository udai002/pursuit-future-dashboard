import React from 'react'
import useAuth from '../../context/AuthContext'

const Home = () => {
  const {userDetails} = useAuth()
  console.log("user details...." ,userDetails)
  console.log(userDetails?.role);
  localStorage.setItem('role',userDetails.role)
  console.log("please check in the local storage");
  
  
  return (
    <div className=''>
      this is home page
    </div>
  )
}

export default Home
