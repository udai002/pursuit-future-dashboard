import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


const AuthContext  = createContext({
    userDetails:null , 
    loading:false , 
    isLoggedIn:false , 
    loginUser:()=>{} ,
    sessionError:false ,
    loadingAuth:false , 
    logout:()=>{}
})

function AuthProvider({children}){

    const [userDetails , setUserDetails] = useState(null) 
    const [loading , setLoading] = useState(false)
    const [isLoggedIn , setIsLoggedIn] = useState(false)
    const [sessionError , setSessionError] = useState(false)
    const [loadingAuth  , setLoadingAuth] = useState(true)

    const navigate = useNavigate()


    useEffect(()=>{
        async function verifySession(){
            try{
                const JSONToken = localStorage.getItem("session_token")
                const token = JSON.parse(JSONToken)
                console.log("this is from session token" , token)
                const options = {
                    method:"GET" , 
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                }
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/details` , options)
                const result = await response.json()
                setLoadingAuth(false)
                if(response.ok){
                    setUserDetails(result.data)
                    setIsLoggedIn(true)
                }else{
                    setIsLoggedIn(false)
                    localStorage.removeItem("session_token")
                    toast.error(result.msg)
                    navigate("/login")
                }

                
            }catch(e){
                setSessionError(true)
                toast.error("Network Error")
                console.log("this is session error...", e)
            }
        }
        verifySession()


    }  , [])

    async function loginUser(data){

        console.log("this is running" , import.meta.env.VITE_BACKEND_URL)
        
        try{
            const options = {
                method:"POST" , 
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            }
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login` , options)
            setLoading(false)
            const result = await response.json()
            console.log("from authcontext",response)
            if(response.ok){
                toast.success(result.msg)
                console.log(result.token)
                setUserDetails(()=>result.user)
                localStorage.setItem("session_token" , JSON.stringify(result.token))
                navigate("/")
            }else{
                toast.error(result.msg)
            }
        }catch(e){
            console.log("Error in Login" , e)
            toast.error("Network Error")
        }
    }

    async function logout(){
        try{
            let token = localStorage.getItem("session_token")
            token = JSON.parse(token)
            console.log("this is error..." , token)
            navigate('/login')
            const options  ={
                method:"DELETE" ,
                headers:{
                    "Content-Type":"application/json"
                } ,
                body:JSON.stringify({token})
            }
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/logout` , options)
            const result = await response.json()
            console.log(result)
            if(response){
                toast.success(result.msg)
                navigate("/login")
            }else{
                toast.error(result.msg)
            }
            localStorage.removeItem('session_token')
        }catch(e){
            console.log("Error in logout",e)
        }
    }


    return <AuthContext.Provider value={{loading , isLoggedIn , userDetails , loginUser , sessionError , loadingAuth , logout}}>
        {children}
    </AuthContext.Provider>
}

function useAuth(){
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("Context not defined")
    }
    return context
}

export {AuthProvider}

export default useAuth