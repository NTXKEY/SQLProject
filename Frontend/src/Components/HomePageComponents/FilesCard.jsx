import PropTypes from "prop-types";

import { motion as m } from "framer-motion";
import { FaRegFilePdf } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";

export const FilesCard = ({ fileName }) => {
  return (
    <m.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ width: 0 }}
      duration={{ duration: 0.5 }}
      className={`h-16 flex mb-3 w-full items-center justify-between shadow-[0px_0px_0.1rem_rgba(0,0,0,0.3)] dark:shadow-[0px_0px_0.1rem_rgba(255,225,255,0.3)] rounded px-3 py-2 cursor-pointer transition-all duration-300 `}
      // onClick={""}
    >
      <FaRegFilePdf size={20} />
      <span className="text-lg font-inter">{fileName}</span>
      <div
        // onClick={() => {
        //   // Write login to Download the file
        // }}
        className="border-2 shadow-[0px_0px_0.1rem_rgba(126,25,70,0.1)] dark:shadow-[0px_0px_0.1rem_rgba(0,0,0,0.1)] rounded-md p-1 cursor-pointer"
      >
        <MdOutlineFileDownload size={20} />
      </div>
    </m.div>
  );
};

FilesCard.propTypes = {
  fileName: PropTypes.string,
};
