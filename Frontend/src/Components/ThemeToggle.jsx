import { useContext } from "react";
import { themeContext } from "../Context/Contexts";

export const ThemeToggle = () => {
  const { handleToggle, theme } = useContext(themeContext);

  return (
    <>
      <div
        className={`flex justify-start items-center shadow-[0px_0px_0.5rem_rgba(0,0,0,0.25)] rounded-[50px] w-16 h-8 p-1 bg-[#ffffff]  `}
        onClick={handleToggle}
      >
        <div
          className={`bg-light-primary dark:bg-dark-primary w-6 h-6 rounded-[50px] hover:cursor-pointer  transition-all ${
            theme === "light" ? "translate-x-0" : "translate-x-8"
          }`}
        ></div>
      </div>
    </>
  );
};
