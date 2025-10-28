import { PiSquaresFourLight } from "react-icons/pi";
import { FaTruckFast } from "react-icons/fa6";
import Button from "./Button";
import useAuth from "../../context/AuthContext";

const OptionsList = [
  {
    id: 1,
    title: "Overview",
    icon: <PiSquaresFourLight className="h-7 w-7" />,
    link: "/",
    access:[ 
            "Admin" ,
            "Operations" , 
            "HR" , 
            "Team Lead" , 
            "Intern" , 
            "Post Sales" , 
            "Digital Marteking"
         ],
  },
  {
    id: 2,
    title: "Attendence",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link: "/attendence",
    access:[ 
            // "Admin" ,
            "Operations" , 
            "HR" , 
            "Team Lead" , 
            "Intern" , 
            "Post Sales" , 
            "Digital Marteking"
         ],
  },
  {
    id: 3,
    title: "Team Info",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link: "/teaminfo",
    access:[ 
            "Admin" ,
            // "Operations" , 
            // "HR" , 
            // "Team Lead" , 
            // "Intern" , 
            // "Post Sales" , 
            // "Digital Marteking"
         ],
  },
  {
    id: 4,
    title: "Sales Leads Info",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link: "SalesLeadInfo",
    access:[ 
            "Admin" ,
            // "Operations" , 
            // "HR" , 
            // "Team Lead" , 
            // "Intern" , 
            // "Post Sales" , 
            // "Digital Marteking"
         ],
  },
  {
    id: 4,
    title: "Sales Leads Info",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link: "int",
    access:[ 
            // "Admin" ,
            // "Operations" , 
            // "HR" , 
            // "Team Lead" , 
            "Intern" , 
            // "Post Sales" , 
            // "Digital Marteking"
         ],
  },
  {
    id: 5,
    title: "Lead Gen. Info",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link: "/lead",
    access:[ 
            "Admin" ,
            // "Operations" , 
            // "HR" , 
            // "Team Lead" , 
            "Intern" , 
            // "Post Sales" , 
            // "Digital Marteking"
         ],
  },
  {
    id: 6,
    title: "Payment Links",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link: "/pay",
    access:[ 
            "Admin" ,
            "Operations" , 
            // "HR" , 
            "Team Lead" , 
            "Intern" , 
            "Post Sales" , 
            // "Digital Marteking"
         ],
  },
  {
    id: 7,
    title: "DPS Data",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link: "/dps",
    access:[ 
            "Admin" ,
            "Operations" , 
            // "HR" , 
            // "Team Lead" , 
            "Intern" , 
            "Post Sales" , 
            // "Digital Marteking"
         ],
  },
  {
    id: 8,
    title: "Announcements",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link: "/announcements",
    access:[
            "Admin" ,
            // "Operations" , 
            // "HR" , 
            // "Team Lead" , 
            // "Intern" , 
            // "Post Sales" , 
            "Digital Marteking"

         ]
  },
   {
    id:8,
    title: "MembersInfo",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link:"/MembersInfo",
    access:[
            // "Admin" ,
            // "Operations" , 
            // "HR" , 
            "Team Lead" , 
            // "Intern" , 
            // "Post Sales" , 
            // "Digital Marteking"
         ]
  },
  {
    id:9,
    title: "EmployeesInfo",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link:"/employeeInfo",
    access:[
            // "Admin" ,
            // "Operations" , 
            "HR" , 
            // "Team Lead" , 
            // "Intern" , 
            // "Post Sales" , 
            // "Digital Marteking"
         ]
  },
  {
    id:10,
    title: "StudentsInfo",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link:"/studentsinfo",
    access:[
            // "Admin" ,
            "Operations" , 
            // "HR" , 
            // "Team Lead" , 
            "Intern" , 
            "Post Sales" , 
            // "Digital Marteking"
         ]
  }
];


function Scrollbody() {
  
  const {userDetails , isLoggedIn   , loadingAuth} = useAuth()
  console.log('this is ' , userDetails , isLoggedIn)
  console.log('this is accress control' , OptionsList[0].access===userDetails?.role)
  return (
    <>
      <div className="overflow-y-auto p-2 h-[50%] md:h-[50%] overflow-scrollbar-hide md:p-2 w-72   ">
        {OptionsList.map((item) => item.access.includes(userDetails?.role) && (
          <Button
            className="w-60"
            link={item.link}
            icon={item.icon}
            title={item.title}
            options={item.options}
          />
        ))}
        {}
      </div>
    </>
  );
}

export default Scrollbody;
