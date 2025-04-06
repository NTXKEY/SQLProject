import { AppointmentsWidget } from "@/Components/HomePageComponents/AppointmentsWidget";
import { FilesWidget } from "@/Components/HomePageComponents/FilesWidget";
import { HistoryWidget } from "@/Components/HomePageComponents/HistoryWidget";
import { Calendar } from "@/Components/ui/calendar";
import { themeContext } from "@/Context/Contexts";
import { useContext } from "react";

export const HomePage = () => {
  const { theme } = useContext(themeContext);

  return (
    <div
      className={`${theme} ${
        theme === "dark" ? "bg-dark-bg" : "bg-light-neutral"
      } text-white-bg h-full  flex  gap-5 overflow-hidden  rounded-md  mr-5 mt-5`}
    >
      <div className="flex flex-col gap-5 ">
        <AppointmentsWidget />
        <HistoryWidget />
      </div>
      <div className="ml-auto">
        <FilesWidget />
      </div>

      <div className="flex  h-fit border-2 border-white-bg border-opacity-10 rounded-md">
        <Calendar
          className={
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-white text-dark-bg shadow-[0px_0px_0.2rem_rgba(0,0,0,0.2)]"
          }
        />
      </div>
    </div>
  );
};
