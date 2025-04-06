/* eslint-disable react/prop-types */
import { Slide, ToastContainer } from "react-toastify";

export const Container = ({ duration }) => {
  const Theme = localStorage.getItem("theme");
  return (
    <ToastContainer
      position="top-center"
      autoClose={duration || 5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Slide}
      theme={Theme}
      style={{ width: "80%" }}
    />
  );
};
