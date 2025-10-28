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
      console.log("announcement", result);

      const latest = result.announcements.reduce((latest, current) => {
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
    <div className=" border-[#004AAD] border rounded-md bg-[#004AAD1A] items-center cursor-pointer">
      <div className="p-2 ml-3">
        <h1 className="text-[#004AAD] font-bold text-2xl">Announcements</h1>

        {latestAnnouncement ? (
          latestAnnouncement.image ? (
            <img
              src={`http://localhost:3000${latestAnnouncement.image}`}
              alt="Announcement"
              className="w-[23%] object-cover h-[10%] rounded-md mt-2"
            />
          ) : (
            <div>
              <div className="flex gap-2">
                <h1>{latestAnnouncement.title}</h1>
              </div>
              <div className="text-[#004AAD]">
                <h1 className="font-sans text-2xl">
                  {latestAnnouncement.description}
                </h1>
              </div>
            </div>
          )
        ) : (
          <p className="mt-2 text-gray-600">
            No recent announcement available.
          </p>
        )}
      </div>
    </div>
  );
}
