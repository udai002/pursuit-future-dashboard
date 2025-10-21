import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import CustomSelect from "../button/CustomSelect";
import { IoIosArrowDown } from "react-icons/io";
const CsvToTable = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setHeaders(Object.keys(result.data[0]));
          setData((prev) => [...prev, ...result.data]);
          fetch("http://localhost:3000/api/lead/csv/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rows: result.data }),
          })
            .then((res) => res.json())
            .then((resp) => console.log("Upload Response:", resp))
            .catch((err) => console.error("Error:", err));
        },
      });
    } else {
      alert("Please select a CSV file first!");
    }
  };

  const handleDelete = () => {
    fetch("http://localhost:3000/lead/delete", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setData([]);
        setHeaders([]);
      })
      .catch((err) => console.error("Delete Error:", err));
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/lead/csv")
      .then((res) => res.json())
      .then((resp) => {
        if (resp.length > 0) {
          setHeaders(Object.keys(resp[0]));
          setData(resp);
        }
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  return (
    <div className="font-sans bg-gray-100 min-h-screen inline">
      <h2 className="mb-6 text-2xl font-bold text-blue-900">Upload CSV</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="p-2 border border-blue-900 rounded-md cursor-pointer mr-3"
      />
      <button
        onClick={handleUpload}
        className="px-5 py-2 bg-blue-900 text-white rounded-md mr-3 hover:bg-blue-800 transition"
      >
        Upload
      </button>
      <button
        onClick={handleDelete}
        className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition"
      >
        Delete All
      </button>
      <div className="flex mt-6 mr-2">
        <div className="flex flex-1 mt-4">

      <div className="flex justify-between mt-6 mr-2">
        <div className="flex mt-4">
          <h3 className="text-gray-600 text-3xl">Lead Gen Info</h3>
        </div>
        <div className="flex gap-[0.5px]">
          <CustomSelect
            className="h-[]"
            title="Month"
            options={[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ]}
          />

          <CustomSelect className="h-[]" title="Team Name" />
          <CustomSelect className="h-[]" title="Member" />
        </div>
      </div>
      </div>
      </div>

      {data.length > 0 && (
        <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead className="bg-blue-900 text-white">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left text-sm font-semibold border-b border-gray-200"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`transition ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-white"
                  } hover:bg-indigo-100`}
                >
                  {headers.map((header, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200"
                    >
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
   
  );
};

export default CsvToTable;
