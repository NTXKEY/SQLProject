// import React from 'react';
import { useContext } from "react";
// import ForForm from "../../assets/Appointmentimages/ForFrom.jpg";
import App from "../../assets/Appointmentimages/App.jpg";
import { themeContext } from "../../Context/Contexts";
import { Calendar, Timer, Phone, User } from "lucide-react";
// import { ThemeToggle } from "../ThemeToggle";
// import { PersonalizationInput } from "../PersonalizationComponents/PersonalizationInput";

// import ModalButton from "./modal";

const VaccinationForm = () => {
  const { theme } = useContext(themeContext);

  return (
    <div
      className={`${theme} ${
        theme === "dark" ? "bg-dark-bg" : "bg-white-bg"
      } h-full w-full flex items-center justify-center mt-5`}
    >
      {/* <ThemeToggle /> */}

      <div
        className={`flex flex-col md:flex-row font-inter justify-center items-center bg-gradient-to-r from-blue-50 to-white p-5 rounded-lg shadow-md`}
      >
        <div className="flex flex-col p-6 md:w-8/10 shadow-md">
          <h1 className="text-2xl font-bold text-black-c dark:text-white-bg mb-1">
            Appointment Form
          </h1>

          <span className="text-dark-primary1 font-bold dark:text-dark-primary">
            Booking an Appointment with Doctor
          </span>

          {/* <div className="mb-4 text-black-c dark:text-white-bg">
          <p className="">I am registering for</p>
          <div className="flex flex-row  mt-4 rounded-sm ">
            <div className="flex items-center mb-2 shadow-md rounded-md p-2 ">
              <input type="radio" id="myself" name="registration" value="myself" className="mr-2 "/>
              <label htmlFor="myself" className="text-grey">Myself</label>
            </div>
          </div>          
        </div> */}

          <div className="mb-4">
            <label
              htmlFor="fullName"
              className=" dark:text-white-bg text-black-c mb-1"
            >
              Patients Full Name
            </label>
            <div className="mt-2 flex items-center p-2 dark:bg-white-bg rounded shadow-md">
              <User className=" mr-2" />
              <input
                type="text"
                placeholder="name"
                className="bg-transparent w-full border-none"
              />
              {/* <PersonalizationInput
                icon={<User />}
                name={"PatientName"}
                type={"text"}
                placeHolder={"name"}
                title={"Patients Full Name"}
                func={""}
                disabled={false}
              /> */}
            </div>
          </div>

          <div className="mb-4 rounded-md shadow-md">
            <label
              htmlFor="phone"
              className=" dark:text-white-bg text-black-c mb-1"
            >
              Mobile Number
            </label>
            <div className="mt-2 flex items-center p-2 dark:bg-white-bg rounded shadow-md">
              <Phone className=" mr-2" />
              <input
                type="tel"
                placeholder="number"
                className="bg-transparent w-full border-none"
              />
            </div>
          </div>

          <div className="flex flex-row ">
            <div className="mb-4 w-full">
              <label className=" dark:text-white-bg text-black-c mb-1">
                Preferred Date
              </label>
              <div className="mt-2 flex items-center dark:bg-white-bg p-2 rounded shadow-md">
                <Calendar className=" mr-2" />
                <input
                  type="date"
                  className="bg-transparent w-full border-none"
                />
              </div>
            </div>

            <div className="mb-4 pl-5 w-full">
              <label className=" dark:text-white-bg text-black-c mb-1">
                Schedule-Time{" "}
              </label>
              <div className="mt-2 flex items-center dark:bg-white-bg p-2 rounded shadow-md">
                <Timer className="mr-2" />
                <input
                  type="time"
                  placeholder="time"
                  className="bg-transparent w-full border-none"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <p className="dark:text-white-bg mb-2">Appointment Type:</p>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer dark:bg-white-bg rounded shadow-md p-2 w-full">
                <input
                  type="radio"
                  name="appointmentType"
                  value="online"
                  className="form-radio"
                />
                <span className="text-gray hover:text-black-c">Online</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer dark:bg-white-bg rounded shadow-md p-2 w-full">
                <input
                  type="radio"
                  name="appointmentType"
                  value="offline"
                  className="form-radio text-blue-600"
                />
                <span className="text-gray">Offline</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button className="dark:bg-dark-primary text-white-bg bg-light-primary  p-2  w-full rounded hover:font-bold">
              Submit
            </button>
            <p className="mt-4 dark:text-white-bg text-black-c">
              Already registered?{" "}
              <a
                href="#"
                className="text-light-primary font-bold dark:text-dark-primary"
              >
                Check your status
              </a>
            </p>
          </div>
        </div>

        <div className="hidden md:block w-full h-full md:w-1/4 ">
          <img
            src={App}
            alt="Vaccination"
            className="rounded-lg shadow-lg md:h-full "
          />
        </div>
      </div>
    </div>
  );
};

export default VaccinationForm;
