import PropTypes from "prop-types";

import { motion as m } from "framer-motion";
import { useState } from "react";

export const AppointmentCard = ({ profileImg, name, special, date }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <m.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ width: 0 }}
      duration={{ duration: 0.5 }}
      onClick={() => {
        setIsExpanded((curr) => !curr);
        console.log("isExpanded", isExpanded);
      }}
      className={` flex items-center shadow-[0px_0px_0.1rem_rgba(0,0,0,0.3)] dark:shadow-[0px_0px_0.1rem_rgba(255,225,255,0.3)] p-3 cursor-pointer transition-all duration-300 ${
        isExpanded ? "h-24" : "h-16"
      }`}
    >
      <div className="h-6 w-6 self-start rounded-full overflow-hidden">
        <img src={profileImg || "https://picsum.photos/60"} alt="" />
      </div>
      <div className="flex flex-col self-start items-start ml-3 ">
        <span className=" text-xs font-inter font-bold">Dr {name}</span>
        <span className="text-xs opacity-50 font-inter">{special}</span>
      </div>
      <span className="ml-auto text-xs self-start opacity-50 font-inter">
        {date}
      </span>
    </m.div>
  );
};

AppointmentCard.propTypes = {
  profileImg: PropTypes.string,
  name: PropTypes.string,
  special: PropTypes.string,
  date: PropTypes.string,
};
