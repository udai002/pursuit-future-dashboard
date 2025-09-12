import { PiSquaresFourLight } from "react-icons/pi";
import { FaTruckFast } from "react-icons/fa6";
import Button from "./Button";

const OptionsList = [
  {
    id: 1,
    title: "Overview",
    icon: <PiSquaresFourLight className="h-7 w-7" />,
    link: "",
  },
  {
    id: 2,
    title: "Team Info",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link: "",
  },
  {
    id: 3,
    title: "Sales Leads Info",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link: "",
  },
  {
    id: 4,
    title: "Lead Gen. Info",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link: "",
  },
  {
    id: 5,
    title: "Payment Links",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link: "",
  },
  {
    id: 6,
    title: "DPS Data",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link: "",
  },
  {
    id: 7,
    title: "Announcements",
    icon: <FaTruckFast className="h-6 w-6 " />,
    link: "",
  },
];

function Scrollbody() {
  return (
    <>
      <div className="overflow-y-auto h-[50%] md:h-[50%] overflew-scrollbar-hide mt-2 md:p-2  w-72   ">
        {OptionsList.map((item) => (
          <Button
            className=""
            link={item.link}
            icon={item.icon}
            title={item.title}
            options={item.options}
          />
        ))}
      </div>
    </>
  );
}

export default Scrollbody;
