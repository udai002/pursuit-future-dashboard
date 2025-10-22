const allEmployee = async()=>{
    try{
const data = await fetch('http://localhost:3000/api/Allusers')
const response = await data.json()
return response.users
    }catch(error){
       console.log("error in fetching users") 
    }
}