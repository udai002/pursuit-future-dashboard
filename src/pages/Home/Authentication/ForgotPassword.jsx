import React, { useEffect, useState } from 'react'
import CustomInput from '../../../components/ui/CustomInput'
import { FaRegUserCircle } from "react-icons/fa";
import CustomButton from '../../../components/ui/CustomButton';
import { MdOutlinePassword } from "react-icons/md";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const forgotList  = {
    intialise:"INTIALISE" , 
    inProgess:"INPROGESS" , 
    emailSent:"EMAILSENT" , 
    verf:"NEW" , 
    Verified:"Verified",
    error:"ERROR",
    success:"SUCCESS"
}

const ForgotPassword = () => {

    

    const [email ,setEmail] = useState("")
    const [forgotStatus, setForgotStatus] = useState(forgotList.intialise)
    const [otp , setOtp] = useState("")
    const [loading , setLoading] = useState(false)
    const [password, setPassword] = useState("")
    const [confirm , setConfirm] = useState("")

    const navigate = useNavigate()

    useEffect(()=>{
        function checkStatus(){
            const status = localStorage.getItem("forgot_Pass" )
            const statusValue = JSON.parse(status)
            if(statusValue){
                setEmail(statusValue.email)
                setForgotStatus(statusValue.status)
            }
        }

        checkStatus()
    } , [])

    async function sendOtp(){
        try{
            const options = {
                method:"POST", 
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email})
            }
            setForgotStatus(forgotList.inProgess)
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/send-otp` , options)
            setLoading(false)
            const result = await response.json()
            console.log(result)
            if(response.ok){
                setForgotStatus(forgotList.emailSent)
                localStorage.setItem("forgot_Pass" ,JSON.stringify({email , status:forgotList.emailSent}))
                toast.success(result.msg)
            }else{
                setForgotStatus(forgotList.intialise)
                toast.error(result.msg)
            }

        }catch(error){
            console.log("Error in verifying Email"  , error)
            toast.error("Network error")
        }
    }

    async function verifyOtp(){
        try{
            const options = {
                method:"POST" , 
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email , otp})
            }
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/verifyEmail` , options)
            setLoading(false)
            const result = await response.json()
            if(response.ok){
                setForgotStatus(forgotList.Verified)
                 localStorage.setItem("forgot_Pass" ,JSON.stringify({email , status:forgotList.Verified}))
                toast.success(result.msg)
            }else{
                toast.error(result.msg)
            }
        }catch(error){
            console.log("Error in verifying Email"  , error)
            toast.error("Network error")
        }
    }

    async function reset(){
        try{
            if(!password || !confirm){
                toast.error("Enter password")
                return
            }
            if(password===confirm){
                const options = {
                    method:"PUT" , 
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({email , password})
                }
                setLoading(true)
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/reset-password` , options)
                setLoading(false)
                const result = await response.json()
                if(response.ok){
                    toast.success(result.msg)
                    navigate("/login")
                    setForgotStatus(forgotList.intialise)
                    localStorage.removeItem("forgot_Pass")
                }else{
                    toast.error(result.msg)
                    if(response.status === 401){
                        navigate("/login")
                        setForgotStatus(forgotList.intialise)
                        localStorage.removeItem("forgot_Pass")
                    }
                }
            }else{
                toast.error("Password doesn't match")
            }
        }catch(error){
            console.log("Error in Reset password"  , error)
            toast.error("Network error")
        }
    }

    function intialise(){

        async function handleSubmitEmail(e){
            e.preventDefault()
            await sendOtp()
        }

        return <div className='p-5'>
            <form className='flex flex-col gap-4'  onSubmit={handleSubmitEmail}>
                <CustomInput type={"text"} icon={<FaRegUserCircle/>} title="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <CustomButton  type={"submit"} isLoading={loading} title="Send OTP"/>
            </form>
        </div>
    }

    function emailOTP(){

        async function handleOtpVerification(e){
            e.preventDefault()
            await verifyOtp()
        }
        return <div>
                <p className='text-gray-700 w-[250px] font-semibold mb-2 text-center'>Enter OTP sent to email {email}</p>
             
            <form className='flex flex-col gap-4' onSubmit={handleOtpVerification}>
                <CustomInput type={"text"} icon={<MdOutlinePassword/>} title="XXXXXX" value={otp} onChange={e=>{setOtp(e.target.value)}}  />
                <CustomButton  type={"submit"} isLoading={loading} title="Verify OTP"/>
            </form>
        </div>
    }

    function resetPassword(){

        async function handleReset(e){
            console.log("reseting password...")
            e.preventDefault()
            await reset()
        }
        return <div>
            <form className='flex flex-col gap-4' onSubmit={handleReset}>
                <CustomInput type={"text"} icon={<MdOutlinePassword/>} title="New Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <CustomInput type={"text"} icon={<MdOutlinePassword/>} title="Old Password" value={confirm} onChange={(e)=>{setConfirm(e.target.value)}}  />
                <CustomButton isLoading={loading} type={"submit"} title="Save Password"/>
            </form>
        </div>
    }

    function renderFunction(){
        switch (forgotStatus) {
            case forgotList.intialise:
                return intialise()
            case forgotList.emailSent:
                return emailOTP()
            case forgotList.Verified:
                return resetPassword()
            default:
                break;
        }
    }



  return (
    <div className='flex w-screen flex-col gap-3 justify-center items-center h-screen'>
        <p className='font-semibold '>Forgot password don't worry..</p>
      {renderFunction()}
    </div>
  )
}

export default ForgotPassword
