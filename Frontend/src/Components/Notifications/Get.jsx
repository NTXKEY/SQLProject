import { AiOutlineLoading } from "react-icons/ai";
import {
  MdCancel,
  MdCheckCircle,
  MdEditNotifications,
  MdInfo,
} from "react-icons/md";
import { IoMdWarning } from "react-icons/io";

export const Get = (type, mode) => {
  let use;
  switch (type) {
    case "error":
      use = <MdCancel className={` text-Red-500 text-2xl`} />;
      break;
    case "success":
      use = (
        <MdCheckCircle
          className={`${
            mode === "dark" ? `text-Green-500` : `text-Green-500`
          }  text-2xl`}
        />
      );
      break;
    case "warning":
      use = <IoMdWarning className={`text-Orange-500 text-2xl`} />;
      break;
    case "progress":
      use = (
        <AiOutlineLoading
          className={`animate-spin ${
            mode === "dark" ? `text-color-white` : `text-dark-bg`
          } text-2xl `}
        />
      );
      break;
    case "info":
      use = <MdInfo className="text-indigo-500 text-2xl" />;
      break;
    default:
      use = <MdEditNotifications className="text-indigo-500 text-2xl" />;
      break;
  }
  return use;
};
