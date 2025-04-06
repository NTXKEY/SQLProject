import { useContext, useState } from "react";
import { GoClock } from "react-icons/go";
import { FcCalendar } from "react-icons/fc";
import { IoNotificationsOutline } from "react-icons/io5";
import { themeContext } from "@/Context/Contexts";
export const TopBar = () => {
  const { theme } = useContext(themeContext);

  const [isNotificationExpanded, setIsNotificationExpanded] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let time = new Date().toLocaleTimeString();

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);
  const getDateSuffix = (date) => {
    const day = date.getDate();
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const date = new Date();
  const daySuffix = getDateSuffix(date);

  return (
    <div
      className={`rounded-md p-5 mr-5 ${theme}  ${
        theme === "dark" ? "border-white-bg border-2 " : "bg-white-bg"
      } `}
    >
      <div className="flex items-center justify-between ">
        <span className="text-xl flex items-center mr-3 font-bold dark:text-white-bg ">
          Specialist
        </span>
        <div className="flex items-center mr-2 gap-5 ">
          <div className="flex items-center  gap-2 p-2 bg-white-bg rounded-md shadow-[0px_0px_0.2rem_rgba(0,0,0,0.15)] dark:shadow-[0px_0px_0.2rem_rgba(255,255,255,0.1)]">
            <FcCalendar />
            <span className="font-semibold font-inter text-xs opacity-80">
              Today,
            </span>
            <span className="font-semibold font-inter text-xs opacity-80">
              {date.getDate()}
              {daySuffix} {monthNames[date.getMonth()]}
            </span>
          </div>
          <div className="flex justify-center items-center  gap-2 p-2 bg-white-bg rounded-md shadow-[0px_0px_0.2rem_rgba(0,0,0,0.15)] dark:shadow-[0px_0px_0.2rem_rgba(255,255,255,0.1)]">
            <GoClock />
            <span className=" w-20 font-semibold font-inter text-xs opacity-80">
              {ctime}
            </span>
          </div>
          <div className="relative dark:text-white-bg">
            <div
              className={`h-[5px] w-[5px] rounded-full bg-light-primary dark:bg-dark-primary absolute -top-1 right-0 `}
            ></div>
            <button
              onClick={() => {
                setIsNotificationExpanded((curr) => !curr);
              }}
              className="text-xl"
            >
              <IoNotificationsOutline />
            </button>
            <div
              className={` flex flex-col absolute z-10 top-[160%] bg-white-bg shadow-[0px_0px_0.2rem_rgba(0,0,0,0.15)] rounded right-0 overflow-hidden transition-all duration-300 ${
                isNotificationExpanded
                  ? "h-96 w-72 p-5 dark:border-2 dark:border-white-bg dark:bg-dark-bg"
                  : "h-0 w-0"
              }`}
            >
              <span className="w-full font-inter font-semibold opacity-60 underline">
                Notifications
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
