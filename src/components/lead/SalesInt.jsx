import React, { useState, useEffect } from 'react';
import Table from '../table';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import useAuth from '../../context/AuthContext';
import toast from 'react-hot-toast';

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

function getRecordMonth(rec) {
  const candidates = [rec?.createdAt, rec?.created_at, rec?.date, rec?.Date, rec?.updatedAt];
  for (const c of candidates) {
    if (!c) continue;
    const d = new Date(c);
    if (!Number.isNaN(d.getTime())) return d.getMonth() + 1;
  }
  return null;
}

function getRecordISODate(rec) {
  const candidates = [rec?.createdAt, rec?.created_at, rec?.date, rec?.Date, rec?.updatedAt];
  for (const c of candidates) {
    if (!c) continue;
    const d = new Date(c);
    if (!Number.isNaN(d.getTime())) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }
  }
  return null;
}

const SalesInt = () => {
  const { userDetails } = useAuth();

  const [salesLeadData, setSalesLeadData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [statusMap, setStatusMap] = useState({});
  const [month, setMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const year = new Date().getFullYear();

  useEffect(() => {
    const fetchLeads = async () => {
      if (!userDetails?._id) return;

      try {
        const base =
          userDetails.role === "Admin"
            ? `${import.meta.env.VITE_BACKEND_URL}/saleslead/allLeads`
            : `${import.meta.env.VITE_BACKEND_URL}/saleslead/salelead/employee/${userDetails._id}`;

        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (month) {
          params.append('month', month);
          params.append('year', String(year));
        }
        if (selectedDate) {
          params.append('date', selectedDate);
        }

        const url = `${base}?${params.toString()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch leads');

        const data = await res.json();
        const leads = data.salesLeads || data.data || [];

        setSalesLeadData(leads);
        setTotalPages(data.totalPages || Math.ceil((data.total || 0) / limit));

        const initialStatus = {};
        leads.forEach(item => {
          initialStatus[item._id] = item.status;
        });
        setStatusMap(initialStatus);
      } catch (error) {
        console.error("Error fetching leads:", error);
        toast.error("Failed to fetch leads");
      }
    };

    fetchLeads();
  }, [userDetails, page, limit, month, year, selectedDate]);

  // Client-side filters as fallback
  let filteredData = salesLeadData;
  if (month) filteredData = filteredData.filter(r => getRecordMonth(r) === Number(month));
  if (selectedDate) filteredData = filteredData.filter(r => getRecordISODate(r) === selectedDate);

  async function handleStatusChange(value, id) {
    setStatusMap(prev => ({ ...prev, [id]: value }));
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/saleslead/status/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: value }),
      });
      if (!res.ok) throw new Error();
      toast.success('Status updated successfully');
    } catch {
      toast.error('Failed to update status');
    }
  }

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
      cell: (row) => (
        <select
          className={`border p-1 rounded ${userDetails.role === "Admin" ? "bg-gray-200 cursor-not-allowed" : ""}`}
          value={statusMap[row._id] || 'Not Answered'}
          onChange={(e) => handleStatusChange(e.target.value, row._id)}
          disabled={userDetails.role === "Admin"}
        >
          {["Interested", "Not Interested", "Not Answered", "Follow Up", "Parents Update"].map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ),
    },
  ];

  return (
    <div className="px-6">
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
        <Table columns={columns} data={filteredData} />
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