import { doctorDetailsContext, themeContext } from "@/Context/Contexts";
import { useContext } from "react";
import { motion as m } from "framer-motion";

import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

import { FaRegMessage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const DoctorCard = ({
  rating,
  name,
  special,
  tags,
  description,
  price,
  profileImg,
}) => {
  const { theme } = useContext(themeContext);

  const { handleDoctorDetails } = useContext(doctorDetailsContext);

  const navigate = useNavigate();
  return (
    <m.div
      whileHover={{ scale: 1.05 }}
      className={`w-[350px] h-96 flex flex-col rounded  p-5 ${theme} ${
        theme === "dark" ? "bg-dark-bg" : "bg-white-bg"
      } dark:text-white-bg dark:border-2 dark:border-white-bg hover:cursor-pointer overflow-hidden`}
    >
      <span className="text-sm flex items-center gap-2 font-bold">
        <div className="text-Green-500">
          <FaStar />
        </div>
        {rating}
      </span>
      <div className=" shadow-[0px_0px_0.2rem_rgba(0,0,0,0.15)] dark:shadow-[0px_0px_0.2rem_rgba(255,255,255,0.1)] rounded-lg mt-5 p-2">
        <div className="flex items-center">
          <div className="rounded-full border flex justify-center items-center">
            {profileImg || (
              <img
                className="rounded-full"
                src="https://picsum.photos/60"
                alt=""
              />
            )}
          </div>
          <div className="flex flex-col">
            <span className=" ml-3 font-bold text-sm font-roboto">{name}</span>
            <span className=" ml-3 font-bold font-roboto text-xs opacity-50 dark:opacity-50">
              {special}
            </span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap whitespace-nowrap">
          {tags.map((data, key) => {
            return (
              <span
                key={key}
                className="bg-light-neutral text-black-c font-semibold ml-2 mt-2 px-2 py-1 text-[10px] rounded-3xl"
              >
                {data}
              </span>
            );
          })}
        </div>
      </div>
      <div className="leading-6 text-base font-robotoCondensed tracking-tight mt-6">
        {description}
      </div>
      <div className="mt-auto flex items-center justify-between cursor-pointer">
        <span className="text-xs font-semibold">₹ {price} per session</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              navigate("/user/home/appointments");
              handleDoctorDetails(name, special);
            }}
            className="text-xs font-semibold tracking-tight bg-light-primary dark:bg-dark-primary text-white-bg px-3 py-2 rounded-2xl"
          >
            Book an Appointment
          </button>
          <div className=" text-light-primary dark:text-dark-primary p-2 rounded-full">
            <FaRegMessage />
          </div>
        </div>
      </div>
    </m.div>
  );
};

DoctorCard.propTypes = {
  rating: PropTypes.number,
  name: PropTypes.string,
  special: PropTypes.string,
  tags: PropTypes.array,
  description: PropTypes.string,
  price: PropTypes.number,
  profileImg: PropTypes.any,
};
