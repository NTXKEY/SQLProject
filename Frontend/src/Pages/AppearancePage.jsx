import { themeContext } from "@/Context/Contexts";
import { useContext } from "react";
import LightModeSVG from "../assets/images/Light Mode appearance.svg";
import DarkModeSVG from "../assets/images/Dark Mode appearance.svg";

export const AppearancePage = () => {
  const { theme, handleToggle } = useContext(themeContext);

  return (
    <div
      className={` ${theme} ${
        theme === "dark"
          ? "bg-dark-bg text-white-bg"
          : "bg-white-bg text-black-c"
      } h-full  flex flex-col items-start px-5 `}
    >
      <span className="w-full text-start mt-5 font-inter font-bold text-xs opacity-50">
        Preference Mode
      </span>
      <div className="flex items-start gap-5 mt-5">
        <div className="relative rounded-md overflow-hidden ">
          <img className="h-60 -mt-6 rounded" src={LightModeSVG} />
          <div className=" flex items-center p-2 w-full absolute bg-light-neutral dark:bg-white-bg bottom-0">
            <input
              type="radio"
              id="light-mode"
              name="themeSelector"
              checked={theme === "light"}
              value="light"
              onChange={handleToggle}
            />
            <span className="ml-2 text-xs font-inter font-semibold text-black-c">
              Light Mode
            </span>
          </div>
        </div>
        <div className="relative rounded-md overflow-hidden ">
          <img className="h-60 -mt-6 rounded" src={DarkModeSVG} />
          <div className="flex items-center p-2 w-full absolute bg-light-neutral dark:bg-white-bg bottom-0">
            <input
              type="radio"
              id="dark-mode"
              name="themeSelector"
              checked={theme === "dark"}
              value="dark"
              onChange={handleToggle}
            />
            <span className="ml-2 text-xs font-inter font-semibold text-black-c ">
              Dark Mode
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
