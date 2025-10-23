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
      console.log(result)

      const latest = result.reduce((latest, current) => {
        if (!latest ||
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

    <div className="h-[310px] border-[#004AAD] border rounded-md bg-[#004AAD1A] items-center cursor-pointer">
      <div className="p-2 ml-3 ">
        <h1 className="text-[#004AAD] font-bold text-2xl">Announcements</h1>
        {latestAnnouncement && latestAnnouncement.image ? (
          <>

          <div className="flex gap-2">
        <h1 className="">{latestAnnouncement.title}</h1>
      </div>

      <div className="text-[#004AAD]">
        <h1 className="font-sans text-2xl">{latestAnnouncement.description}</h1>
      </div>
      
          <img
            src={`http://localhost:3000${latestAnnouncement.image}`}
            alt="Announcement"
            className="w-[30%] object-cover h-[200px] rounded-md mt-2"
          />

         
            </>
          
            

        ) : (
          <p className="mt-2 text-gray-600">
            No recent announcement image available.
          </p>
        )}
      </div>

    </div>
  );
}
