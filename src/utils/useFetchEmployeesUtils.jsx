import { useEffect, useState } from "react";

export default function useFetchEmployees(selectedMonth) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); 

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setMessage("");

        const url = selectedMonth
          ? `http://localhost:3000/api/Allusers?month=${selectedMonth}`
          : `http://localhost:3000/api/Allusers`;

        console.log("Fetching employees from:", url);

        const response = await fetch(url);
        if (!response.ok) throw new Error("Unable to load employees.");

        const json = await response.json();
        console.log("Fetched employees data:", json);

        if (!json || !json.users || json.users.length === 0) {
          setData([]);
          setMessage("No data available for the selected month.");
        } else {
          setData(json);
          setMessage(""); 
        }
      } catch (err) {
        console.error("Error fetching employees:", err);
        setData([]);
        // setMessage("Unable to load employees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [selectedMonth]);

  return { data, loading, message }; 
}
