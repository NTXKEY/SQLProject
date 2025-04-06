import { useContext } from "react";
import { signupDetailsContext, themeContext } from "../Context/Contexts";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { PersonalizationInput } from "@/Components/PersonalizationComponents/PersonalizationInput";

import Img from "../assets/Backgrounds/PersonalizationImg.jpg";

import { MdOutlineEmail, MdWork } from "react-icons/md";
import {
  FaArrowRight,
  FaBriefcaseMedical,
  FaMap,
  FaRegUser,
} from "react-icons/fa";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { GenderInput } from "@/Components/PersonalizationComponents/GenderInput";
import { IoIosCalendar } from "react-icons/io";
import { saveDetailsAPI } from "@/API/apis";
import toast from "react-hot-toast";

export const Personalization = () => {
  const navigate = useNavigate();
  const { theme } = useContext(themeContext);
  const { signUpDetails, handleSignUpDetails, setSignUpDetails } =
    useContext(signupDetailsContext);

  const handleGenderChange = (value) => {
    setSignUpDetails({ ...signUpDetails, gender: value });
  };

  const completeSignUp = async (event) => {
    event.preventDefault();
    // console.log(signUpDetails);
    const response = await saveDetailsAPI(signUpDetails);
    if (response.data.message === "User saved successfully") {
      toast.success("Account created");
      navigate("/login");
    }
  };

  return (
    <div
      className={`${theme} ${
        theme === "dark" ? "bg-dark-bg" : "bg-light-neutral"
      } h-dvh w-dvw flex justify-center items-center  `}
    >
      <div className="w-full h-full flex flex-col justify-center  p-5 xl:p-14 shadow-[0px_0px_0.2rem_rgba(0,0,0,0.25)] overflow-hidden">
        <span className="text-4xl text-black-c dark:text-white-bg font-inter font-bold tracking-normal">
          Welcome 👋
        </span>
        <span className="text-xs text-black-c dark:text-white-bg font-roboto font-bold  mt-2 opacity-40">
          Let us Know more about yourself
        </span>
        <div className="w-full flex flex-col mt-10">
          <span className="text-xl text-black-c dark:text-white-bg font-inter tracking-tight font-bold">
            Personalization Information
          </span>
          <form>
            <PersonalizationInput
              icon={<FaRegUser />}
              type={"text"}
              placeHolder="Name"
              func={handleSignUpDetails}
              name="name"
            />
            <div className="w-full flex items-center  gap-5">
              <PersonalizationInput
                icon={<MdOutlineEmail size={20} />}
                name={"email"}
                placeHolder="Email"
                type="email"
                title="Email"
                func={handleSignUpDetails}
                disabled={true}
                value={signUpDetails.email}
              />
              <PersonalizationInput
                icon={<IoPhonePortraitOutline size={20} />}
                placeHolder="Phone Number"
                title="Phone Number"
                name={"contactNumber"}
                type="tel"
                func={handleSignUpDetails}
              />
            </div>
            <div className="w-full flex items-center  gap-5">
              <PersonalizationInput
                icon={<IoIosCalendar size={20} />}
                name={"DOB"}
                type="date"
                title="Date of Birth"
                func={handleSignUpDetails}
              />
              <div className="w-full">
                <GenderInput changeFunc={handleGenderChange} />
              </div>
            </div>
            <div className="w-full flex items-center  gap-5">
              <PersonalizationInput
                icon={<FaMap size={20} />}
                name={"address"}
                placeHolder="123 Street, Banglore, Karnataka, India"
                type="text"
                title="Address"
                func={handleSignUpDetails}
              />
              <PersonalizationInput
                icon={<MdWork size={20} />}
                name={"occupation"}
                placeHolder="Engineer, Doctor"
                type="text"
                title="Occupation"
                func={handleSignUpDetails}
              />
            </div>
            <div className="w-full flex items-center  gap-5">
              <PersonalizationInput
                icon={<FaBriefcaseMedical size={20} />}
                name={"medicalConditions"}
                placeHolder="Diabetic, Asthma, Hypertension"
                type="text"
                title="Medical Conditions"
                func={handleSignUpDetails}
              />
            </div>

            <div className="w-full flex items-center justify-center mt-5">
              <m.button
                onClick={completeSignUp}
                whileHover={{ scale: 1.1 }}
                className=" flex items-center justify-center gap-2 px-5 py-2 w-1/2 bg-light-primary dark:bg-dark-primary text-white-bg rounded"
              >
                <span className="font-inter font-semibold">Confirm</span>
                <FaArrowRight />
              </m.button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full h-full hidden xl:flex  rounded-l  overflow-hidden ">
        <img className="w-full h-full object-cover " src={Img} alt="" />
      </div>
    </div>
  );
};
