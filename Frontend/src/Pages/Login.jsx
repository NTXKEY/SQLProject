import { motion as m } from "framer-motion";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ThemeToggle } from "../Components/ThemeToggle";
import { InputFields } from "../Components/PageComponents/InputField";

import Img from "../assets/Backgrounds/Doctor illustration.jpg";
import Facebook_icon from "../assets/Icons/face-book.png";
import Google_icon from "../assets/Icons/google.png";

import { detailsContext, themeContext } from "../Context/Contexts";
import { getDetails, loginAPI } from "../API/apis";
import toast from "react-hot-toast";
import { InputFieldPassword } from "../Components/PageComponents/InputFieldPassword";

export const Login = () => {
  const Navigate = useNavigate();
  const [details, setDetails] = useState({ username: "", password: "" });

  //* The handleToggle function toggles between light and dark themes and saves the selected theme to local storage.
  const { theme } = useContext(themeContext);
  const { handleUserDetails } = useContext(detailsContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };

  const validateLogin = async (event) => {
    event.preventDefault();
    const { username, password } = details;
    if (!username || !password) {
      return;
    }
    const response = await loginAPI({ username, password });
    if (response.data.message == "Login successful") {
      localStorage.setItem("username", username); 

      console.log(response)

     const userDetailsRequest = await getDetails({ username: username });

      console.log(userDetailsRequest)

     handleUserDetails(userDetailsRequest.data);

      Navigate(`/user/home`);

      toast.success("Login successful");

    } else if (
      response.data.message == "Invalid credentials"
    ) {
      toast.error(response.data.message);
    } else {
      toast.error(response.data.response.message);
    }
  };

  return (
    <>
      {/* //? Primary Container */}
      <div
        className={`flex justify-center md:justify-between items-center h-dvh w-dvh ${theme} ${
          theme === "dark" ? "bg-dark-bg" : ""
        } `}
      >
        {/* //? Image */}
        <div className="relative h-full hidden sm:hidden md:hidden xl:block dark:bg-dark-bg ">
          <div className="flex w-full ">
            <img
              src={Img}
              alt=""
              className="h-dvh object-cover  rounded-r-2xl"
            />
          </div>
        </div>

        {/* //? Primary  */}
        <div className="w-full pt-14 pb-5 xl:w-[500px] h-dvh flex flex-col justify-evenly items-center dark:bg-dark-bg">
          <m.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-center items-center p-5  w-full h-1/5 "
          >
            <h1 className="font-inter font-extrabold text-4xl text-light-primary dark:text-dark-primary tracking-[-1.5px]">
              Welcome back!
            </h1>
            <h2 className="font-inter font-bold text-lg tracking-[-1px] text-light-primary dark:text-dark-primary">
              Log into your Account
            </h2>
          </m.header>

          {/* //? Input Field */}
          <div className="flex flex-col justify-center items-center ">
            <form
              onSubmit={validateLogin}
              action=""
              className=" flex flex-col justify-center items-center w-full"
            >
              <div className="w-full flex flex-col justify-center items-center gap-5 ">
                <InputFields
                  inp_name="username"
                  inp_title="username"
                  inp_type="text"
                  inp_placeholder="Enter your Username"
                  func={handleChange}
                />

                <InputFieldPassword
                  inp_name="password"
                  inp_title="Password"
                  inp_type="password"
                  inp_placeholder="Enter your Password"
                  func={handleChange}
                />

                {/* //? Button */}
                <div className=" flex justify-center items-center pt-5 w-full ">
                  <m.button
                    type="submit"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center items-center font-inter font-bold text-sm tracking-normal text-white-bg bg-light-primary dark:bg-dark-primary rounded-sm h-[30px] p-5"
                  >
                    <m.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5 }}
                    >
                      Login
                    </m.h2>
                  </m.button>
                </div>

                {/* <m.h2
                  initial={{ transform: "translateX(50%)", opacity: 0 }}
                  animate={{ transform: "translateX(0%)", opacity: 1 }}
                  exit={{ transform: "translateX(50%)", opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className=" flex justify-start items-center w-full 
              font-inter font-bold text-xs tracking-normal text-light-primary dark:text-dark-primary py-5 underline "
                >
                  <Link to="/forgot-password"> Forgot your Password? </Link>
                </m.h2> */}
              </div>
            </form>

            <div className="flex flex-col justify-center items-center w-[400px] gap-5">
              {/* //? Divider */}
              <div className="flex justify-center items-center w-full mt-5 gap-5">
                <m.div
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  exit={{ width: 0 }}
                  transition={{ duration: 1 }}
                  className="h-[1px] w-4/5 bg-light-primary dark:bg-dark-primary "
                ></m.div>
                <h2 className="font-inter font-bold text-xs tracking-normal text-light-primary dark:text-dark-primary ">
                  or
                </h2>
                <m.div
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  exit={{ width: 0 }}
                  transition={{ duration: 1 }}
                  className="h-[1px] w-4/5 bg-light-primary dark:bg-dark-primary"
                ></m.div>
              </div>

              {/* //? Social Login */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className=" flex justify-between gap-5 items-center w-full "
              >
                <div className="">
                  <button
                    type="button"
                    onClick={() => {
                      toast.error("Not available at the moment");
                    }}
                    className="flex  items-center gap-2  h-10 py-3 px-2 rounded-sm bg-[#1b72e8] text-white-bg"
                  >
                    <div className="flex items-center justify-center bg-white-bg w-7 h-7">
                      <img src={Google_icon} alt="" className="w-5 h-5" />
                    </div>
                    <h2 className="text-xs tracking-tight">
                      Sign in with Google
                    </h2>
                  </button>
                </div>
                <div className="">
                  <button
                    type="button"
                    onClick={() => {
                      toast.error("Not available at the moment");
                    }}
                    className="flex  items-center gap-2  h-10 py-3 px-2 rounded-sm bg-[#325495] text-white-bg"
                  >
                    <div className="flex items-center justify-center bg-white-bg w-7 h-7">
                      <img src={Facebook_icon} alt="" className="w-5 h-5" />
                    </div>
                    <h2 className="text-xs tracking-tight">
                      Sign in with Facebook
                    </h2>
                  </button>
                </div>
              </m.div>

              {/* //? Redirect */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center py-5"
              >
                <h2 className=" flex items-center font-inter font-bold text-xs tracking-normal text-light-primary dark:text-dark-primary">
                  New to Vital Cure
                  <Link to="/signup">
                    <h2 className=" p-1 font-inter font-bold text-xs tracking-normal dark:text-light-primary text-[#325495] underline ">
                      Sign up
                    </h2>
                  </Link>
                  here
                </h2>
              </m.div>
            </div>
          </div>

          <div className="w-full self-end flex items-end justify-end px-5">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
};
