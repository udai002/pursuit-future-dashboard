import React, { useEffect, useState } from "react";

export default function AnnouncementsOverView() {
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchImage = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/announcement/announcement"
      );
      const result = await response.json();

      const latest = result.reduce((latest, current) => {
        if (
          !latest ||
          new Date(current.createdAt) > new Date(latest.createdAt)
        ) {
          return current;
        }
        return latest;
      }, null);

      setLatestAnnouncement(latest);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  if (loading) {
    return (
      <div className="h-full border-[#004AAD] border rounded-md bg-[#004AAD1A] items-center cursor-pointer p-4">
        <p className="text-[#004AAD] font-bold text-2xl">Announcements</p>
        <p>Loading...</p>
      </div>
    );
  }

  return (

    <div className="h-full border-[#004AAD] border rounded-md bg-[#004AAD1A] items-center cursor-pointer">
      <div className="p-2 ml-3 ">
        <h1 className="text-[#004AAD] font-bold text-2xl">Announcements</h1>
        {latestAnnouncement && latestAnnouncement.image ? (
          <img
            src={`http://localhost:3000${latestAnnouncement.image}`}
            alt="Announcement"
            className="w-full object-cover h-[300px] rounded-md mt-2"
          />
        ) : (
          <p className="mt-2 text-gray-600">
            No recent announcement image available.
          </p>
        )}
      </div>

    </div>
  );
}
