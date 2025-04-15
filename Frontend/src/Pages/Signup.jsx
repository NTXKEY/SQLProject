import { useContext } from "react";
import { motion as m } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import Img from "../assets/Backgrounds/Doctor illustration 3.jpg";
import Google_icon from "../assets/Icons/google.png";
import Facebook_icon from ".././assets/Icons/face-book.png";

import { signUpAPI } from "../API/apis";

import { signupDetailsContext, themeContext } from "../Context/Contexts";
import { ThemeToggle } from "../Components/ThemeToggle";
import { InputFields } from "../Components/PageComponents/InputField";
import { InputFieldPassword } from "../Components/PageComponents/InputFieldPassword";

export const Signup = () => {
  const { theme } = useContext(themeContext);
  const { signUpDetails, handleSignUpDetails } =
    useContext(signupDetailsContext);

  const Navigate = useNavigate();

  const validateSignUp = async (event) => {
    event.preventDefault();
    const { username, email, password } = signUpDetails;
    if (!username || !email || !password) {
      console.log(signUpDetails);
      toast.error("All fields are required");
      return;
    }
    // console.log(details);
    const response = await signUpAPI({
      username,
      email,
      password,
    });

    console.log(response)

    if (response.data.message == "User registered successfully") {
      // toast.success("Verify Your Email");
      localStorage.setItem("email", email);
      Navigate("/Personalization");
    } else if (
      response.data.message == "Username or email already exists"
    ) {
      toast.error("User already exists");
      return;
    } else {
      toast.error(response.data.message.message);
    }
  };

  return (
    <>
      <div className={`flex w-full ${theme} `}>
        {/* //? Primary Content */}
        <div className="w-full pt-14 pb-5 xl:w-[500px] h-dvh flex flex-col justify-evenly items-center dark:bg-dark-bg">
          <m.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-center items-center p-5  w-full h-1/5 "
          >
            <h1 className="font-inter font-extrabold text-3xl text-light-primary dark:text-dark-primary tracking-[-1.5px]">
              Welcome to Vital Cure
            </h1>
            <span className="font-inter font-bold text-lg tracking-[-1px] text-light-primary dark:text-dark-primary">
              Sign up for an account
            </span>
          </m.header>

          <div className=" flex flex-col justify-center items-center">
            <form
              onSubmit={validateSignUp}
              action=""
              className=" flex flex-col justify-center items-center w-full "
            >
              <div className="w-full flex flex-col justify-center items-center gap-5 ">
                <InputFields
                  inp_name="username"
                  inp_title="User Name"
                  inp_type="text"
                  inp_placeholder="Enter your Username"
                  func={(e) => {
                    handleSignUpDetails(e);
                  }}
                />
                <InputFields
                  inp_name="email"
                  inp_title="Email"
                  inp_type="email"
                  inp_placeholder="Enter your Email"
                  func={(e) => {
                    handleSignUpDetails(e);
                  }}
                />
                <InputFieldPassword
                  inp_name="password"
                  inp_title="Password"
                  inp_type="password"
                  inp_placeholder="Enter your Password"
                  func={(e) => {
                    handleSignUpDetails(e);
                  }}
                />

                {/* //? Button */}
                <div className=" flex justify-center items-center w-full ">
                  <m.button
                    type="submit"
                    onClick={() => {
                      validateSignUp;
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.5 }}
                    className=" w-full flex justify-center items-center font-inter font-bold text-sm tracking-normal
                    text-white-bg bg-light-primary dark:bg-dark-primary rounded-sm h-[30px] p-5 my-5 "
                  >
                    <m.span
                      initial={{ opacity: 0, visibility: "hidden" }}
                      animate={{ opacity: 1, visibility: "visible" }}
                      exit={{ opacity: 0, visibility: "hidden" }}
                      transition={{ duration: 1.5 }}
                      className="whitespace-nowrap"
                    >
                      <h1>Create a Free Account</h1>
                    </m.span>
                  </m.button>
                </div>
              </div>
            </form>
            <div className="flex flex-col justify-center items-center w-[400px] gap-5">
              {/* //? Divider */}
              <div className="flex justify-center items-center w-full gap-5">
                <m.div
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  exit={{ width: 0 }}
                  transition={{ duration: 1 }}
                  className="h-[1px] w-4/5 bg-light-primary dark:bg-dark-primary "
                ></m.div>
                <span className="font-inter font-bold text-xs tracking-normal text-light-primary dark:text-dark-primary ">
                  or
                </span>
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
                    <span className="text-xs tracking-tight">
                      Sign in with Google
                    </span>
                  </button>
                </div>
                <div className="">
                  <button
                    type="button"
                    onClick={() => {
                      toast.error("Not available at the moment");
                    }}
                    className="flex  items-center gap-2  h-10 py-3 px-2 rounded-sm bg-dark-primary text-white-bg"
                  >
                    <div className="flex items-center justify-center bg-white-bg w-7 h-7">
                      <img src={Facebook_icon} alt="" className="w-5 h-5" />
                    </div>
                    <span className="text-xs tracking-tight">
                      Sign in with Facebook
                    </span>
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
                <span className="flex justify-center items-center font-inter font-bold text-xs tracking-normal text-light-primary dark:text-dark-primary">
                  Already have an account?
                  <Link to="/login">
                    <span className="font-inter font-bold text-xs tracking-normal underline dark:text-light-primary text-bg-dark-primary p-1">
                      Sign in
                    </span>
                  </Link>
                  here
                </span>
              </m.div>
            </div>
          </div>

          {/* //? Toggle */}
          {/*
          //*  This particular code snippet is responsible for rendering a toggle button that allows the
          //*  user to switch between light and dark themes in the application. Here's a breakdown of
          //*  what each part of the code does.
          */}
          <div className="w-full self-end flex items-end justify-end px-5  ">
            <ThemeToggle />
          </div>
        </div>

        {/* //? Image */}
        <div className="relative  h-full hidden sm:hidden md:hidden xl:block dark:bg-dark-bg">
          <img src={Img} alt="" className="h-dvh object-cover rounded-l-2xl" />
        </div>
      </div>
    </>
  );
};
