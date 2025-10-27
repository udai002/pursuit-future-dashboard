// import React, { useState, useEffect } from 'react';
// import Table from '../table';
// import CustomSelect from '../button/CustomSelect';

// const SalesLeads = () => {
//   const [salesLeadData, setSalesLeadData] = useState([]);
//   const [month, setMonth] = useState('');
//   const [teamName, setTeamName] = useState('');
//   const [username, setUsername] = useState('');
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);

//   const [teams, setTeams] = useState([]);
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [filteredMembers, setFilteredMembers] = useState([]);


//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const res = await fetch('http://localhost:3000/team/team');
//         if (!res.ok) throw new Error('Failed to fetch teams');
//         const data = await res.json();
   
//         const formattedTeams = data.map(team => ({ id: team.name, label: team.name, _id: team._id }));
//         setTeams(formattedTeams);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchTeams();
//   }, []);

  
//   useEffect(() => {
   
//     if (!teamName) {
//       setTeamMembers([]);
//       return;
//     }

//     const selectedTeam = teams.find(t => t.id === teamName);
//     console.log("selectedTeam",selectedTeam._id)
//     if (!selectedTeam) {
//       setTeamMembers([]);
//       return;
//     }

//     const fetchTeamMembers = async () => {
//       try {
       
//         const res = await fetch(`http://localhost:3000/team/team/${selectedTeam._id}`);
//         if (!res.ok) throw new Error('Failed to fetch team members');
//         const data = await res.json();
       
//         const formattedMembers = data?.employees.map(member => ({
//           id: member._id, 
//           label: member.username, 
//         }));
//         setTeamMembers(formattedMembers);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchTeamMembers();

//   }, [teamName, teams]);

//   useEffect(() => {
//     if (!teamMembers || !Array.isArray(teamMembers)) {
//       setFilteredMembers([]);
//       setUsername('');
//       return;
//     }

//     setFilteredMembers(teamMembers);

//     if (!teamMembers.find(m => m.id === username)) {
//       setUsername('');
//     }
//   }, [teamMembers, username]);

//   const fetchSalesLead = async () => {
//     try {
//       const params = new URLSearchParams();
//       if (month) params.append('month', month);
//       if (teamName) params.append('teamName', teamName);
//       if (username) params.append('username', username);

//       const response = await fetch(`http://localhost:3000/saleslead/salelead?page=${page}&limit=${limit}&${params.toString()}`);
//       if (!response.ok) throw new Error('Failed to fetch leads');
//       const data = await response.json();
//       setSalesLeadData(data.salesLeads);
//       setTotalPages(data.pages);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchSalesLead();
//   }, [month, teamName, username, page, limit]);

//   const columns = [
//     { id: "name", header: "Lead Name" },
//     { id: "Email", header: "Email ID" },
//     { id: "contactNumber", header: "Phone Number" },
//     { id: "branch", header: "Department/Branch" },
//     { id: "collegaName", header: "College" },
//     { id: "domain1", header: "Course Interest" },
//     { id: "yearOfStudy", header: "Batch" },
//     {
//       id: "status", header: "Status", cell: (row) => (
//         <div className='border-2 rounded-xl border-blue-700 p-2'>
//           <select className='w-50'>
//             <option value="Not Interested">Not Interested</option>
//             <option value="Answered">Answered</option>
//             <option value="Follow Up">Follow Up</option>
//             <option value="Parents Update">Parents Update</option>
//           </select>
//         </div>
//       )
//     },
//   ];

//   return (
//     <div className="mt-6 px-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-sans">Leads Info</h2>
//         <div className="flex gap-3">
//           <CustomSelect
//             title="Month"
//             options={[
//               { id: "January", label: "January" },
//               { id: "February", label: "February" },
//               { id: "March", label: "March" },
//               { id: "April", label: "April" },
//               { id: "May", label: "May" },
//               { id: "June", label: "June" },
//               { id: "July", label: "July" },
//               { id: "August", label: "August" },
//               { id: "September", label: "September" },
//               { id: "October", label: "October" },
//               { id: "November", label: "November" },
//               { id: "December", label: "December" },
//             ]}
//             value={month}
//             onChange={e => setMonth(e.target.value)}
//           />

//           <CustomSelect
//             title="Team Name"
//             options={teams}
//             value={teamName}
//             onChange={e => setTeamName(e.target.value)}
//           />

//           <CustomSelect
//             title="Team Member"
//             options={filteredMembers}
//             value={username}
//             onChange={e => setUsername(e.target.value)}
//             disabled={!teamName}
//           />
//         </div>
//       </div>

//       <div className='mt-[0.5%]'>
//         <Table columns={columns} data={salesLeadData} />
//       </div>
//     </div>
//   );
// };

// export default SalesLeads;
import React, { useState, useEffect } from 'react';
import Table from '../table';
import CustomSelect from '../button/CustomSelect';

const SalesLeads = () => {
  const { userDetails } = useAuth();
  const [salesLeadData, setSalesLeadData] = useState([]);
  const [month, setMonth] = useState('');
  const [teamName, setTeamName] = useState('');
  const [username, setUsername] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [teams, setTeams] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);


  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch('http://localhost:3000/team/team');
        if (!res.ok) throw new Error('Failed to fetch teams');
        const data = await res.json();
   
        const formattedTeams = data.map(team => ({ id: team.name, label: team.name, _id: team._id }));
        setTeams(formattedTeams);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeams();
  }, []);

  
  useEffect(() => {
   
    if (!teamName) {
      setTeamMembers([]);
      return;
    }

    const selectedTeam = teams.find(t => t.id === teamName);
    console.log("selectedTeam",selectedTeam._id)
    if (!selectedTeam) {
      setTeamMembers([]);
      return;
    }

    const fetchTeamMembers = async () => {
      try {
       
        const res = await fetch(`http://localhost:3000/team/team/${selectedTeam._id}`);
        if (!res.ok) throw new Error('Failed to fetch team members');
        const data = await res.json();
       
        const formattedMembers = data?.employees.map(member => ({
          id: member._id, 
          label: member.username, 
        }));
        setTeamMembers(formattedMembers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeamMembers();

  }, [teamName, teams]);

  useEffect(()=>{
    setFilteredMembers(teamMembers);
    if(!teamMembers.find(m=>m.id===username)) setUsername('');
  },[teamMembers, username]);

  const fetchSalesLead = async () => {
    const params = new URLSearchParams();
    if(month) params.append('month', month);
    if(teamName) params.append('teamName', teamName);
    if(username) params.append('username', username);

    const res = await fetch(`http://localhost:3000/saleslead/allLeads?page=${page}&limit=${limit}&${params.toString()}`,{
      headers: { Authorization: `Bearer ${localStorage.getItem('session_token')}` }
    });
    const data = await res.json();
    setSalesLeadData(data.salesLeads);
    setTotalPages(data.pages);
  };

  useEffect(() => {
    fetchSalesLead();
  }, [month, teamName, username, page, limit]);

  const columns = [
    { id: "name", header: "Lead Name" },
    { id: "Email", header: "Email ID" },
    { id: "contactNumber", header: "Phone Number" },
    { id: "branch", header: "Department/Branch" },
    { id: "collegaName", header: "College" },
    { id: "domain1", header: "Course Interest" },
    { id: "yearOfStudy", header: "Batch" },
    { id: "status", header: "Status", cell: row=>(
      <select className="border p-1 rounded">{['Not Interested','Answered','Follow Up','Parents Update'].map(o=>(
        <option key={o} value={o}>{o}</option>
      ))}</select>
    )}
  ];

  return (
    <div className="mt-6 px-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-sans">Leads Info</h2>
        <div className="flex gap-3">
          <CustomSelect title="Month" options={[
            {id:"January",label:"January"},{id:"February",label:"February"},{id:"March",label:"March"},
            {id:"April",label:"April"},{id:"May",label:"May"},{id:"June",label:"June"},
            {id:"July",label:"July"},{id:"August",label:"August"},{id:"September",label:"September"},
            {id:"October",label:"October"},{id:"November",label:"November"},{id:"December",label:"December"}
          ]} value={month} onChange={e=>setMonth(e.target.value)}/>
          
          {(userDetails.role==="Admin"||userDetails.role==="Team Lead") && (
            <>
              <CustomSelect title="Team Name" options={teams} value={teamName} onChange={e=>setTeamName(e.target.value)}/>
              <CustomSelect title="Team Member" options={filteredMembers} value={username} onChange={e=>setUsername(e.target.value)} disabled={!teamName}/>
            </>
          )}
        </div>
      </div>

      <div className='mt-[0.5%]'>
        <Table columns={columns} data={salesLeadData} />
      </div>
    </div>
  );
};

export default SalesLeads;
