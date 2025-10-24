import React, { useEffect, useState } from "react";

const AddAnnouncement = ({ onClose, refreshData, editAnnocement }) => {
  const [loading,setLoading]=useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (editAnnocement) {
      setFormData({
        title: editAnnocement.title,
        description: editAnnocement.description,
        image: editAnnocement.image,
      });
    }
  }, [editAnnocement]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

 const handleSubmit = async (e) => {
  setLoading(true)
   e.preventDefault();
   const fd = new FormData();
   fd.append("title", formData.title);
   fd.append("description", formData.description);
   if (formData.image) {
     fd.append("image", formData.image); 
    }

   try {
     const method = editAnnocement ? "PUT" : "POST";
     const url = editAnnocement
       ? `http://localhost:3000/announcement/announcement/${editAnnocement._id}`
       : "http://localhost:3000/announcement/announcement";
       

     const response = await fetch(url, {
       method,
       body: fd,
     });

     if (!response.ok) {
       const errorText = await response.text();
       throw new Error(
         errorText || `Server responded with status: ${response.status}`
       );
     }

     const data = await response.json();
     console.log("Response data:", data);
     setLoading(false)

     refreshData();
     onClose();
   } catch (error) {
     console.error("Error creating announcement:", error.message);
         setLoading(false);
   }
 };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl border border-[#004AAD] p-6 w-[600px] relative shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 py-3">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border-2 rounded-xl p-4 border-[#004AAD] outline-none placeholder-[#004AAD80] flex-1"
              required
            />

            <label
              htmlFor="file-upload"
              className="bg-[#004AAD] text-white py-2 px-4 text-sm rounded-lg cursor-pointer flex items-center"
            >
              Upload Image
            </label>
            <input
              id="file-upload"
              type="file"
              name="image"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          <div className="flex gap-6">
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border-2 border-[#004AAD] rounded-xl p-4 flex-1 outline-none placeholder-[#004AAD80] min-h-[120px]"
              required
            ></textarea>
            <div className="flex items-end">
              <button
                type="submit"
                className="bg-[#004AAD] px-7 text-lg rounded-lg text-white h-12"
              >
              {loading?"Publishing..." :" Publish"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnnouncement;
