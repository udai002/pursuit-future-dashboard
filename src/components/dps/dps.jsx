import React, { useEffect, useState } from "react";
import useAuth from "../../context/AuthContext";

const DpsDataPage = ({ onAddDps }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [preferredMonth, setPreferredMonth] = useState("");

  const { userDetails } = useAuth();
  const isRestricted =
  userDetails?.role === "Admin" || userDetails?.role === "Post Sales";


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:3000/api/all?page=${page}&limit=${limit}`;
        if (preferredMonth) {
          url += `&preferredProgramMonth=${preferredMonth}`;
        }
        const response = await fetch(url);
        const result = await response.json();
        setData(result.students || []);
        setTotalPages(result.pages || 1);
      } catch (error) {
        console.error("Error fetching DPS data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, limit, preferredMonth]);

  return (
    <div className="flex h-screen">
      <main className="flex-1 flex pb-5 flex-col">
        <div className="flex items-center pb-5 justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            DPS Student Data
          </h1>

          <div className="flex items-center gap-3">
            <select
              value={preferredMonth}
              onChange={(e) => {
                setPreferredMonth(e.target.value);
                setPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December",
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>

            {/* Add DPS button with admin restriction */}
            <button
              onClick={!isRestricted ? onAddDps : undefined}
              disabled={isRestricted}
              className={`px-5 py-2 rounded-lg shadow transition font-medium ${
                isRestricted
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#004AAD] text-white hover:bg-blue-800"
              }`}
            >
              + Add DPS
            </button>
          </div>
        </div>

        <div className="bg-white border-b-2 border-blue-200">
          {loading ? (
            <p className="text-center text-gray-600 py-6">Loading...</p>
          ) : (
            <table className="min-w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-[#004AAD1A] border-b-2 border-blue-300 text-black text-left">
                  {[
                    "Student Name", "Email", "Contact No", "WhatsApp No", "Department",
                    "Year", "Course Opted", "Preferred Month", "Amount Pitched", "Amount Paid",
                  ].map((head, i) => (
                    <th key={i} className="px-1 py-3 font-medium">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((student, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-blue-50 transition ${
                        index % 2 === 0 ? "bg-white" : "bg-white"
                      }`}
                    >
                      <td className="py-2 border-b border-blue-300">{student.studentName}</td>
                      <td className="py-2 border-b border-blue-300">{student.studentEmail}</td>
                      <td className="py-2 border-b border-blue-300">{student.studentContactNo}</td>
                      <td className="py-2 border-b border-blue-300">{student.studentWhatsAppNo}</td>
                      <td className="py-2 border-b border-blue-300">{student.studyDepartment}</td>
                      <td className="py-2 border-b border-blue-300">{student.yearOfStudy}</td>
                      <td className="py-2 border-b border-blue-300">{student.domainCourseOpted}</td>
                      <td className="py-2 border-b border-blue-300">{student.preferredProgramMonth}</td>
                      <td className="py-2 border-b border-blue-300">{student.amountPitched}</td>
                      <td className="py-2 border-b border-blue-300">{student.amountPaid}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-lg bg-white shadow hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded-lg bg-white shadow hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default DpsDataPage;
