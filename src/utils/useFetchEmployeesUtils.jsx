// utils/useFetchEmployeesUtils.js
import { useEffect, useState } from "react";

export default function useFetchEmployees(selectedMonth) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/Allusers?month=${selectedMonth}`);
        console.log("Fetching employees for month:", selectedMonth);

        if (!res.ok) throw new Error("Failed to fetch employees");
        const json = await res.json();
        
        if (!json || !json.users || json.users.length === 0) {
          setData([]);
          setError("No data available");
        } else {
          setData(json);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [selectedMonth]);

  return { data, loading, error };
}
