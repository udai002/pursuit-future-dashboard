import React from "react";

const AddAnnouncement = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl border border-[#004AAD] p-6 w-[600px] relative shadow-lg">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-600 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-[#004AAD] mb-4">
          Create Announcement
        </h2>

        <div className="flex gap-4 py-3">
          <input
            type="text"
            placeholder="Title"
            className="border-2 rounded-xl p-4 border-[#004AAD] outline-none placeholder-[#004AAD80] flex-1"
          />
          <label
            htmlFor="file-upload"
            className="bg-[#004AAD] text-white py-2 px-4 text-sm rounded-lg cursor-pointer flex items-center"
          >
            Upload Image
          </label>
          <input id="file-upload" type="file" className="hidden" />
        </div>

        <div className="flex gap-6">
          <textarea
            name="description"
            placeholder="Description"
            className="border-2 border-[#004AAD] rounded-xl p-4 flex-1 outline-none placeholder-[#004AAD80] min-h-[120px]"
          ></textarea>
          <div className="flex items-end">
            <button className="bg-[#004AAD] px-7 text-lg rounded-lg text-white h-12">
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncement;
