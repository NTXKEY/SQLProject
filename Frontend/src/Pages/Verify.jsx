import { useContext, useEffect, useRef } from "react";
import { motion as m } from "framer-motion";

import Img from "../assets/Backgrounds/Doctor illustration 2.jpg";

import { ThemeToggle } from "../Components/ThemeToggle";

import { themeContext } from "../Context/Contexts";
import { Link, useNavigate } from "react-router-dom";
import { accountStatus } from "../API/apis";
import toast from "react-hot-toast";
export const Verify = () => {
  const { theme } = useContext(themeContext);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  const isVerified = async () => {
    const email = localStorage.getItem("email");
    const response = await accountStatus({ email });
    if (response.data.result.isVerified) {
      toast.success("Account Verified");
      return response.data.result.isVerified;
    }
    console.log(response);
    return false;
  };

  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      const currentStatus = await isVerified();
      if (currentStatus === true) {
        console.log("Verified");
        clearInterval(intervalRef.current);
        navigate("/Personalization");
      } else {
        console.log("Checking.....");
      }
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <>
      <div className={`flex w-dvw h-dvh ${theme} `}>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={` ${theme} w-full pt-14 pb-5 xl:w-[500px] h-dvh flex flex-col justify-between items-center dark:bg-dark-bg transition-all `}
        >
          <header className="flex flex-col gap-5 justify-center items-center p-5  w-full h-1/5">
            <h2 className="font-inter font-extrabold text-4xl text-light-primary dark:text-dark-primary tracking-tight underline underline-offset-8 ">
              Vital Cure
            </h2>
          </header>

          <div className="flex flex-col justify-center items-center w-full gap-5 relative bottom-10 ">
            <h2 className="font-inter font-extrabold text-xl text-light-primary dark:text-dark-primary tracking-tighter">
              Please check your email
            </h2>

            <button className="flex justify-center items-center shadow-[0px_0px_0.5rem_rgba(0,0,0,0.25)] bg-light-primary text-[#ffffff] text-xs  dark:bg-dark-primary rounded-sm h-[30px] w-1/5">
              <Link to="/signup">Back</Link>
            </button>
          </div>
          <div className="w-full self-end flex items-end justify-end px-5">
            <ThemeToggle />
          </div>
        </m.div>

        <div className="relative h-full hidden sm:hidden md:hidden xl:block dark:bg-dark-bg">
          <img src={Img} alt="" className="h-dvh object-cover rounded-l-2xl" />
        </div>
      </div>
    </>
  );
};
