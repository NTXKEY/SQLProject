import PropTypes from "prop-types";

import { motion as m } from "framer-motion";
import { useState } from "react";

export const HistoryCard = ({ name, special, date, reason }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <m.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ width: 0 }}
      duration={{ duration: 0.5 }}
      className={` ${
        isExpanded ? "h-52" : "h-24"
      } flex flex-col w-full items-center justify-start shadow-[0px_0px_0.1rem_rgba(0,0,0,0.3)] dark:shadow-[0px_0px_0.1rem_rgba(255,225,255,0.3)] rounded p-2 py-3 cursor-pointer transition-all duration-300 `}
      onClick={() => setIsExpanded((curr) => !curr)}
    >
      <div className={"w-full flex items-center "}>
        <div className="flex flex-col items-start ml-3 ">
          <span className=" text-xs font-inter font-bold">Dr {name}</span>
          <span className="text-xs opacity-50 font-inter">{special}</span>
        </div>
        <span className="ml-auto text-xs opacity-50 font-inter">{date}</span>
      </div>
      <span className="ml-3 w-full mt-3 text-xs font-inter overflow-hidden">
        Reason for visit:{" "}
        <span className="font-inter font-semibold">{reason}</span>
      </span>
    </m.div>
  );
};

HistoryCard.propTypes = {
  name: PropTypes.string,
  special: PropTypes.string,
  date: PropTypes.string,
  reason: PropTypes.string,
};
