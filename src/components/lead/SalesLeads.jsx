

import React, { useState, useEffect } from 'react';
import Table from '../table';
import CustomSelect from '../button/CustomSelect';
import useAuth from '../../context/AuthContext';

const SalesLeads = () => {
  const { userDetails } = useAuth();
  const [salesLeadData, setSalesLeadData] = useState([]);
  const [month, setMonth] = useState('');
  const [teamName, setTeamName] = useState('');
  const [username, setUsername] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [teams, setTeams] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  // fetch teams for dropdown (only admin / TL)
  useEffect(()=>{
    if(userDetails.role==="Admin" || userDetails.role==="Team Lead"){
      fetch('http://localhost:3000/team/team')
        .then(res=>res.json())
        .then(data=>{
          const formattedTeams = data.map(t=>({ id:t.name,label:t.name,_id:t._id }));
          setTeams(formattedTeams);
        }).catch(console.error);
    }
  },[userDetails.role]);

  // fetch team members for selected team
  useEffect(()=>{
    if(!teamName) return setTeamMembers([]);
    const selectedTeam = teams.find(t=>t.id===teamName);
    if(!selectedTeam) return setTeamMembers([]);
    fetch(`http://localhost:3000/team/team/${selectedTeam._id}`)
      .then(res=>res.json())
      .then(data=>{
        const members = data.employees.map(m=>({ id:m._id,label:m.username }));
        setTeamMembers(members);
      }).catch(console.error);
  },[teamName, teams]);

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

  useEffect(()=>{ fetchSalesLead() }, [month, teamName, username, page, limit]);

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

      <Table columns={columns} data={salesLeadData} />
    </div>
  );
};

export default SalesLeads;
