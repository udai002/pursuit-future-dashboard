import React from "react";

export default function OverviewComp({title,revenue,img}) {
  return (
    <div className=" flex-grow">
         <div className="p-4 border-[#004AAD]  rounded-md border bg-[#004AAD1A] items-center cursor-pointer">
      <div className="flex  gap-3">
        {/* <img src={img} className="h-5" /> */}
        <h1 className="text-xl ">{title}</h1>
      </div>

      <div className="mt-2 text-[#004AAD]">
        <h1 className="font-sans text-4xl">{revenue}</h1>
      </div>
    </div>

    </div>
   
  );
}





