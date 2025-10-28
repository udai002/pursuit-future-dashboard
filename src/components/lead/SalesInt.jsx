import React, { useState, useEffect } from 'react';
import Table from '../table';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import useAuth from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

const monthOptions = [
  { value: '', label: 'Month' },
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const SalesInt = () => {
  const { userDetails } = useAuth();
  const { id: paramId } = useParams(); // ✅ get the id from the URL

  const [salesLeadData, setSalesLeadData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [statusMap, setStatusMap] = useState({});
  const [month, setMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const year = new Date().getFullYear();

   console.log(paramId)

  useEffect(() => {
    if (!userDetails?._id && !paramId) return; // ✅ wait until both are available
    const controller = new AbortController();

    const fetchLeads = async () => {
      try {
        const base =
          userDetails.role === "Admin"
            ? `${import.meta.env.VITE_BACKEND_URL}/saleslead/allLeads`
            : `${import.meta.env.VITE_BACKEND_URL}/saleslead/salelead/employee/${userDetails._id}`;

        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        
        // Add year parameter for month filtering
        if (month) {
          params.append('month', month);
          params.append('year', String(year));
        }
        
        // Add date parameter for date filtering
        if (selectedDate) {
          params.append('date', selectedDate);
        }

        const url = `${base}?${params.toString()}`;
        console.log('Fetching from:', url); // Debug log
        
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch leads');

        const data = await res.json();
        const leads = data.salesLeads || data.data || [];

        setSalesLeadData(leads);
        setTotalPages(
          data.totalPages
          || data.pages
          || Math.ceil((data.total || 0) / limit)
          || 1
        );
        
        const initialStatus = {};
        leads.forEach(item => {
          initialStatus[item._id] = item.status ?? 'Not Answered';
        });
        setStatusMap(initialStatus);
      } catch (error) {
        if (error.name === 'AbortError') return;
        console.error("Error fetching leads:", error);
        toast.error("Failed to fetch leads");
      }
    };

    fetchLeads();
  }, [userDetails, page, limit, month, year, selectedDate]);

  // Status update handler
  async function handleStatusChange(value, id) {
    if (!userDetails || userDetails.role === "Admin") return; // prevent admin updates

    setStatusMap(prev => ({ ...prev, [id]: value })); // optimistic update
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/saleslead/status/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: value }),
      });

      if (!res.ok) throw new Error('Failed to update status');
      toast.success('Status updated successfully');
    } catch (err) {
      toast.error('Failed to update status');
      console.error('Error updating status:', err);
      // Optional: revert UI or refetch
      setPage(prev => prev);
    }
  }

  // Pagination
  const handlePrevious = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < totalPages && setPage(page + 1);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setPage(1);
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setPage(1);
  }

  // Table columns
  const columns = [
    { id: "name", header: "Lead Name" },
    { id: "contactNumber", header: "Phone Number" },
    { id: "branch", header: "Department/Branch" },
    { id: "collegeName", header: "College" },
    { id: "domain1", header: "Course Interest" },
    { id: "yearOfStudy", header: "Batch" },
    {
      id: "status",
      header: "Status",
      cell: (row) => {
        const currentValue = statusMap[row._id] ?? row.status ?? 'Not Answered';
        const isAdmin = userDetails?.role === "Admin";

        return (
          <select
            className={`border p-1 rounded ${isAdmin ? "bg-gray-200 cursor-not-allowed" : ""}`}
            value={currentValue}
            onChange={(e) => {
              if (isAdmin) return;
              handleStatusChange(e.target.value, row._id);
            }}
            disabled={isAdmin}
          >
            {["Interested", "Not Interested", "Not Answered", "Follow Up", "Parents Update"].map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        );
      },
    },
  ];

  return (
    <div className="mt-6 px-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-sans">Sales Lead Info</h2>
        <div className="flex gap-2">
          <label className="bg-blue-800 text-white px-2 py-2 rounded flex items-center">
            <select
              className="bg-blue-800 text-white outline-none"
              value={month}
              onChange={handleMonthChange}
            >
              {monthOptions.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </label>
          <label className="bg-blue-800 text-white px-2 py-2 rounded flex items-center">
            <input
              type="date"
              className="bg-blue-800 text-white outline-none"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </label>
        </div>
      </div>

      <div className="mt-[0.1%]">
        <Table columns={columns} data={salesLeadData} />
      </div>

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

export default SalesInt;