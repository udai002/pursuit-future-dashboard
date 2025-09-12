import { Navigate } from "react-router";

import React from 'react'

const RoleBasedAccess = ({children,requiredRoles}) => {
    const role=localStorage.getItem('role')
    console.log("this is from the protected routes",role);

    if(!role){
        console.log("there is no role in the local storage");
        return <Navigate to='/login' replace/>
        
    }
    if(!requiredRoles.includes(role)){
        console.log("you are not allowed to access the pages");       
        return <Navigate to='/UnAuthorized' replace/>
    }
    
  return children
}

export default RoleBasedAccess