import React, { useState, useEffect } from 'react';
import Table from '../table';
import CustomSelect from '../button/CustomSelect';
import useAuth from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

const LeadAdmin = () => {
  const { userDetails } = useAuth();
  const [leadData, setLeadData] = useState([]);
  const [month, setMonth] = useState('');
  const [teamName, setTeamName] = useState('');
  const [username, setUsername] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [teams, setTeams] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  // ✅ Fetch teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch('http://localhost:3000/team/team');
        if (!res.ok) throw new Error('Failed to fetch teams');
        const data = await res.json();

        const formattedTeams = data.map(team => ({
          id: team.name,
          label: team.name,
          _id: team._id,
        }));
        setTeams(formattedTeams);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeams();
  }, []);

  // ✅ Fetch team members
  useEffect(() => {
    if (!teamName) {
      setTeamMembers([]);
      return;
    }

    const selectedTeam = teams.find(t => t.id === teamName);
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

  // ✅ Filtered members list
  useEffect(() => {
    setFilteredMembers(teamMembers);
    if (!teamMembers.find(m => m.id === username)) setUsername('');
  }, [teamMembers, username]);

  // ✅ Fetch Leads (with pagination)
  const fetchLeads = async () => {
    try {
      const params = new URLSearchParams();
      if (month) params.append('month', month);
      if (teamName) params.append('teamName', teamName);
      if (username) params.append('username', username);

      const res = await fetch(
        `http://localhost:3000/leadgen/leadgen/all?page=${page}&limit=${limit}&${params.toString()}`
      );

      const data = await res.json();
      setLeadData(data.leads || data);
      setTotalPages(data.pages || 1);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching leads');
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [month, teamName, username, page, limit]);

  const columns = [
    { id: 'name', header: 'Lead Name' },
    { id: 'email', header: 'Email ID' },
    { id: 'contactNumber', header: 'Phone Number' },
    { id: 'branch', header: 'Department/Branch' },
    { id: 'collegeName', header: 'College' },
    { id: 'domain1', header: 'Course Interest' },
    { id: 'yearOfStudy', header: 'Batch' },
    { id: 'status', header: 'Status' },
  ];

  // ✅ Pagination handlers
  const handlePrevPage = () => setPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage(prev => Math.min(prev + 1, totalPages));

  return (
    <div className="mt-6 px-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-sans">Lead Generation Info</h2>

        <div className="flex gap-3">
          <CustomSelect
            title="Month"
            options={[
              { id: 'January', label: 'January' },
              { id: 'February', label: 'February' },
              { id: 'March', label: 'March' },
              { id: 'April', label: 'April' },
              { id: 'May', label: 'May' },
              { id: 'June', label: 'June' },
              { id: 'July', label: 'July' },
              { id: 'August', label: 'August' },
              { id: 'September', label: 'September' },
              { id: 'October', label: 'October' },
              { id: 'November', label: 'November' },
              { id: 'December', label: 'December' },
            ]}
            value={month}
            onChange={e => setMonth(e.target.value)}
          />

          {(userDetails.role === 'Admin' || userDetails.role === 'Team Lead') && (
            <>
              <CustomSelect
                title="Team Name"
                options={teams}
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
              />

              <CustomSelect
                title="Team Member"
                options={filteredMembers}
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={!teamName}
              />
            </>
          )}
        </div>
      </div>

      <div className="mt-[0.5%]">
        <Table columns={columns} data={leadData} />
      </div>

      {/* ✅ Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="flex items-center gap-2 text-gray-700 hover:text-black disabled:opacity-50"
        >
          <FaArrowLeftLong /> Prev
        </button>

        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="flex items-center gap-2 text-gray-700 hover:text-black disabled:opacity-50"
        >
          Next <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
};

export default LeadAdmin;
