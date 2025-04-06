/* eslint-disable no-unused-vars */
import { PersonalizationInput } from "@/Components/PersonalizationComponents/PersonalizationInput";
import { detailsContext, themeContext } from "@/Context/Contexts";
import { useEffect, useRef } from "react";
import { useContext, useState } from "react";
import {
  MdEdit,
  MdOutlineEmail,
  MdEditOff,
  MdOutlineDoneAll,
  MdOutlinePassword,
} from "react-icons/md";
import { motion as m } from "framer-motion";
import { btnHover, btnHoverLight } from "../Pages/ProfilePage";
import { useNavigate } from "react-router-dom";
import DeletePopUp from "@/Components/AccountComponents/DeletePopUp";
import { IoKeyOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { checkPasswordValidity, updatePassword } from "@/API/apis";

export const AccountPage = () => {
  const { theme } = useContext(themeContext);
  const { userDetails, handleUserDetails } = useContext(detailsContext);

  const [resetPassword, setResetPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [isDeleClicked, setIsDeleClicked] = useState(false);

  const [newDetails, setNewDetails] = useState(userDetails);

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setResetPassword({ ...resetPassword, [name]: value });
    console.log(resetPassword);
  };

  const handleEditing = () => {
    setIsEditing(!isEditing);
    isEditing && inputRef.current.focus();
  };
  useEffect(() => {
    isEditing && inputRef.current.focus();
    return () => {};
  }, [isEditing]);

  const handleLogout = () => {
    handleUserDetails({});
    navigate("/login");
  };
  const handleDeleteClicked = () => {
    setIsDeleClicked(!isDeleClicked);
  };
  // useEffect(() => {
  //   isDeleClicked;
  // }, [isDeleClicked]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewDetails({ ...newDetails, [name]: value });
  };

  const handlePasswordConfirm = async () => {
    // console.log(resetPassword);
    const getVerifyCurrentPassword = await checkPasswordValidity({
      username: userDetails.username,
      enteredPassword: resetPassword.currentPassword,
    });
    // console.log(getVerifyCurrentPassword.data.isMatch);
    if (
      !resetPassword.currentPassword ||
      !resetPassword.newPassword ||
      !resetPassword.confirmNewPassword
    ) {
      toast.error("All Fields are required");
      return;
    }
    if (!getVerifyCurrentPassword.data.isMatch) {
      toast.error("Incorrect Password");
      return;
    }

    if (
      resetPassword.newPassword === resetPassword.confirmNewPassword &&
      getVerifyCurrentPassword.data.isMatch
    ) {
      const response = await updatePassword({
        email: userDetails.email,
        password: resetPassword.newPassword,
      });
      if (response.data.message === "Password updated successfully") {
        toast.success("Password updated successfully");
      } else {
        toast.error(response.data.message);
      }
    } else {
      toast.error("Passwords must match");
      return;
    }
  };

  return (
    <div
      className={` ${theme} ${
        theme === "dark"
          ? "bg-dark-bg text-white-bg"
          : "bg-white-bg text-black-c"
      } pl-5 h-full w-full flex flex-col items-start gap-6 relative `}
    >
      {isDeleClicked && (
        // <div className=" relative w-full h-screen ">
        <DeletePopUp
          setIsDeleClicked={setIsDeleClicked}
          handleDeleteClicked={handleDeleteClicked}
          isDeleClicked={isDeleClicked}
        />
        // </div>
      )}
      <div className="w-full items-center justify-center relative flex max-w-[38vw] ">
        <PersonalizationInput
          title="Email"
          disabled={!isEditing ? true : false}
          type={"email"}
          icon={<MdOutlineEmail />}
          name={"email"}
          Ref={inputRef}
          value={newDetails.email}
          func={handleChange}
        />
        <div className="absolute w-full h-full justify-end flex items-end mb-5 mr-5 ">
          <button onClick={handleEditing}>
            {isEditing ? <MdEdit size={17} /> : <MdEditOff size={17} />}
          </button>
        </div>
        {/* <button
          onClick={handleEditing}
          className={` absolute right-[5px] top-[70%]`}
          title={isEditing ? "Pause / Exit Editing" : "Edit Email"}
        >
          {isEditing ? <MdEditOff size={17} /> : <MdEdit size={17} />}
          {/* <MdEdit size={16}  /> 
        </button> */}
      </div>
      {isEditing && (
        <m.button
          initial={{ height: 0, width: 0 }}
          animate={{ height: "6%", width: "100%" }}
          exit={{ width: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          // onClick={handleConfirmChange}
          className={`w-2/4   rounded-lg  text-light-pink flex flex-row gap-2 items-center justify-center max-w-[18vw]  ${btnHover} ${btnHoverLight} `}
        >
          <MdOutlineDoneAll size={26} />
          Save
        </m.button>
      )}
      <div className="flex flex-col items-start justify-start w-full gap-2 ">
        <m.button
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ width: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={handleLogout}
          className={`w-full p-2 rounded-md  text-light-pink flex flex-row gap-2 items-center justify-center xs:max-w-[23vw] lg:max-w-[16vw] ${btnHover} ${btnHoverLight} `}
        >
          Log-out
        </m.button>
      </div>
      {/* <div className="flex flex-col items-start justify-start w-full gap-2 ">
        <span className="text-black-c dark:text-white-bg font-inter font-semibold whitespace-nowrap opacity-55">
          Password
        </span>
        <m.button
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ width: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={handlePassNavigate}
          className={`w-full p-2 rounded-md  text-light-pink flex flex-row gap-2 items-center justify-center xs:max-w-[23vw] lg:max-w-[16vw] ${btnHover} ${btnHoverLight} `}
        >
          Change password
        </m.button>
      </div> */}

      <div className="w-[50%] flex flex-col items-start justify-center">
        <div className="w-full">
          <PersonalizationInput
            title="Current Password"
            // disabled={isPassEditing.isCurrentPassEditing}
            type={"password"}
            icon={<IoKeyOutline />}
            name={"currentPassword"}
            value={newDetails.password}
            func={handlePasswordChange}
          />
          <button onClick={() => navigate("/forgot-password")}>
            <span className="text-xs font-inter text-light-primary dark:text-mic-fill">
              Forgot Password?
            </span>
          </button>
        </div>
        <div className="w-full flex items-center justify-center gap-5">
          <PersonalizationInput
            title="New Password"
            // disabled={isPassEditing.isNewPassEditing}
            type={"password"}
            icon={<IoKeyOutline />}
            name={"newPassword"}
            value={newDetails.password}
            func={handlePasswordChange}
          />
          <PersonalizationInput
            title="Confirm New Password"
            // disabled={isPassEditing.isConfirmPassEditing}
            type={"password"}
            icon={<IoKeyOutline />}
            name={"confirmNewPassword"}
            value={newDetails.password}
            func={handlePasswordChange}
          />
        </div>
        <m.button
          onClick={handlePasswordConfirm}
          whileHover={{ scale: 1.05 }}
          className="w-32 p-3 text-xs rounded-md mt-5 text-white-bg bg-light-primary dark:bg-mic-fill"
        >
          Confirm changes
        </m.button>
      </div>

      <div className="flex flex-col items-start justify-start w-full gap-4  ">
        {/* <ul>
          <li>
            <span className="text-black-c dark:text-white-bg font-inter font-semibold whitespace-nowrap opacity-55  ">
              Deleting Your Account
            </span>
          </li>
          <li>
            <span className="text-black-c dark:text-white-bg font-inter font-semibold whitespace-nowrap opacity-55  ">
              May lead to clearing Your entire data
              <br /> related to this Web-App
            </span>
          </li>
          <li>
            <span className="text-black-c dark:text-white-bg font-inter font-semibold whitespace-nowrap opacity-55  ">
              and u be able login next time
            </span>
          </li>
        </ul> */}
        <m.button
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ width: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={handleDeleteClicked}
          className={`w-full p-2 rounded-md text-light-pink flex flex-row gap-2 items-center justify-center xs:max-w-[23vw] lg:max-w-[16vw] ${btnHover} ${btnHoverLight} `}
        >
          Delete
        </m.button>
      </div>
    </div>
  );
};
