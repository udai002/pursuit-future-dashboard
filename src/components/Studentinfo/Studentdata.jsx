import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { CiSearch } from "react-icons/ci";
import { FaFileCsv } from "react-icons/fa6";
import toast from "react-hot-toast";
import CustomSelect from "../button/CustomSelect";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import useAuth from "../../context/AuthContext"; 

export default function Studentdata() {
  const { userDetails } = useAuth(); 

  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [course, setCourse] = useState('');
  const [month, setMonth] = useState("");
  const [programType, setProgramType] = useState("");


  const disableCsvUpload = userDetails?.role === "PostSale" || userDetails?.role === "Intern";
  const disablePaymentStatus = userDetails?.role === "Operations" || userDetails?.role === "Intern";

  const fetchStudents = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/student/allstudent?search=${search}&course=${course}&programType=${programType}&month=${month}&page=${page}&limit=${limit}`
      );
      if (res.ok) {
        const result = await res.json();
        setData(result.allstudent || []);
        setTotalPages(Math.ceil(result.total / limit) || 0);
      } else {
        console.error("Failed to fetch student info");
      }
    } catch (error) {
      console.error("Error fetching student info:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search, course, month, programType, page, limit]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
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
        toast.success("CSV file uploaded successfully");
        fetchStudents();
      } else {
        toast.error("Failed to upload CSV file");
      }
    } catch (error) {
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

      if (!update.ok) throw new Error("Failed to update status");
      toast.success("Status updated successfully");
      fetchStudents();
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Failed to update:", error);
    }
  };

  const columns = [
    { id: "name", header: "Student Name" },
    { id: "phoneNumber", header: "Contact Number" },
    { id: "PricePitched", header: "Price Pitched" },
    { id: "courseOpted", header: "Course Opted" },
    { id: "Registration", header: "Registration Date" },
    { id: "programType", header: "programType" },
    { id: "employeeIdemail", header: "Employee Email" },
    {
      header: "Payment Status",
      cell: (row) => (
        <div className="text-center">
          <select
            value={row.paymentStatus}
            onChange={(e) => handleChange(e, row._id)}
            disabled={disablePaymentStatus}
            className={`border-2 rounded px-2 py-1 text-[#00499d] ${
              disablePaymentStatus
                ? "border-gray-400 bg-gray-200 cursor-not-allowed text-gray-600"
                : "border-blue-700"
            }`}
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

          <CustomSelect
            title="Course"
            options={[
              { id: "Artificial Intelligence", label: "Artificial Intelligence" },
              { id: "Web Development", label: "Web Development" },
              { id: "Machine Learning", label: "Machine Learning" },
              { id: "Data Science", label: "Data Science" },
              { id: "Digital Marketing", label: "Digital Marketing" },
              { id: "UI/UX Design", label: "UI/UX Design" },
              { id: "Cybersecurity", label: "Cybersecurity" },
              { id: "Cloud Computing", label: "Cloud Computing" },
            ]}
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          <CustomSelect
            title="Program Type"
            options={[
              { id: "Self Paced", label: "Self Paced" },
              { id: "Mentor-Led", label: "Mentor-Led" },
            ]}
            value={programType}
            onChange={(e) => setProgramType(e.target.value)}
          />

          <CustomSelect
            title="Month"
            options={[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December",
            ].map((m) => ({ id: m, label: m }))}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
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
            disabled={disableCsvUpload}
          />
          <label
            htmlFor="csvUpload"
            className={`border-2 border-[#004AAD] rounded-xl w-[160px] h-[45px] text-[16px] p-2 flex items-center justify-center gap-2
              ${disableCsvUpload
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#004AAD] text-white cursor-pointer"
              }`}
          >
            Import CSV File
            <FaFileCsv className="text-[#fff]" />
          </label>
        </div>
      </div>

      <div className="mr-6">
        {data.length > 0 ? (
          <Table columns={columns} data={data} />
        ) : (
          <div className="text-center text-[#444444] font-semibold text-lg py-10">
            No data available
          </div>
        )}
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
    </>
  );
}
