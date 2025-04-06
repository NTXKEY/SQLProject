import { updataDataContext } from "@/Context/Contexts";
import { InputFieldPassword } from "../PageComponents/InputFieldPassword";
import { useContext } from "react";

export const PasswordInput = () => {
  const { handleChange, resetPassword } = useContext(updataDataContext);

  return (
    <>
      <div className="w-full h-full  flex flex-col justify-top items-center">
        <span className="  h-1/2 flex justify-center items-center text-light-primary dark:text-dark-primary font-bold text-5xl font-robotoCondensed tracking-tight">
          Vital Cure
        </span>
        <div className="w-full flex  flex-col justify-center items-center">
          <div className=" w-full flex flex-col justify-center items-center ">
            <form
              onSubmit={resetPassword}
              className="w-4/5 h-full flex flex-col justify-center items-center gap-5 "
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
        </div>
      </div>
    </>
  );
};
