import { useEffect, useState } from "react";
import useAuth from "../context/AuthContext";

export default function useFetchEmployees(selectedMonth) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const { userDetails } = useAuth();

  useEffect(() => {
    if (!userDetails?.officeLocation) return; // wait until location is available

    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setMessage("");

        const params = new URLSearchParams();
        if (selectedMonth) params.append("month", selectedMonth);
        if (userDetails.officeLocation) params.append("location", userDetails.officeLocation);

        const url = `http://localhost:3000/api/Allusers?${params.toString()}`;
        console.log("Fetching employees from:", url);

        const response = await fetch(url);
        if (!response.ok) throw new Error("Unable to load employees.");

        const json = await response.json();
        console.log("Fetched employees data:", json);

        if (!json.users || json.users.length === 0) {
          setData([]);
          setMessage("No employees found for the selected month.");
        } else {
          setData(json);
          setMessage("");
        }
      } catch (err) {
        console.error("Error fetching employees:", err);
        setData([]);
        setMessage("Unable to load employees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [selectedMonth, userDetails]);

  return { data, loading, message };
}
