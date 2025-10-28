import React, { useState, useEffect } from 'react';
import Table from '../table';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import useAuth from '../../context/AuthContext';
import toast from 'react-hot-toast';

const LeadInt = () => {
  const { userDetails } = useAuth();

  const [leadData, setLeadData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const fetchLeads = async () => {
      if (!userDetails?._id) return;

      try {
        let url;
        if (userDetails.role === "Admin") {
          url = `${import.meta.env.VITE_BACKEND_URL}/leadgen/all?page=${page}&limit=${limit}`;
        } else {
          url = `${import.meta.env.VITE_BACKEND_URL}/leadgen/employee/${userDetails._id}?page=${page}&limit=${limit}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch leads");

        const data = await res.json();
        const leads = data.leads || data.data || [];

        setLeadData(leads);
        setTotalPages(data.pages || Math.ceil((data.total || 1) / limit));

        const initialStatus = {};
        leads.forEach(item => {
          initialStatus[item._id] = item.status;
        });
        setStatusMap(initialStatus);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, [userDetails, page]);

  // ✅ Update Status Function (Employees only)
  async function handleStatusChange(value, id) {
    if (userDetails.role === "Admin") return; // Prevent Admin changes

    setStatusMap(prev => ({ ...prev, [id]: value }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/leadgen/leadgen/${id}`,
        {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ status: value }),
        }
      );

      if (!response.ok) throw new Error();
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  }

  //  Pagination
  const handlePrevious = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < totalPages && setPage(page + 1);

  //  Table Columns
  const columns = [
    { id: "name", header: "Lead Name" },
    { id: "contactNumber", header: "Phone Number" },y
    { id: "branch", header: "Department/Branch" },
    { id: "collegeName", header: "College" },
    { id: "domain1", header: "Course Interest" },
    { id: "yearOfStudy", header: "Batch" },
    {
      id: "status",
      header: "Status",
      cell: (row) => (
        <select
          className={`border p-1 rounded ${userDetails.role === "Admin" ? "bg-gray-200 cursor-not-allowed" : ""}`}
          value={statusMap[row._id] || 'Not Answered'}
          onChange={(e) => handleStatusChange(e.target.value, row._id)}
          disabled={userDetails.role === "Admin"}
        >
          {['Interested', 'Not Interested', 'Not Answered', 'Follow Up', 'Parents Update'].map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ),
    },
  ];

  //  UI
  return (
    <div className="mt-6 px-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-sans">Lead Generation Info</h2>
      </div>

      <Table columns={columns} data={leadData} />

      <div className="flex justify-center items-center mt-10 gap-4 px-7 mb-5 flex-row">
        <span className="text-lg flex-1 text-[#444444] font-medium">
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

export default LeadInt;
