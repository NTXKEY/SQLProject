import PropTypes from "prop-types";
import { useContext, useState } from "react";

import { motion as m } from "framer-motion";
import { themeContext } from "../../Context/Contexts";

export const OtpInput = ({ length }) => {
  const [OTP, setOTP] = useState(new Array(length).fill(""));
  const { theme } = useContext(themeContext);

  const handleKeyDown = (e, index) => {
    const KEY = e.key;
    if ((KEY.length === 1 && KEY.match(/[a-zA-Z0-9]/)) || KEY === "Backspace") {
      e.preventDefault();
      const PREVIOUS_INPUT =
        document.querySelectorAll("input")[index >= 0 ? index - 1 : index];
      const NEXT_INPUT =
        document.querySelectorAll("input")[index <= 6 ? index + 1 : index];
      if (KEY === "Backspace") {
        PREVIOUS_INPUT.focus();
      } else if (KEY != "Backspace" && index <= 6) {
        NEXT_INPUT.focus();
      }
    } else {
      return false;
    }
  };
  const handleOTP = (e, index) => {
    const NEW_OTP = [...OTP];
    NEW_OTP[index] = e.target.value;
    setOTP(NEW_OTP);
  };

  return (
    <>
      <div
        className={` ${theme} h-auto flex justify-center items-center gap-5`}
      >
        {OTP.map((data, index) => {
          return (
            <m.input
              initial={{ transform: "translatex(-100%)" }}
              animate={{ transform: "translatex(0)" }}
              exit={{ transform: "translatex(-100%)" }}
              transition={{
                duration: 0.5,
                delay: `${index * 0.1}`,
              }}
              key={index}
              type="text"
              maxLength={1}
              onKeyUp={(e) => handleKeyDown(e, index)}
              onChange={(e) => handleOTP(e, index)}
              className=" focus:outline-light-primary dark:focus:outline-dark-primary font-robotoCondensed font-extrabold text-light-primary dark:text-dark-primary  text-center mx-auto shadow-[0px_0px_0.5rem_rgba(0,0,0,0.25)] rounded-lg h-[50px] w-[50px]  placeholder:text-xs "
            />
          );
        })}
      </div>
    </>
  );
};

OtpInput.propTypes = {
  length: PropTypes.number,
};
