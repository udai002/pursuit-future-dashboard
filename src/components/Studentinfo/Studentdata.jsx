import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { CiSearch } from "react-icons/ci";
import { FaFileCsv } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function Studentdata() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('')

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`http://localhost:3000/student/allstudent?search=${search}&page=${page}&limit=${limit}`);
        if (res.ok) {
          const result = await res.json();
          setData(result.allstudent);
        } else {
          console.error("Failed to fetch student info");
          setTotalPages(Math.ceil(result.total / limit));
        }
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };
    fetchStudents();
  }, [search, page, limit]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  }

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    await handleUpload(selectedFile);
  };

  const handleUpload = async (selectedFile) => {
    const fileToUpload = selectedFile || file;
    if (!fileToUpload) {
      toast.error("Please select the file");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);

    try {
      const res = await fetch("http://localhost:3000/student/studentinfo", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const uploadedData = await res.json();
        console.log(uploadedData);
        toast.success("CSV file uploaded successfully");
      } else {
        console.error("Failed to upload CSV file");
        toast.error("Failed to upload CSV file");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error uploading CSV file");
    }
  };
  const handleChange = async (e, id) => {
    const newStatus = e.target.value;
    setPaymentStatus(newStatus);

    try {
      const update = await fetch(`http://localhost:3000/student/student/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentStatus: newStatus }),
      });

      if (!update.ok) {
        throw new Error("Failed to update status");
      }

      const data = await update.json();
      console.log("Update successful:", data);
      fetchStudents();
    } catch (error) {
      console.error("Failed to update:", error);
    }

  };


  const columns = [
    { id: "name", header: "Student Name" },
    { id: "phoneNumber", header: "Contact Number" },
    { id: "PricePitched", header: "Price Pitched" },
    { id: "courseOpted", header: "Course Opted" },
    { id: "Registration", header: "Registration Date" },
    { id: "employeeIdemail", header: "Employee Email" },
    {
      header: "Payment Status",
      cell: (row) => (
        <div className="border rounded-xl text-center">
          <select
            value={row.paymentStatus}
            onChange={(e) => handleChange(e, row._id)}
            className="border-2 border-blue-700 rounded px-2 py-1 text-[#00499d]"
          >
            <option value="Paid">Paid</option>
            <option value="Not Paid">Not Paid</option>
          </select>

        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex gap-10">
        <div className="flex gap-1">
          <h1 className="flex-1 font-semibold p-2 text-[20px]">Students Info</h1>

          <select className="border-2 border-[#004AAD] rounded-xl w-[160px] h-[45px] bg-[#004AAD] text-[#fff]">
            <option value="">Employee Name</option>
          </select>
          <select className="border-2 border-[#004AAD] rounded-xl w-[160px] h-[45px] bg-[#004AAD] text-[#fff]">
            <option value="">Course</option>
          </select>
          {/* <select className="border-2 border-[#004AAD] rounded-xl w-[160px] h-[45px] bg-[#004AAD] text-[#fff]">
            <option value="">Program Type</option>
          </select>
          <select className="border-2 border-[#004AAD] rounded-xl w-[160px] h-[45px] bg-[#004AAD] text-[#fff]">
            <option value="">August</option>
          </select> */}
        </div>

        <div className="flex gap-2 items-center">
          
          <div className="relative">
            <CiSearch className="absolute top-3 left-2 text-[#004aad]" />
            <input
              type="text"
              placeholder="Search Here"
              value={search}
              onChange={handleSearch}
              className="border-2 border-[#004AAD] rounded-xl w-[160px] h-[45px] text-[16px] pl-8 bg-[#c7dbf5] text-[#004AAD]"
            />
          </div>

          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
            id="csvUpload"
          />
          <label
            htmlFor="csvUpload"
            className="border-2 border-[#004AAD] rounded-xl w-[160px] h-[45px] text-[16px] p-2 bg-[#004AAD] text-[#fff] flex items-center justify-center gap-2 cursor-pointer"
          >
            Import CSV File
            <FaFileCsv className="text-[#fff]" />
          </label>
        </div>
      </div>

      <div className="mr-6">
        <Table columns={columns} data={data} />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="px-4 py-2 border border-[#004AAD] rounded">
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 border border-[#004AAD] rounded">
          Next
        </button>
      </div>

    </>
  );
}
