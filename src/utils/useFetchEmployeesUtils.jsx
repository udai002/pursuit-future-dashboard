// // utils/useFetchEmployeesUtils.js
// import { useEffect, useState } from "react";

// export default function useFetchEmployees(selectedMonth) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try { 
//         setLoading(true);
//             const url = selectedMonth
//           ? `http://localhost:3000/api/Allusers?month=${selectedMonth}`
//           : `http://localhost:3000/api/Allusers`;
//         console.log("Fetching employees for month:", res);

//           const res = await fetch(url);

//         if (!res.ok) throw new Error("Failed to fetch employees");
//         const json = await res.json();
        
//         if (!json || !json.users || json.users.length === 0) {
//           setData([]);
//           setError("No data available");
//         } else {
//           setData(json);
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, [selectedMonth]);

//   return { data, loading, error };
// }


import { useEffect, useState } from "react";

export default function useFetchEmployees(selectedMonth) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);

   
        const url = selectedMonth
          ? `http://localhost:3000/api/Allusers?month=${selectedMonth}`
          : `http://localhost:3000/api/Allusers`;

        console.log("Fetching employees from:", url);

       
        const response = await fetch(url);

        if (!response.ok) throw new Error("Failed to fetch employees");

        const json = await response.json();
        console.log("Fetched employees data:", json);

        if (!json || !json.users || json.users.length === 0) {
          setData([]);
          setError("No data available");
        } else {
          setData(json);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [selectedMonth]);

  return { data, loading, error };
}
