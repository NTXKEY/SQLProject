import { filterContext, themeContext } from "@/Context/Contexts";
import PropTypes from "prop-types";
import { useContext, useState } from "react";

export const FilterBar = () => {
  const { theme } = useContext(themeContext);
  const { handleClick } = useContext(filterContext);
  const [showMoreSpecialization, setShowMoreSpecialization] = useState(false);

  const specialization = [
    "Cardiologist",
    "Dermatologist",
    "Orthopedic Surgeon",
    "Pediatrician",
    "Neurologist",
    "Gynecologist",
    "ENT Specialist",
    "Ophthalmologist",
    "Psychiatrist",
    "Dentist",
    "General Physician",
    "Urologist",
    "Nephrologist",
    "Endocrinologist",
    "Oncologist",
  ];

  return (
    <div
      className={`${theme} ${
        theme === "dark" ? "bg-dark-bg" : "bg-white-bg"
      }  h-full flex flex-col p-5 justify-start  dark:border-2 mx-3 rounded  dark:border-white-bg overflow-auto  scrollbar-thin active:scrollbar-thumb-[#325495]`}
    >
      <div className="">
        <span className="font-inter font-semibold text-sm dark:text-white-bg ">
          Specialization
        </span>
        <div
          className={`${
            showMoreSpecialization ? "h-[90%]" : "h-[150px]"
          } flex flex-col gap-2 mt-2  mx-2 whitespace-nowrap ${
            showMoreSpecialization ? "overflow-auto" : "overflow-hidden"
          } transition-all duration-300  p-2 `}
        >
          {specialization.map((item, key) => (
            <FilterBarItems key={key} text={item} func={handleClick} />
          ))}
        </div>
        <span
          onClick={() => setShowMoreSpecialization(!showMoreSpecialization)}
          className=" text-sm font-inter font-semibold text-light-primary dark:text-dark-primary cursor-pointer"
        >
          {showMoreSpecialization ? "Show less" : "show more"}
        </span>
      </div>
      <div className="mt-5">
        <span className="font-inter font-semibold text-sm dark:text-white-bg">
          Work Experience
        </span>
        <div
          className={`${
            showMoreSpecialization ? "h-full" : "h-[150px]"
          } flex flex-col gap-2 mt-2  mx-2 whitespace-nowrap ${
            showMoreSpecialization ? "overflow-auto" : "overflow-hidden"
          } transition-all duration-300  p-2`}
        >
          <FilterBarItems text={"Less than 5 years"} />
          <FilterBarItems text={"5 - 10 years"} />
          <FilterBarItems text={"More than 10 years"} />
        </div>
      </div>
    </div>
  );
};

const FilterBarItems = ({ text, func }) => {
  return (
    <div className="flex items-center  dark:text-white-bg font-inter font-semibold">
      <input
        name={text}
        type="checkbox"
        onChange={func}
        className=" w-4 h-4 accent-light-primary dark:accent-dark-primary scale-75 cursor-pointer"
      />
      <span className="ml-2 font-inter text-sm tracking-tight">{text}</span>
    </div>
  );
};

FilterBarItems.propTypes = {
  text: PropTypes.string,
  func: PropTypes.func,
};
