import { accountStatus } from "@/API/apis";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const VerifyEmail = () => {
  const intervalRef = useRef(null);
  const Navigate = useNavigate();
  const isVerified = async () => {
    const email = localStorage.getItem("email");
    const response = await accountStatus({ email });
    if (response.data.result.isPasswordReset) {
      toast.success("Account Verified");
      Navigate("/forgot-password/password");
      return response.data.result.isPasswordReset;
    }
    return false;
  };

  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      const currentStatus = await isVerified();
      if (currentStatus === true) {
        clearInterval(intervalRef.current);
      } else {
        console.log("Checking.....");
      }
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <>
      <div className="w-full h-full  flex flex-col  items-center">
        <span className=" h-1/2 flex justify-center items-center text-light-primary dark:text-dark-primary font-bold text-5xl font-robotoCondensed tracking-tight">
          Vital Cure
        </span>
        <div className="w-full flex  flex-col justify-center items-center">
          <div className=" w-full flex flex-col justify-center items-center ">
            <div className="w-[450px] xl:w-[450px] flex flex-col justify-center font-roboto font-bold items-center gap-5 text-black-c dark:text-white-bg text-lg ">
              Please check your email to verify your account
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
