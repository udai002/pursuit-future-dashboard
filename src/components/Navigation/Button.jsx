import React, { useContext } from "react";
import { Link, useLocation } from "react-router";
import { Store } from "../../context/NavBarContext";



const Button = (props) => {
  const context = useContext(Store);
  if (!context) {
    throw new Error("Sidenavbar must be used within a Store.Provider");
  }
  const { open, setOpen } = context;
  const location = useLocation();

  function handleOpenOptions() {
    setOpen(true);
  }

  const isActive = props.link && location.pathname === props.link;

  const content = (
    <div className="flex items-center gap-3">
      {props.icon && (
        <span
          className={`${
            isActive
              ? "text-[#004aad]"
              : "text-white group-hover:text-[#004aad]"
          } transition-colors`}
        >
          {props.icon}
        </span>
      )}
      <p
        className={`${
          isActive ? "text-[#004aad]" : "text-white group-hover:text-[#004aad]"
        } transition-colors`}
      >
        {props.title}
      </p>
    </div>
  );

  const icons = (
    <div className="flex items-center justify-center ">
      {props.icon && (
        <span
          className={`p-2 rounded-lg ${
            isActive ? "bg-white text-[#004aad]" : "border border-white"
          }`}
        >
          {props.icon}
        </span>
      )}
    </div>
  );

  const innerContent = open ? content : icons;
  return (
    <div className="flex flex-col -ml-3">
      {props.link ? (
        <Link
          to={props.link}
          className={`group ${
            open
              ? `flex items-center justify-between px-2 text-white m-1 mt-4 rounded-[10px] py-2 transition-colors duration-200 ${
                  isActive
                    ? "bg-white text-[#004aad]"
                    : "bg-[#004aad] border border-white hover:bg-white hover:text-[#004aad]"
                }`
              : "flex text-white m-2 mt-4"
          } ${props.className}`}
        >
          {innerContent}
        </Link>
      ) : (
        <button
          onClick={props.onclick}
          className={`group ${
            open
              ? `flex items-center justify-betwee px-2 m-1 mt-4 rounded-[10px] py-2 transition-colors duration-200 ${
                  isActive
                    ? "bg-white text-[#004aad]"
                    : "bg-[#004aad] border border-white hover:bg-white hover:text-[#004aad]"
                }`
              : "flex text-white m-2 mt-4"
          } ${props.className}`}
        >
          {innerContent}
        </button>
      )}
    </div>
  );
};

export default Button;
