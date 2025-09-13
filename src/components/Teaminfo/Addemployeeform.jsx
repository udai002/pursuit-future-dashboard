import React, { useState } from 'react'
import Teaminfo from './Teaminfo'
import toast from 'react-hot-toast'

const Addemployeeform = ({teamsInfo ,handleCloseModal}) => {

    [ 
            "Admin" ,
            // "Operations" , 
            // "HR" , 
            // "Team Lead" , 
            // "Intern" , 
            // "Post Sales" , 
            "Digital Marteking"
         ]

    const [username , setUsername] = useState("")
    const [email , setEmail] = useState("")
    const [phone , setPhone] = useState("")
    const [whatsappNumber , setWhatsappNumber] = useState("")
    const [role  , setRole] = useState("Intern")
    const [password , setPassword] = useState("")
    const [team , setTeam] = useState("")
    const [officeLocation , setOfficeLocation] = useState("Hyderabad")

    console.log(teamsInfo)

    async function handleCreateEmployee(e){
        e.preventDefault()
        if(!username || !email || !phone || !password || !officeLocation ){
            toast.error("All Fields are mandatory")
            return 
        }

        try{
            const options = {
                method:"POST" , 
                headers:{
                    "Content-Type":"application/json"
                } , 
                body:JSON.stringify({username , email , phone , password , officeLocation , whatsappNumber , role , teamId:team})
            }
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user` , options)
            const result = await response.json() 
            if(response.ok){
                toast.success(result.msg)
                setUsername("")
                setPassword("")
                setEmail("")
                setOfficeLocation("Hyderabad")
                setTeam("")
                setWhatsappNumber("")
                setRole("Intern")
                setPhone("")
                handleCloseModal()
            }else{
                toast.error(result.msg)
            }
        }catch(e){
            console.log("Error while creating Employee..." ,e)
            toast.error("Network Error")
        }
    }

    return (
         <div className='flex justify-center items-center bg-black/75 w-screen h-screen fixed top-0 left-0' >
            <div className='w-[850px] p-6 bg-white border fixed border-[#004AAD] rounded-lg'>
                 <div className='absolute flex justify-end w-[93%] items-center'>
                    <button className='font-bold text-xl ' onClick={()=>handleCloseModal()}>X</button>
                </div>
                <form className='grid-cols-2 gap-4' onSubmit={handleCreateEmployee}>
                    <p className='font-Regular font-family:DM Sans text-[#444444]'>Add Employee</p>
                    <div className='flex gap-3 p-2 '>
                        <input type="text" placeholder='Employee name' className='border-2 border-[#004AAD] p-3 rounded-lg w-full' value={username} onChange={(e)=>setUsername(e.target.value)} />
                        <input type="text" placeholder='Employee Email ID' className='border-2 border-[#004AAD] p-3 rounded-lg w-full'  value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className='flex gap-3 p-2'>
                        <input type="text" placeholder='Employee Contact Number' className='border-2 border-[#004AAD] p-3 rounded-lg w-full'  value={phone} onChange={(e)=>setPhone(e.target.value)} />
                        <input type="text" placeholder='Employee  WhatsApp Number' className='border-2 border-[#004AAD] p-3 rounded-lg w-full'  value={whatsappNumber} onChange={(e)=>setWhatsappNumber(e.target.value)}/>
                    </div>
                    <div className='flex gap-3 p-2'>
                        <select
                            className="border border-[#004AAD] p-3 rounded-lg w-full text-[#004AAD]"
                            defaultValue="" value={role} onChange={e=>setRole(e.target.value)}>
                            <option value="Intern"  className='text-[#004AAD]'>Intern</option>
                            <option value="Admin"  className='text-[#004AAD]'>Admin</option>
                            <option value="Operations"  className='text-[#004AAD]'>Operations</option>
                            <option value="HR"  className='text-[#004AAD]'>HR</option>
                            <option value="Team Lead"  className='text-[#004AAD]'>Team Lead</option>
                            <option value="Post Sales"  className='text-[#004AAD]'>Post Sales</option>
                            <option value="Digital Marteking"  className='text-[#004AAD]'>Digital Marteking</option>
                        </select>
                        <input value={password} onChange={e=>setPassword(e.target.value)} type="text" placeholder='Employee Password' className='border-2 border-[#004AAD] p-3 rounded-lg w-full' />
                    </div>
                    <div className='flex gap-3 p-2'>
                        <select
                        value={team} onChange={e=>setTeam(e.target.value)}
                            className="border border-[#004AAD] p-3 rounded-lg w-full text-[#004AAD]" defaultValue={teamsInfo[0]._id}>
                            {teamsInfo.map(item=>{
                                console.log(item)
                                 return <option value={item._id}  className='text-[#004AAD]'>{item.name}</option>})}
                        </select>
                        <select
                            className="border border-[#004AAD] p-3 rounded-lg w-full text-[#004AAD]"
                            defaultValue="" value={officeLocation} onChange={e=>setOfficeLocation(e.target.value)}>
                            <option value="Hyderabad"  className="text-[#004AAD]">Hyderabad</option>
                            <option value="Banglore"  className="text-[#004AAD]">Banglore</option>
                        </select>
                    </div>
                    <div>
                        <button type='submit' className='bg-[#004AAd] text-white p-2 rounded-lg'>Add </button>
                    </div>
                </form>
               
            </div>
        </div>
    )
}

export default Addemployeeform
