import React, { useState, useEffect } from 'react';
import Table from '../table';
import CustomSelect from '../button/CustomSelect';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import useAuth from '../../context/AuthContext';
import toast from 'react-hot-toast';

const SalesInt = () => {
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

  // ✅ status per row storage
  const [statusMap, setStatusMap] = useState({});

  // ✅ Fetch Sales Leads for current employee
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch(`http://localhost:3000/saleslead/salelead/employee/${userDetails._id}?page=${page}`);
        if (!res.ok) throw new Error('Failed to fetch leads');
        const data = await res.json();

        setSalesLeadData(data.data);
        setTotalPages(data.pages || 1);

        // initialize statusMap
        const initialStatus = {};
        data.data.forEach(item => {
          initialStatus[item._id] = item.status;
        });
        setStatusMap(initialStatus);
      } catch (error) {
        console.error(error);
      }
    };

    if (userDetails?._id) fetchLeads();
  }, [userDetails, page]);

  // ✅ Update Status Function
  async function handleStatusChange(value, id) {
    // instant UI feedback
    setStatusMap(prev => ({ ...prev, [id]: value }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/saleslead/status/update/${id}`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ status: value }),
        }
      );

      if (!response.ok) throw new Error();
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  }

  // ✅ Pagination
  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  // ✅ Table Columns
  const columns = [
    { id: "name", header: "Lead Name" },
    { id: "contactNumber", header: "Phone Number" },
    { id: "branch", header: "Department/Branch" },
    { id: "collegaName", header: "College" },
    { id: "domain1", header: "Course Interest" },
    { id: "yearOfStudy", header: "Batch" },
    {
      id: "status",
      header: "Status",
      cell: (row) => (
        <select
          className="border p-1 rounded"
          value={statusMap[row._id] || 'Not Interested'}
          onChange={(e) => handleStatusChange(e.target.value, row._id)}
        >
          {['Not Interested', 'Answered', 'Follow Up', 'Parents Update'].map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ),
    },
  ];

  // ✅ UI
  return (
    <div className="mt-6 px-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-sans">Leads Info</h2>
        <div className="flex gap-3">
          <CustomSelect
            title="Month"
            options={[
              { id: "January", label: "January" },
              { id: "February", label: "February" },
              { id: "March", label: "March" },
              { id: "April", label: "April" },
              { id: "May", label: "May" },
              { id: "June", label: "June" },
              { id: "July", label: "July" },
              { id: "August", label: "August" },
              { id: "September", label: "September" },
              { id: "October", label: "October" },
              { id: "November", label: "November" },
              { id: "December", label: "December" },
            ]}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-[0.5%]">
        <Table columns={columns} data={salesLeadData} />
      </div>

      <div className="flex justify-center items-center mt-10 gap-4 px-7 mb-5 flex-row">
        <span className="text-lg flex-1 text-[#444444] font-medium sm:text-base md:text-lg sm:text-left">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className={`p-2 bg-[#004AAD] rounded-full ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FaArrowLeftLong className="text-2xl text-white" />
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`p-2 bg-[#004AAD] rounded-full ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FaArrowRightLong className="text-2xl text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesInt;
