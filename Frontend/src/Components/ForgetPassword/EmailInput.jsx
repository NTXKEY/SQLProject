import { useContext } from "react";
import { InputFields } from "../PageComponents/InputField";
import { updataDataContext } from "@/Context/Contexts";

export const EmailInput = () => {
  const { handleChange, validateEmail } = useContext(updataDataContext);

  return (
    <>
      <div className="w-full h-full  flex flex-col  items-center">
        <span className=" h-1/2 flex justify-center items-center text-light-primary dark:text-dark-primary font-bold text-5xl font-robotoCondensed tracking-tight">
          Vital Cure
        </span>
        <div className="w-full flex  flex-col justify-center items-center">
          <div className=" w-full flex flex-col justify-center items-center ">
            <form
              onSubmit={validateEmail}
              className="w-[400px] xl:w-[400px] flex flex-col justify-center items-center gap-5 "
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
                className=" flex justify-center items-center shadow-[0px_0px_0.2rem_rgba(0,0,0,0.25)] bg-light-primary text-[#ffffff] text-base dark:bg-dark-primary rounded-sm h-[30px] p-5"
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
