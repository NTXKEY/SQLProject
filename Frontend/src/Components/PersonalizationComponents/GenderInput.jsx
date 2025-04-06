import { themeContext } from "@/Context/Contexts";
import PropTypes from "prop-types";
import { useContext, useState } from "react";

export const GenderInput = ({ changeFunc }) => {
  const { theme } = useContext(themeContext);

  const [other, setOther] = useState("");
  return (
    <div
      className={`${theme} mt-5 flex flex-col w-full items-start justify-center text-black-c dark:text-white-bg `}
    >
      <span className="font-inter font-semibold opacity-55">Gender</span>
      <div className="w-full flex items-center justify-around h-10 mt-2">
        <div className="flex items-center gap-2 dark:border-2 shadow-[0px_0px_0.2rem_rgba(0,0,0,0.2)] bg-white-bg dark:bg-dark-bg-alt dark:border-white-bg dark:border-opacity-20 px-3 py-2 rounded">
          <input
            className="accent-light-primary dark:accent-dark-primary tracking-tight"
            type="radio"
            name="gender"
            value="male"
            // checked={gender === "male"}
            onChange={() => changeFunc("male")}
          />
          <span className="font-inter ">Male</span>
        </div>
        <div className="flex items-center gap-2 dark:border-2 shadow-[0px_0px_0.2rem_rgba(0,0,0,0.2)] bg-white-bg dark:bg-dark-bg-alt dark:border-white-bg dark:border-opacity-20 px-3 py-2 rounded">
          <input
            className="accent-light-primary dark:accent-dark-primary tracking-tight"
            type="radio"
            id="female"
            name="gender"
            value="female"
            // checked={gender === "female"}
            onChange={(e) => changeFunc(e.target.value)}
          />
          <span className="font-inter ">Female</span>
        </div>
        <div className="flex items-center justify-center gap-2 dark:border-2 shadow-[0px_0px_0.2rem_rgba(0,0,0,0.2)] bg-white-bg dark:bg-dark-bg-alt dark:border-white-bg dark:border-opacity-20 px-3 py-2 rounded">
          <input
            className="accent-light-primary dark:accent-dark-primary tracking-tight"
            type="radio"
            name="gender"
            value={other}
            // checked={gender === `${other}`}
            onChange={() => changeFunc(other)}
          />
          <input
            className="w-14 h-6 text-sm dark:bg-dark-bg-alt focus:outline-none placeholder:font-inter "
            type="text"
            name="other"
            placeholder="Other"
            onChange={(e) => {
              setOther(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

GenderInput.propTypes = {
  changeFunc: PropTypes.func,
};
