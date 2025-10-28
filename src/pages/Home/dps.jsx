// import React, { useState } from "react";
// import Create from "../../components/dps/form";
// import Hello from "../../components/dps/dps";
// import cross from "../../assets/cross.png";

// const Dps = () => {
//   const [showCreate, setShowCreate] = useState(false);
//   const handleOpen = () => setShowCreate(true);
//   const handleClose = () => setShowCreate(false);

//   return (
//     <div className="">
    
//     <div className="inline w-full">
//       <Hello onAddDps={handleOpen} />
//       {showCreate && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 relative">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">Add DPS</h2>
//               <button onClick={handleClose}>
//                 <img src={cross} alt="Close" className="w-8 h-8 cursor-pointer hover:opacity-80"/>
//               </button>
//             </div>
//             <Create />
//           </div>
//         </div>
//       )}
//     </div>
//     </div>
//   );
// };

// export default Dps;

import React, { useState } from "react";
import Create from "../../components/dps/form";
import Hello from "../../components/dps/dps";
import cross from "../../assets/cross.png";

const Dps = () => {
  const [showCreate, setShowCreate] = useState(false);

  // Example: Fetch user info from localStorage or context
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const handleOpen = () => setShowCreate(true);
  const handleClose = () => setShowCreate(false);

  return (
    <div className="">
      <div className="inline w-full">
        {/* Pass isAdmin down to Hello */}
        <Hello onAddDps={handleOpen} disabled={isAdmin} />

        {showCreate && !isAdmin && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Add DPS</h2>
                <button onClick={handleClose}>
                  <img
                    src={cross}
                    alt="Close"
                    className="w-8 h-8 cursor-pointer hover:opacity-80"
                  />
                </button>
              </div>
              <Create />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dps;
