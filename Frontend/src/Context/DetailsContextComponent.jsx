import propTypes from "prop-types";

import { detailsContext } from "./Contexts";
import { useState } from "react";

export const DetailsContextComponent = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});

  const handleUserDetails = (userDetails) => {
    // console.log(userDetails);
    setUserDetails(userDetails);
  };

  return (
    <detailsContext.Provider value={{ userDetails, handleUserDetails }}>
      {children}
    </detailsContext.Provider>
  );
};

DetailsContextComponent.propTypes = {
  children: propTypes.node,
};
