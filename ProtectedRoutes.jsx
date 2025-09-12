import React from 'react'
import { Navigate } from 'react-router'
import useAuth from './src/context/AuthContext'


const ProtectedRoutes = () => {

  const {userDetails} = useAuth()
  console.log("this is the user details from the protected routes",userDetails)

  if(!userDetails){
      console.log("you don't have the user details means you are not allowed to enter into the application");      
     return <Navigate to='/login' replace/>
  }


  return (
    <div>ProtectedRoutes</div>
  )
}

export default ProtectedRoutes