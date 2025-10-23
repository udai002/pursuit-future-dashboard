import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { CiSearch } from "react-icons/ci";
import { FaFileCsv } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function Studentdata() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:3000/student/allstudent");
        if (res.ok) {
          const result = await res.json();
          setData(result);
        } else {
          console.error("Failed to fetch student info");
        }
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };
    fetchStudents();
  }, []);


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
        console.log( uploadedData);
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
        <div className="border rounded-xl border-blue-700 text-center">
          <h1 className="text-[#00499d]">{row.paymentStatus}</h1>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex gap-10">
        <div className="flex gap-1">
          <h1 className="font-semibold p-2 text-[20px]">Students Info</h1>

          <select className="border-2 border-[#004AAD] rounded-xl w-[160px] h-[45px] bg-[#004AAD] text-[#fff]">
            <option value="">Employee Name</option>
          </select>
          <select className="border-2 border-[#004AAD] rounded-xl w-[160px] h-[45px] bg-[#004AAD] text-[#fff]">
            <option value="">Course</option>
          </select>
          <select className="border-2 border-[#004AAD] rounded-xl w-[160px] h-[45px] bg-[#004AAD] text-[#fff]">
            <option value="">Program Type</option>
          </select>
          <select className="border-2 border-[#004AAD] rounded-xl w-[160px] h-[45px] bg-[#004AAD] text-[#fff]">
            <option value="">August</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <div className="border-2 border-[#004AAD] rounded-xl w-[160px] h-[45px] text-[16px] p-2 bg-[#c7dbf5] text-[#004AAD] flex items-center gap-2">
            <CiSearch className="text-[#004aad]" />
            Search Here
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
    </>
  );
}
