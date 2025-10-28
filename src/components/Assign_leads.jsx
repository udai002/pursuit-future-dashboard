import React, { useState, useEffect } from "react";
import useAuth from "../context/AuthContext";
import Papa from "papaparse";

const AssignLeadToMembers = () => {
  const [leadTypes, setLeadTypes] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedLeadType, setSelectedLeadType] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const { userDetails } = useAuth();

  useEffect(() => {
    fetchLeadTypes();
    fetchTeamMembers();
  }, []);

  const fetchLeadTypes = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/lead-assignment/test/lead-types-simple"
      );
      const data = await res.json();
      setLeadTypes(data.leadTypes || []);
    } catch {
      showMessage("Error fetching lead types", "error");
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`${url}/team/team/${userDetails?.teamId[0]}`);
      const data = await res.json();
      setTeamMembers(data.employees || []);
    } catch {
      showMessage("Error fetching team members", "error");
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "text/csv" || file.name.endsWith(".csv"))) {
      setCsvFile(file);
    } else {
      showMessage("Please select a valid CSV file", "error");
      e.target.value = "";
    }
  };

  const handleImportCSV = async () => {
    if (!csvFile || !selectedLeadType || !selectedMember) {
      showMessage("Please select lead type, member, and CSV file", "error");
      return;
    }

    setLoading(true);

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const data = results.data.map((item) => {
          const values = Object.values(item);
          return {
            name: values[0],
            contactNumber: values[1],
            whatsappNumber: values[2],
            branch: values[3],
            yearOfStudy: values[4],
            collegaName: values[5],
            domain1: values[6],
            domain2: values[7],
            employeeId: selectedMember,
            teamId: userDetails?.teamId[0],
            type: selectedLeadType,
          };
        });

        let apiUrl = "";
        const type = selectedLeadType.trim().toLowerCase();

        if (type.includes("sales")) {
          apiUrl = "http://localhost:3000/saleslead/assign";
        } else if (
          type.includes("lead") ||
          type.includes("gen") ||
          type.includes("generation") ||
          type.includes("leadgen") ||
          type.includes("lead-gen")
        ) {
          apiUrl = "http://localhost:3000/leadgen/leadgen/assign";
        } else {
          showMessage("Invalid lead type selected", "error");
          setLoading(false);
          return;
        }

        try {
          const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          const result = await res.json();
          if (!res.ok) throw new Error(result.msg || result.message);

          if (result.status || result.success) {
            showMessage(
              `Leads assigned successfully! (${result.leadsCount || data.length})`,
              "success"
            );
            resetForm();
          } else {
            showMessage(
              result.msg || result.message || "Failed to upload leads",
              "error"
            );
          }
        } catch (err) {
          showMessage(err.message || "Upload failed", "error");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const resetForm = () => {
    setSelectedLeadType("");
    setSelectedMember("");
    setCsvFile(null);
    const fileInput = document.getElementById("csvFileInput");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="bg-white p-3 relative right-3">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl border border-blue-800">
        <h1 className="text-xl font-normal text-gray-800 mb-4">
          Assign Lead to Members
        </h1>

        {message && (
          <div
            className={`p-2 rounded-lg mb-3 font-medium ${
              messageType === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <select
              className="w-72 h-14 px-5 border border-blue-500 rounded-xl text-base text-blue-500 bg-gray-50 appearance-none"
              value={selectedLeadType}
              onChange={(e) => setSelectedLeadType(e.target.value)}
            >
              <option value="">Lead Type</option>
              {leadTypes.map((t, i) => (
                <option key={`${t}-${i}`} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <input
              type="file"
              id="csvFileInput"
              accept=".csv,text/csv"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="csvFileInput"
              className={`w-full h-14 flex items-center justify-center rounded-lg ${
                csvFile ? "bg-green-100 text-green-800" : "bg-[#004AAD] text-white"
              }`}
            >
              {csvFile ? (
                <>
                  <span>✓</span>
                  <span className="truncate max-w-40">{csvFile.name}</span>
                </>
              ) : (
                <>Import CSV File</>
              )}
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-[2]">
            <select
              className="w-full h-14 px-5 border border-blue-500 rounded-xl text-base text-blue-500 bg-gray-50 appearance-none"
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              <option value="">Member Name</option>
              {teamMembers.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.username} - {member.email}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <button
              onClick={handleImportCSV}
              disabled={loading || !selectedLeadType || !selectedMember}
              className="w-full h-14 bg-[#004AAD] text-white rounded-xl font-semibold hover:bg-blue-700"
            >
              {loading ? "Processing..." : "Import & Assign"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignLeadToMembers;
