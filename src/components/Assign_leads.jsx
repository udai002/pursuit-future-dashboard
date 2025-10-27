

import React, { useState, useEffect } from 'react';
import useAuth from '../context/AuthContext';
import Papa from 'papaparse';

const AssignLeadToMembers = () => {
  const [leadTypes, setLeadTypes] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedLeadType, setSelectedLeadType] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [uploadData, setUploadData] = useState([]);

  const { userDetails } = useAuth();

  useEffect(() => {
    fetchLeadTypes();
    fetchTeamMembers();
  }, []);

  const fetchLeadTypes = async () => {
    try {
      const response = await fetch('http://localhost:3000/lead-assignment/test/lead-types-simple');
      if (response.ok) {
        const data = await response.json();
        setLeadTypes(data.leadTypes || []);
        showMessage('Lead types loaded successfully', 'success');
      } else {
        showMessage('Failed to fetch lead types', 'error');
      }
    } catch (error) {
      console.error('Error fetching lead types:', error);
      showMessage('Error connecting to server for lead types', 'error');
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      if (!url) return showMessage('Server Error', 'error');

      const response = await fetch(`${url}/team/team/${userDetails?.teamId?.[0]}`);
      if (response.ok) {
        const data = await response.json();
        setTeamMembers(data.employees || []);
        showMessage('Members successfully fetched', 'success');
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      showMessage('Error connecting to server for team members', 'error');
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv')) {
        setCsvFile(file);
        showMessage(`CSV file "${file.name}" selected successfully`, 'success');
      } else {
        showMessage('Please select a valid CSV file', 'error');
        setCsvFile(null);
        event.target.value = '';
      }
    }
  };

  const handleImportCSV = async () => {
    if (!csvFile || !selectedLeadType || !selectedMember) {
      showMessage('Please select lead type, member, and CSV file', 'error');
      return;
    }

    setLoading(true);

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const data = results.data.filter(row => Object.values(row).some(val => val));

        const formattedData = data.map(item => {
          const objectvalue = Object.values(item);
          return {
            name: objectvalue[0] || '',
            contactNumber: objectvalue[1] || '',
            whatsappNumber: objectvalue[2] || '',
            branch: objectvalue[3] || '',
            yearOfStudy: objectvalue[4] || '',
            collegaName: objectvalue[5] || '',
            domain1: objectvalue[6] || '',
            domain2: objectvalue[7] || '',
            employeeId: selectedMember,
            teamId: userDetails?.teamId?.[0] || '',
            type: selectedLeadType
          };
        });

        setUploadData(formattedData);

        try {
          const response = await fetch('http://localhost:3000/saleslead/assign', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedData),
          });

          const responseData = await response.json();

          if (!response.ok) {
            console.error('Upload failed:', responseData);
            showMessage(responseData.message || 'Failed to upload CSV', 'error');
            return;
          }

          if (responseData.success) {
            showMessage(`CSV processed successfully! ${responseData.leadsCount} leads assigned to ${responseData.assignedTo}`, 'success');
            resetForm();
          } else {
            showMessage(responseData.message || 'Failed to upload CSV', 'error');
          }
        } catch (error) {
          console.error('Upload error:', error);
          showMessage('Network error uploading CSV file', 'error');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleAssign = async () => {
    if (!selectedLeadType || !selectedMember) {
      showMessage('Please select both lead type and team member', 'error');
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const selectedMemberName = teamMembers.find(m => m._id === selectedMember)?.empname;
      showMessage(`${selectedLeadType} assigned to ${selectedMemberName} successfully!`, 'success');
      resetForm();
    } catch (error) {
      console.error('Error assigning lead:', error);
      showMessage('Error assigning lead', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedLeadType('');
    setSelectedMember('');
    setCsvFile(null);
    const fileInput = document.getElementById('csvFileInput');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="bg-white p-3 relative right-3">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl border border-blue-800">
        <h1 className="text-xl font-normal text-gray-800 mb-4">Assign Lead to Members</h1>

        {message && (
          <div className={`p-2 rounded-lg mb-3 font-medium ${
            messageType === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <select
              className="w-72 h-14 px-5 border border-blue-500 rounded-xl text-base text-blue-500 bg-gray-50 appearance-none cursor-pointer transition-all duration-300 focus:outline-none focus:border-blue-600 focus:bg-white focus:text-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 16px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px'
              }}
              value={selectedLeadType}
              onChange={(e) => setSelectedLeadType(e.target.value)}
              disabled={loading}
            >
              <option value="">Lead Type</option>
              {leadTypes.map((type, index) => (
                <option key={`${type}-${index}`} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <input
              type="file"
              id="csvFileInput"
              accept=".csv,text/csv"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />
            <label 
              htmlFor="csvFileInput" 
              className={`w-full h-14 flex items-center justify-center gap-2 rounded-lg text-sm font-medium ${
                loading ? 'opacity-60 cursor-not-allowed' :
                csvFile 
                  ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                  : 'bg-[#004AAD] text-white hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg'
              }`}
            >
              {csvFile ? (
                <>
                  <span>✓</span>
                  <span className="truncate max-w-40">{csvFile.name}</span>
                </>
              ) : (
                <span>Import CSV File</span>
              )}
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-[2]">
            <select
              className="w-full h-14 px-5 border border-blue-500 rounded-xl text-base text-blue-500 bg-gray-50 appearance-none cursor-pointer transition-all duration-300 focus:outline-none focus:border-blue-600 focus:bg-white focus:text-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 16px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px'
              }}
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              disabled={loading}
            >
              <option value="">Member Name</option>
              {teamMembers.map((member, index) => (
                <option key={`${member._id}-${index}`} value={member._id}>
                  {member.username} - {member.email}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <button
              className="w-full h-14 bg-[#004AAD] text-white rounded-xl text-lg font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              onClick={csvFile ? handleImportCSV : handleAssign}
              disabled={loading || !selectedLeadType || !selectedMember}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                csvFile ? 'Import & Assign' : 'Assign'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignLeadToMembers;
