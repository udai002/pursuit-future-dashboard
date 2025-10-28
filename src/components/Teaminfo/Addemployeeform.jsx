import React, { useEffect, useState } from 'react'
import Teaminfo from './Teaminfo'
import toast from 'react-hot-toast'
import uploadProfile from '../../assets/Teaminfo/uploadProfile.png'
import { useRef } from 'react'
// import Select from 'react-select/base'

const Addemployeeform = ({ teamsInfo, handleCloseModal }) => {

    // [ 
    //         "Admin" ,
    //         // "Operations" , 
    //         // "HR" , 
    //         // "Team Lead" , 
    //         // "Intern" , 
    //         // "Post Sales" , 
    //         "Digital Marteking"
    //      ]
    const filePath = useRef()
    const handleEvent = () => {
        filePath.current.click()
    }

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [whatsappNumber, setWhatsappNumber] = useState("")
    const [role, setRole] = useState("Intern")
    const [password, setPassword] = useState("")
    const [officeLocation, setOfficeLocation] = useState("Hyderabad")
    const [openTeam , setOpenTeam] = useState(false)
    const [team, setTeam] = useState([]);
    const [employeeId , setEmployeeId] = useState("") 

    const options = teamsInfo.map(item => ({
        value: item._id,
        label: item.name
    }));

    useEffect(()=>{} , [])

    function TeamName(value){
        const optionName = options.find(item=>item.value===value)
        return optionName
    }
    const isDigitalMarketing = role==="Digital Marketing"
    const isAdmin = role === "Admin"
    
    async function handleCreateEmployee(e) {
        e.preventDefault()
        if (!username || !email || !phone || !officeLocation) {
            toast.error("All Fields are mandatory")
            return
        }

        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, phone, password, officeLocation, whatsappNumber, role, teamId: team  , employeeId })
            }
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, options)
            const result = await response.json()
            if (response.ok) {
                // console.log("form suser", result.data)
                toast.success(result.msg)
                setUsername("")
                setPassword("")
                setEmail("")
                setOfficeLocation("Hyderabad")
                setTeam("")
                setWhatsappNumber("")
                setRole("Intern")
                setPhone("")
                setEmployeeId("")
                handleCloseModal()
            } else {
                toast.error(result.msg)
            }
        } catch (e) {
            console.log("Error while creating Employee...", e)
            toast.error("Network Error")
        }
    }

    return (
        <div className='flex justify-center items-center bg-black/75 w-screen h-screen fixed top-0 left-0' >
            <div className='w-[850px]  p-6 bg-white border-2 fixed border-[#004AAD] rounded-lg'>
                <div className='absolute flex justify-end w-[93%] items-center'>
                    <button className='font-bold text-xl ' onClick={() => handleCloseModal()}>X</button>
                </div>
                <form className='grid-cols-2 gap-4' onSubmit={handleCreateEmployee}>
                    <p className='font-Regular font-family:DM Sans text-[#444444]'>Add Employee</p>
                    <div className='flex '>
                        <div className=' w-1/2 rounded-2xl '>
                            <div className='flex  p-2 '>
                                {/* <input type="text" placeholder='Employee name' className='border-2 border-[#004AAD] p-3 rounded-lg w-full' value={username} onChange={(e)=>setUsername(e.target.value)} /> */}
                                <select className="border border-[#004AAD] p-3 border-2 rounded-2xl text-lg w-full  " defaultValue="" value={role} onChange={e => setRole(e.target.value)} >
                                    {/* <option value="" className="text-[#004AAD] ">Employee Type</option> */}
                                    <option value="Intern" className='text-[#004AAD] '>Intern</option>
                                    <option value="Admin" className='text-[#004AAD]'>Admin</option>
                                    <option value="Operations" className='text-[#004AAD]'>Operations</option>
                                    <option value="HR" className='text-[#004AAD]'>HR</option>
                                    <option value="Team Lead" className='text-[#004AAD]'>Team Lead</option>
                                    <option value="Post Sales" className='text-[#004AAD]'>Post Sales</option>
                                    <option value="Digital Marketing" className='text-[#004AAD]'>Digital Marketing</option>
                                </select>

                            </div>
                            <div className='flex gap-3 p-2'>

                                <input type="text" placeholder='Employee Name' className='border-2 border-[#004AAD] p-3 rounded-2xl w-full placeholder:text-lg placeholder:border-2' value={username} onChange={(e) => setUsername(e.target.value)} />
                                {/* <input type="text" placeholder='Employee  WhatsApp Number' className='border-2 border-[#004AAD] p-3 rounded-lg w-full'  value={whatsappNumber} onChange={(e)=>setWhatsappNumber(e.target.value)}/> */}
                            </div>
                            {/* <div className='flex gap-3 p-2'>
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
                                // <input value={password} onChange={e=>setPassword(e.target.value)} type="text" placeholder='Employee Password' className='border-2 border-[#004AAD] p-3 rounded-lg w-full' />
                            </div> */}
                            <div className='flex gap-3 p-2'>

                                <input type="text" placeholder='Employee Email ID' className='border-2 border-[#004AAD] p-3 rounded-2xl w-full placeholder:text-lg' value={email} onChange={(e) => setEmail(e.target.value)} />

                            </div>
                             <div className='flex gap-3 p-2'>

                                <input type="text" placeholder='Employee ID' className='border-2 border-[#004AAD] p-3 rounded-2xl w-full placeholder:text-lg' value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />

                            </div>
                        </div>
                        <div className='border-2 rounded-2xl border-[#004AAD] w-1/2  p-3 flex flex-col text-center'>
                            <div className=' flex flex-col justify-center align-center h-full '>

                                <input type="file" name="" id="" ref={filePath} hidden />
                                <div className='flex flex-col justify-center align-center ' onClick={handleEvent}>
                                    <p className='#444444 text-[16px]'>Upload Profile</p>
                                    <div className=' flex justify-center align-center'>
                                        <img src={uploadProfile} alt="" className=' w-10 h-10' />
                                    </div>
                                    <p className='text-[#888888]'>Supported  format png,jpg,or jpeg</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='flex gap-3 p-2'>
                        <input type="text" placeholder='Employee Contact Number' className='border-2 border-[#004AAD] p-3 rounded-2xl w-1/2 placeholder:text-lg' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <input type="text" placeholder='Employee  WhatsApp Number' className='border-2 border-[#004AAD] p-3 rounded-2xl w-1/2' value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} />
                    </div>
                    <div className='flex gap-3 p-2'>
                        <div className='flex flex-col border-2 border-[#004AAD] p-3 rounded-2xl  text-[#004AAD]'>
                            <label htmlFor="selectTeam" className='w-full'>
                            {team.map(item=><span className='m-1 border-2 p-1 rounded-full bg-slate-300'>{TeamName(item).label}</span>)}
                        </label>
                         <select
                         id='selectTeam'
                            className=" p-3  text-[#004AAD] "
                             value={team} onChange={e => setTeam([...team , e.target.value])}
                             disabled={isDigitalMarketing || isAdmin}>
                            {options.filter(item=>team.includes(item.value)===false).map(item=> <option value={item.value} className="text-[#004AAD]">{item.label}</option>)}
                        </select>
                        </div>
                        <select
                            className="border-2 border-[#004AAD] p-3 rounded-2xl w-1/2 text-[#004AAD]"
                            defaultValue="" value={officeLocation} 
                            onChange={e => setOfficeLocation(e.target.value)}
                            disabled={isDigitalMarketing || isAdmin} >
                            <option value="Hyderabad" className="text-[#004AAD]">Hyderabad</option>
                            <option value="Banglore" className="text-[#004AAD]">Banglore</option>
                        </select>
                    </div>
                    <div className='flex justify-end'>
                        <button type='submit' className='bg-[#004AAd] text-white p-2 px-4 rounded-lg'> Add </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Addemployeeform
