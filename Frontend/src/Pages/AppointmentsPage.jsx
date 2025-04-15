import {
  detailsContext,
  doctorDetailsContext,
  themeContext,
} from "@/Context/Contexts";
import { useContext, useState } from "react";

import { PersonalizationInput } from "@/Components/PersonalizationComponents/PersonalizationInput";

import Img from "../assets/AppointmentImages/AppointmentPage.svg";
import {
  FaStar,
  FaUserDoctor,
  FaUserInjured,
  FaWpforms,
} from "react-icons/fa6";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { CiTimer } from "react-icons/ci";
import toast from "react-hot-toast";
import { addAppointment } from "@/API/apis";
export const AppointmentsPage = () => {
  const { theme } = useContext(themeContext);
  const { userDetails } = useContext(detailsContext);
  const { doctorDetails } = useContext(doctorDetailsContext);

  const [appointmentDetails, setAppointmentDetails] = useState({
    name: userDetails.name,
    username:userDetails.username,
    email:userDetails.email,
    doctorName: doctorDetails.name,
    reason: "",
    time:"",
  });

  const handleAppointmentDetails = (event) => {
    const { name, value } = event.target;
    setAppointmentDetails({ ...appointmentDetails, [name]: value });
  };

  const timings = ["8:00", "7:00", "9:00", "10:00", "11:00", "12:00" ];

  const handleConfirm = async() => {
    // console.log("appointmentDetails", appointmentDetails);
    const response = await addAppointment(appointmentDetails) 
    toast.success("Appointment Booked Successfully");
  };

  return (
    <div
      className={` ${theme} ${
        theme === "dark"
          ? "bg-dark-bg text-white-bg"
          : "bg-light-neutral text-black-c"
      } h-full flex items-center justify-center  p-5 mt-5 mr-7  rounded-md dark:border-2 dark:border-white-bg dark:border-opacity-10 overflow-hidden`}
    >
      <div className="px-5 w-full h-full flex flex-col items-start justify-center ">
        <span className="text-3xl font-inter font-bold tracking-tight ">
          Appointments
        </span>
        <div className="w-full mt-5">
          <div className="flex w-full gap-5">
            <PersonalizationInput
              icon={<FaUserInjured />}
              title="Patient Name"
              type="text"
              //disabled
              //value={userDetails.name || "none"}
              func={(event) => handleAppointmentDetails(event)}
            />
            <PersonalizationInput
              icon={<IoPhonePortraitOutline />}
              title="Contact Number"
              type="text"
              
              // value={userDetails.contactNumber || "none"}
              func={(event) => handleAppointmentDetails(event)}
            />
          </div>
          <div className="flex gap-5">
            <PersonalizationInput
              icon={<FaUserDoctor />}
              title="doctorName"
              type="text"
              disabled
              value={doctorDetails.name ? `${doctorDetails.name}` : "none"}
              func={(event) => handleAppointmentDetails(event)}
            />
            <PersonalizationInput
              icon={<FaStar />}
              title="Specialization"
              type="text"
              disabled
              value={doctorDetails.special || "none"}
              func={(event) => handleAppointmentDetails(event)}
            />
          </div>
          <div className="flex gap-5">
            <div className="w-full flex ">
              <PersonalizationInput
                icon={<FaWpforms />}
                name="reason"
                title="Reason for Appointment"
                placeHolder="Describe your problem"
                type="textarea"
                func={(event) => handleAppointmentDetails(event)}
              />
            </div>
            <div className="flex flex-col mt-5">
              <span className="font-inter text-base mr-5 opacity-50">
                Appointment time
              </span>
              <div className="flex items-center h-full justify-start w-48 mt-2  px-3  dark:border-white-bg dark:border-2 dark:border-opacity-20 bg-white-bg shadow-[0px_0px_0.2rem_rgba(0,0,0,0.15)] dark:bg-dark-bg-alt rounded">
                <CiTimer />
                <select
                  className="w-full ml-2 dark:bg-dark-bg-alt"
                  name="time"
                  onChange={handleAppointmentDetails}
                >
                  {timings.map((timing) => {
                    return (
                      <option value={timing} key={timing}>
                        {timing}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-5">
          <span className="font-inter text-base mr-5 opacity-50 mt-5">
            Appointment type
          </span>
          <div className="flex mt-2 gap-5">
            <div className=" bg-white-bg  shadow-[0px_0px_0.2rem_rgba(0,0,0,0.15)] dark:shadow-[0px_0px_0.2rem_rgba(255,255,255,0.1)] accent-light-primary dark:accent-dark-primary dark:border-white-bg dark:border-2 dark:border-opacity-20 rounded dark:bg-dark-bg-alt  px-3 py-2 flex items-center">
              <input
                type="radio"
                name="appointmentType"
                onChange={() => {
                  setAppointmentDetails({
                    ...appointmentDetails,
                    type: "online",
                  });
                }}
                id=""
              />
              <span className="ml-3 font-semibold font-inter text-xs">
                Online
              </span>
            </div>
            <div className=" bg-white-bg  shadow-[0px_0px_0.2rem_rgba(0,0,0,0.15)] dark:shadow-[0px_0px_0.2rem_rgba(255,255,255,0.1)] accent-light-primary dark:accent-dark-primary dark:border-white-bg dark:border-2 dark:border-opacity-20 rounded dark:bg-dark-bg-alt  px-3 py-2 flex items-center">
              <input
                type="radio"
                name="appointmentType"
                // onChange={() => {
                //   setAppointmentDetails({
                //     ...appointmentDetails,
                //     type: "inPerson",
                //   });
                // }}
                // id=""
              />
              <span className="ml-3 font-semibold font-inter text-xs">
                In Person
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            onClick={handleConfirm}
            className="mt-5 p-2 flex justify-center items-center shadow-[0px_0px_0.5rem_rgba(0,0,0,0.25)] bg-light-primary text-white-bg text-base dark:bg-dark-primary rounded  w-1/4"
          >
            Confirm
          </button>
        </div>
      </div>
      <img
        className="hidden ml-5 md:flex h-full w-[1200px] rounded object-cover"
        src={Img}
        alt=""
      />
    </div>
  );
};
