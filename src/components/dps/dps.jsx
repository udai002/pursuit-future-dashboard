import React, { useEffect, useState } from "react";

const DpsDataPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [preferredMonth, setPreferredMonth] = useState("");

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
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col p-4">
        <div className="flex items-center justify-between mb-4">  
            <select value={preferredMonth} onChange={(e) => {
                setPreferredMonth(e.target.value);
                setPage(1);
              }}
              className="border rounded px-2 py-1 bg-blue-600 text-white">
              <option value="">All</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>

        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <div className="overflow-x-auto border rounded-lg shadow-sm">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100 text-left">
                    <th className="px-4 py-2 border text-center">Student Name</th>
                    <th className="px-4 py-2 border text-center">Student Email ID</th>
                    <th className="px-4 py-2 border text-center">Student Contact No</th>
                    <th className="px-4 py-2 border text-center">Student WhatsApp No</th>
                    <th className="px-4 py-2 border text-center">Study Department</th>
                    <th className="px-4 py-2 border text-center">Year of Study</th>
                    <th className="px-4 py-2 border text-center">Domain/Course Opted</th>
                    <th className="px-4 py-2 border text-center">Preferred Program Month</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((student, index) => (
                      <tr key={index} className="hover:bg-gray-50 border-b last:border-none">
                        <td className="px-4 py-2 border">{student.studentName}</td>
                        <td className="px-4 py-2 border">{student.studentEmail}</td>
                        <td className="px-4 py-2 border">{student.studentContactNo}</td>
                        <td className="px-4 py-2 border">{student.studentWhatsAppNo}</td>
                        <td className="px-4 py-2 border">{student.studyDepartment}</td>
                        <td className="px-4 py-2 border">{student.yearOfStudy}</td>
                        <td className="px-4 py-2 border">{student.domainCourseOpted}</td>
                        <td className="px-4 py-2 border">{student.preferredProgramMonth}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50">
            Prev
          </button>
          <span> Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50">
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default DpsDataPage;
