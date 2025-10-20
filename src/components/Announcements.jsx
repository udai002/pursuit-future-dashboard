
import React, { useEffect, useState } from "react";
import AddAnnouncement from "./AddAnnouncement";
import Table from "./table";
import Delete from "../assets/delete.png";
import Edit from "../assets/edit.png";
import { RxCaretDown } from "react-icons/rx";
import { GoArrowUpRight } from "react-icons/go";
import CustomSelect from "./button/CustomSelect";

const Announcements = () => {
  const [modalType, setModalType] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showImage, setShowImage] = useState(null);
  const [editAnnocement, setEditAnnouncement] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/announcement/announcement"
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id)=>{
    if(window.confirm("Are you sure you want to delete?")){
      try {
        const response = await fetch(
          `http://localhost:3000/announcement/announcement/${id}`,
          { method: "DELETE" }
        );
        if(!response.ok){
          throw new Error("failed to delete announcement")
        }
        fetchData()
      } catch (error) {
        console.log("error in deleting announcement", error)
      }
    }
  }
  const handleEdit = (announcement) => {
    setEditAnnouncement(announcement);
    setModalType("edit")
  };

  const onClose = () => {
    setModalType(null);
    setEditAnnouncement(null);
  };

  const columns = [
    { id: "announcementId", header: "Announcement ID",
      cell: (row) => {
      return row.announcementId.toUpperCase(); 
 }
},
    { id: "title", header: "Title" },
    { id: "createdAt", header: "Publish Date",
      cell:(row)=>{
        const date = new Date(row.createdAt);
        const options = {
          year: "numeric",
          month: "short",
          day: "numeric",
        };
       return date.toLocaleDateString(undefined, options);

      }

     },
    { id: "description", header: "Description" },
    {
      id: "image",
      header: "Image",
      cell: (row) => (
        <div className="flex gap-1 text-[#004AAD] "> 
          <button
          onClick={() => {
            if (row.image) {
              setShowImage(row.image);
              setModalType("image");
            }
          }}
        >
          View Image
           </button>
           <div className="mt-1.5"><GoArrowUpRight size={16}/></div>
          
        </div>
        
      ),
    },
    {
      id: "action",
      header: "Action",
      cell: (row) => (
        <div className="flex gap-3">
          <img src={Delete} alt="" onClick={()=>handleDelete(row._id)}
           className="w-6 h-7 cursor-pointer" />
          <img src={Edit} alt="" onClick={()=>{handleEdit(row)}} className="w-6 h-7 cursor-pointer" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex gap-[640px]">
        <div className="flex gap-4">
          <div className="text-2xl text-[#444444] mt-3">Announcements</div>
            <CustomSelect title="All" options={[
                "January","February","March","April","May","June",
                "July","August","September","October","November","December",
              ]}/>
        </div> 

        <div>
          <button
          className="bg-[#004AAD] text-white p-2 rounded-lg  hover:bg-[#00a99D] duration-200 mt-3"
          onClick={() => setModalType("add")}>Create Announcement
          </button>
        </div>
        
      </div>

      <div>
        {loading ? <p>Loading...</p> : <Table data={data} columns={columns} />}
      </div>

      {(modalType === "add" || modalType === "edit") && (
        <AddAnnouncement
          onClose={onClose}
          refreshData={fetchData}
          editAnnocement={editAnnocement}
        />
      )}

      {modalType === "image" && showImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 text-xl"
              onClick={() => setModalType(null)}
            >
              ✕
            </button>
            <img
              src={`http://localhost:3000${showImage}`}
              alt="Announcement"
              className="max-h-[80vh] w-auto mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;

