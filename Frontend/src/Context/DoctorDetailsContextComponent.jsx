import PropTypes from "prop-types";
import { useState } from "react";

import { doctorDetailsContext } from "./Contexts";

export const DoctorDetailsContextComponent = ({ children }) => {
  const [doctorDetails, setDoctorDetails] = useState({ name: "", special: "" });

  const handleDoctorDetails = (name, special) => {
    setDoctorDetails({ ...doctorDetails, name: name, special: special });
    console.log("doctorDetails", doctorDetails);
  };

  return (
    <doctorDetailsContext.Provider
      value={{ doctorDetails, handleDoctorDetails }}
    >
      {children}
    </doctorDetailsContext.Provider>
  );
};

DoctorDetailsContextComponent.propTypes = {
  children: PropTypes.node,
};
