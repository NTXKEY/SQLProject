import { useContext, useState } from "react";
import { motion as m } from "framer-motion";
import toast from "react-hot-toast";

import Img from "../assets/Backgrounds/Doctor illustration 2.jpg";

import { ThemeToggle } from "../Components/ThemeToggle";

import { themeContext } from "../Context/Contexts";
import { useNavigate } from "react-router-dom";
import { updatePassword, verifyDetails } from "../API/apis";
import { InputFieldPassword } from "../Components/PageComponents/InputFieldPassword";
import { InputFields } from "../Components/PageComponents/InputField";

export const ForgotPassworOld = () => {
  const { theme } = useContext(themeContext);
  const navigate = useNavigate();

  const [checkEmail, setCheckEmail] = useState("email");
  const [resetDetails, setResetDetails] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setResetDetails({ ...resetDetails, [name]: value });
  };

  const validateEmail = async (event) => {
    event.preventDefault();
    const { email } = resetDetails;
    const response = await verifyDetails({ email: email });
    if (response.data.message === "User Found") {
      // toast.success("Email sent");
      setCheckEmail("password");
    } else {
      toast.error("Email doesn't exist");
    }
  };

  const resetPassword = async (event) => {
    event.preventDefault();
    const { email, newPassword, confirmNewPassword } = resetDetails;

    if (newPassword !== confirmNewPassword)
      return toast.error("Passwords don't match");

    const response = await updatePassword({ email, password: newPassword });

    if (response.data.message === "Password updated successfully") {
      toast.success("Password updated successfully");
      navigate("/login");
    }
  };

  return (
    <>
      <div className={`flex w-dvw h-dvh ${theme}`}>
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
            {/* //! Validating Email */}
            {checkEmail === "email" && (
              <div className=" w-full flex flex-col justify-center items-center p-5 mx-auto">
                <form
                  onSubmit={validateEmail}
                  className="w-3/5 xl:w-4/5 flex flex-col justify-center items-center gap-5 "
                >
                  <InputFields
                    inp_name="email"
                    inp_title="Email"
                    inp_type="email"
                    inp_placeholder="✉️ Enter your Email"
                    func={handleChange}
                  />

                  <button
                    type="submit"
                    className=" flex justify-center items-center 
                    shadow-[0px_0px_0.5rem_rgba(0,0,0,0.25)] bg-light-primary text-[#ffffff] text-base dark:bg-dark-primary rounded-sm h-[30px] p-5"
                  >
                    Proceed
                  </button>
                </form>
              </div>
            )}

            {/* //! Reset Password */}
            {checkEmail === "password" && (
              <div className=" w-full flex flex-col justify-center items-center p-5 mx-auto">
                <form
                  onSubmit={resetPassword}
                  className="w-4/5 flex flex-col justify-center items-center gap-5 "
                >
                  <InputFieldPassword
                    inp_name="newPassword"
                    inp_title="Password"
                    inp_type="password"
                    inp_placeholder="🔑 Enter your Password"
                    func={handleChange}
                  />
                  <InputFieldPassword
                    inp_name="confirmNewPassword"
                    inp_title="Confirm Password"
                    inp_type="password"
                    inp_placeholder="Confirm your Password"
                    func={handleChange}
                  />

                  <button
                    type="submit"
                    className=" flex justify-center items-center shadow-[0px_0px_0.5rem_rgba(0,0,0,0.25)] bg-light-primary text-[#ffffff] text-base dark:bg-dark-primary rounded-sm h-[30px] p-5"
                  >
                    Proceed
                  </button>
                </form>
              </div>
            )}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex justify-center items-center shadow-[0px_0px_0.5rem_rgba(0,0,0,0.25)] bg-light-primary text-[#ffffff] text-xs  dark:bg-dark-primary rounded-sm h-[30px] w-1/5"
            >
              Back
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
