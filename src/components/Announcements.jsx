
import React, { useEffect, useState } from "react";
import AddAnnouncement from "./AddAnnouncement";
import Table from "./table";
import Delete from "../assets/delete.png";
import Edit from "../assets/edit.png";
import { RxCaretDown } from "react-icons/rx";
import { GoArrowUpRight } from "react-icons/go";
import CustomSelect from "./button/CustomSelect";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";


const Announcements = () => {
  const [modalType, setModalType] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showImage, setShowImage] = useState(null);
  const [editAnnocement, setEditAnnouncement] = useState(null);
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const [announcements, setAnnouncements] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (selectedMonth = month) => {
    try {
      setLoading(true);
      const url = `http://localhost:3000/announcement/announcement?month=${selectedMonth}&page=${page}&limit=${limit}`;

      const response = await fetch(url);
      const result = await response.json();

      if (result.announcements && Array.isArray(result.announcements)) {
        setData(result.announcements);
        setTotalPages(Math.ceil(result.totalCount / limit) || 1);
      } else {
        setData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.log("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData(month);
  }, [month, page, limit]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/announcement/announcement/${id}`,
          { method: "DELETE" }
        );
        if (!response.ok) {
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

  const handleMonthChange = (e) => {
    const selectedMonth = parseInt(e.target.value);
    setMonth(selectedMonth);
  };


  const onClose = () => {
    setModalType(null);
    setEditAnnouncement(null);
  };

  const columns = [
    {
      id: "announcementId", header: "Announcement ID",
      cell: (row) => {
        return row.announcementId.toUpperCase();
      }
    },
    { id: "title", header: "Title" },
    {
      id: "createdAt", header: "Publish Date",
      cell: (row) => {
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
                console.log(row.image)
                setModalType("image");

              }
            }}
          >
            View Image
          </button>
          <div className="mt-1.5"><GoArrowUpRight size={16} /></div>

        </div>

      ),
    },
    {
      id: "action",
      header: "Action",
      cell: (row) => (
        <div className="flex gap-3">
          <img src={Delete} alt="" onClick={() => handleDelete(row._id)}
            className="w-6 h-7 cursor-pointer" />
          <img src={Edit} alt="" onClick={() => { handleEdit(row) }} className="w-6 h-7 cursor-pointer " />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="text-2xl text-[#444444] ">Announcements</div>
          <CustomSelect
            title="Select Month"
            value={month}
            onChange={handleMonthChange}
            options={[
              { id: 1, label: "January" },
              { id: 2, label: "February" },
              { id: 3, label: "March" },
              { id: 4, label: "April" },
              { id: 5, label: "May" },
              { id: 6, label: "June" },
              { id: 7, label: "July" },
              { id: 8, label: "August" },
              { id: 9, label: "September" },
              { id: 10, label: "October" },
              { id: 11, label: "November" },
              { id: 12, label: "December" },
            ]}
          />

        </div>

        <div className="pr-4">
          <button
            className="bg-[#004AAD] text-white  px-4 py-2   rounded-lg  hover:bg-[#00a99D] duration-200  w-full sm:w-auto"
            onClick={() => setModalType("add")}>Create Announcement
          </button>
        </div>
      </div>


      <div className="pr-4">
        {loading ? <p>Loading...</p> : <Table data={data} columns={columns} />}
      </div>
      <div className="flex justify-center items-center mt-10 gap-4 px-7 mb-5 flex-row">
        <span className="text-lg flex-1 text-[#444444] font-medium sm:text-base md:text-lg sm:text-left">
          {" "}
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className={`p-2 bg-[#004AAD] rounded-full ${page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            <FaArrowLeftLong className="text-2xl text-white" />
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`p-2 bg-[#004AAD] rounded-full ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            <FaArrowRightLong className="text-2xl text-white" />
          </button>
        </div>
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

