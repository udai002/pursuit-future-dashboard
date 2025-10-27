import React, { useEffect, useState } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import { FaRegUserCircle } from "react-icons/fa";
import CustomInput from '../../../components/ui/CustomInput';
import { TbLockPassword } from "react-icons/tb";
import CustomButton from '../../../components/ui/CustomButton';
import useAuth from '../../../context/AuthContext';
import { useNavigate } from 'react-router';



const Signin = () => {

    const [loginLoading , setLoginLoading] = useState(false)

    const [username, setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [isDisabled , setIsDisabled] = useState(true)

    const {loginUser , loading , isLoggedIn , loadingAuth} = useAuth()
    const navigate = useNavigate()


     useEffect(() => {
    if (!loadingAuth && isLoggedIn) {
      navigate("/"); // redirect to home if already logged in
    }
  }, [isLoggedIn, loadingAuth, navigate]);

    async function  onSubmitLogin(e){
        e.preventDefault()
        if(!password || !username){
            toast.error("All fields are mandatory")
            return 
        }
        
        console.log("this is running")
        await loginUser({email:username , password})

    }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center '>
      <h1 className='font-bold text-2xl mb-2'>Pursuit Future Dashboard</h1>
      <p className='mb-2 text-gray-600'>From where everything Starts...</p>
      <div  className='flex flex-col gap-4 items-center border-2 p-8 py-10 border-[#004AAD] rounded-xl'>
      <form onSubmit={onSubmitLogin} className='flex flex-col gap-4 w-[250px]'>
        <CustomInput type={"text"} title="Username" icon={<FaRegUserCircle className='text-xl text-[#004AAD]'/>} onChange={(e)=>setUsername(e.target.value)} value={username} />
        <CustomInput type={"password"} title="Password" icon={<TbLockPassword className='text-xl text-[#004AAD]'/>} onChange={(e)=>setPassword(e.target.value)} value={password}/>
        <CustomButton type={"submit"} isLoading={loading} title="Enter the portal"  />
      </form>
       <div className='-mt-2 flex'>
            <button className='text-sm font-semibold text-[#004AAD]' onClick={()=>{navigate('/forgotPassword')}}>Forgot Password?</button>
        </div>
      </div>
    </div>
  )
}

export default Signin
