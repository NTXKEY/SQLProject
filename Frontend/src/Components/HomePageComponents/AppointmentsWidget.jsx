import { themeContext } from "@/Context/Contexts";
import { useContext, useState } from "react";
import { FaArrowDownShortWide } from "react-icons/fa6";
import { AppointmentCard } from "./AppointmentCard";

export const AppointmentsWidget = () => {
  const { theme } = useContext(themeContext);

  const [appointments, setAppointments] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const getAppointments = async () => {
    // write the api call to save appointments into the appointments state

    const response = "";

    setAppointments(response.data);
  };

  const renderAppointments = (appointment, key) => {
    return <AppointmentCard key={key} {...appointment} />;
  };

  return (
    <div
      className={`${theme} ${
        theme === "dark" ? "bg-dark-bg-alt" : "bg-white-bg"
      } w-[400px] h-72  p-5 flex flex-col gap-5 shadow-[0px_0px_0.2rem_rgba(0,0,0,0.15)] text-black-c dark:text-white-bg dark:border-2 dark:border-white-bg dark:border-opacity-10 rounded-md  `}
    >
      <div className="w-full flex items-center justify-between border-b-2 pb-2 border-light-primary dark:border-dark-primary">
        <span className="text-sm font-inter">Upcoming Appointments</span>
        <div className="flex items-center gap-3 cursor-pointer">
          <span className="text-light-primary dark:text-dark-primary font-inter text-xs ">
            Active
          </span>
          <FaArrowDownShortWide size={15} />
        </div>
      </div>
      <div className=" w-full px-1 py-1 gap-3 flex flex-col overflow-y-auto scrollbar-none ">
        {appointments.length > 0 ? (
          appointments.map((appointments, key) =>
            renderAppointments(appointments, key)
          )
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 transition-all duration-300">
            <AppointmentCard
              name={"Ramesh Sharma"}
              special={"Dermatologist"}
              date={"10/10/2023"}
            />
            <AppointmentCard
              name={"Rahul Deshmukh"}
              special={"Nephrologist"}
              date={"10/10/2023"}
            />
            <AppointmentCard
              name={"Vinay Joshi"}
              special={"Oncologist"}
              date={"10/10/2023"}
            />
            <AppointmentCard
              name={"Sneha Kapoor"}
              special={"Urologist"}
              date={"10/10/2023"}
            />
            <AppointmentCard
              name={"Amit Verma"}
              special={"Pediatrician"}
              date={"10/10/2023"}
            />
            <AppointmentCard
              name={"Amit Verma"}
              special={"Pediatrician"}
              date={"10/10/2023"}
            />
          </div>
        )}
      </div>
    </div>
  );
};
