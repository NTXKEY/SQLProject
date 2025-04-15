import PropTypes from "prop-types";
import { signupDetailsContext } from "./Contexts";
import { useState } from "react";

export const SignupDetailsContextComponent = ({ children }) => {
  const [signUpDetails, setSignUpDetails] = useState({
    email: "",
    username: "",
    password: "",
    isVerified: false,
    name: "",
    DOB: Date,
    age: Number,
    contactNumber: "",
    gender: "",
    address: "",
    occupation: "",
    medicalConditions: [],
  });

  const handleSignUpDetails = (event) => {
    const { name, value } = event.target;
    // if (name === "medicalConditions") {
    //   let arrData = value.split(",");
    //   setSignUpDetails({ ...signUpDetails, [name]: [...arrData] });
    //   return;
    // }
    if (name === "DOB") {
      const currentAge = new Date().getFullYear() - value.split("-")[0];
      // console.log(currentAge);
      setSignUpDetails({ ...signUpDetails, age: currentAge, [name]: value });
      return;
    }
    setSignUpDetails({ ...signUpDetails, [name]: value });
  };

  return (
    <>
      <signupDetailsContext.Provider
        value={{ signUpDetails, handleSignUpDetails, setSignUpDetails }}
      >
        {children}
      </signupDetailsContext.Provider>
    </>
  );
};

SignupDetailsContextComponent.propTypes = {
  children: PropTypes.node,
};
