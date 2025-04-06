import { themeContext, updataDataContext } from "@/Context/Contexts";
import { useContext, useState } from "react";

import Img from "../assets/Backgrounds/Doctor illustration 2.jpg";
import { Outlet, useNavigate } from "react-router-dom";
import { updatePassword, verifyDetails, verifyResetEmail } from "@/API/apis";
import toast from "react-hot-toast";

export const ForgotPassword = () => {
  const { theme } = useContext(themeContext);
  const navigate = useNavigate();

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
      toast.success("Email sent");
      await verifyResetEmail({ email: email });
      // console.log(response2);
      navigate("/forgot-password/verify");
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
      <div
        className={`w-dvw h-dvh flex items-center ${theme} overflow-hidden gap-5 ${
          theme === "dark" ? "bg-deep-dark" : "bg-light-neutral"
        } `}
      >
        <div className="w-full h-full xl:w-[500px]">
          <updataDataContext.Provider
            value={{ resetDetails, validateEmail, handleChange, resetPassword }}
          >
            {<Outlet />}
          </updataDataContext.Provider>
        </div>
        <div className=" flex-1 w-full object-cover h-full hidden sm:hidden md:hidden xl:flex dark:bg-de">
          <img
            src={Img}
            alt=""
            className=" w-full h-full object-cover rounded-l-2xl hidden sm:hidden md:hidden xl:block"
          />
        </div>
      </div>
    </>
  );
};
