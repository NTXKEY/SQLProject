/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { detailsContext, themeContext } from "@/Context/Contexts";
import { useContext, useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import DefaultProfile from "../assets/images/DefaultProfile.jpeg";
import { PersonalizationInput } from "@/Components/PersonalizationComponents/PersonalizationInput";
import { motion as m } from "framer-motion";
import { FaRegUser } from "react-icons/fa";
import {
  MdEditNote,
  MdImage,
  MdOutlineCalendarToday,
  MdOutlineDoneAll,
  MdOutlineLocationOn,
  MdPhoneIphone,
  MdRepeat,
} from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { GrClose } from "react-icons/gr";
import { backEndUrl } from "@/API/apis";

// import ReactCrop, { Crop } from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";
// import { canvasPreview } from "./canvasPreview";
export const btnHover = ` dark:bg-mic-fill dark:shadow-[0_0_0px_1px_rgb(255,255,255,10)] dark:shadow-[0px_0px_0.8rem_rgba(2,2,2,0.15)]  transition duration-500 hover:scale-105 dark:hover:bg-white-bg hover:bg-white-bg hover:border-[1px] dark:hover:border-mic-fill dark:hover:text-mic-fill `;
export const btnHoverLight = `font-inter tracking-wider  hover:font-normal  bg-light-primary hover:border-2 hover:border-light-primary hover:text-light-primary`;

export const ProfilePage = () => {
  const { userDetails } = useContext(detailsContext);
  // console.log(details);
  console.log(userDetails);
  const { theme } = useContext(themeContext);
  const [imgUrl, setImgUrl] = useState(null);
  const [Response, setResponse] = useState("");
  const [upload, setUpload] = useState(null);
  const [confirmUpload, setConfirmUpload] = useState(false);
  // const [uploadResponse, setUploadResponse] = useState(false);
  const [Default, setDefault] = useState(true);
  const user = userDetails.username;
  const [userData, setUserData] = useState(userDetails);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  useEffect(() => {
    // GetProfile();
    setTimeout(() => {
      getProfile();
      getUserdetails();
    });
    return clearTimeout();
  }, []);
  let response;
  const getUserdetails = async () => {
    try {
      const res = await axios.get(`${backEndUrl}/api/user/get/${user}`);
      const data = res.data;
      console.log(data);
      setUserData(data);
      // setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };
  // const GetProfile = async () => {
  //   try {
  //     response = await axios.get(
  //       `${backEndUrl}/api/user/get/profile/${user}`,
  //       {
  //         responseType: "blob",
  //       }
  //     );
  //     const contentType = response.headers["content-type"];
  //     if (contentType.startsWith("image/")) {
  //       setDefault(false);
  //       const url = URL.createObjectURL(response.data);
  //       setImgUrl(url);
  //       console.log("img", imgUrl);
  //     } else if (contentType.includes("application/json")) {
  //       const text = await response.data.text();
  //       const json = JSON.parse(text);
  //       if (json.profilePic === null) {
  //         setImgUrl(DefaultProfile);
  //         setDefault(true);
  //         console.log("JSOn", imgUrl);
  //       }
  //     }
  //     console.log(imgUrl);
  //   } catch (err) {
  //     if (err.response && err.response.status === 404) {
  //       console.log("Profile pic file not found or user not found.");
  //     } else {
  //       console.error("Error fetching profile picture:", err);
  //       setDefault(true);
  //       setImgUrl(DefaultProfile);
  //     }
  //     return;
  //   }
  // };

  const getProfile = async () => {
    try {
      setDefault(false);
      const res = await GetProfile(userDetails.username);
      res === null ? setImgUrl(DefaultProfile) : setImgUrl(res);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("Profile pic file not found or user not found.");
      } else {
        console.error("Error fetching profile picture:", err);
        setDefault(true);
        setImgUrl(DefaultProfile);
      }
      return;
    }
  };
  const uploadProfile = async () => {
    if (!upload) return;
    try {
      const patchData = new FormData();
      patchData.append("profilePic", upload);
      response = await axios.patch(
        `${backEndUrl}/api/user/profilePatch/${user}`,
        patchData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      // GetProfile();
      getProfile();
      setShowPreview(false);
      setUpload(null);
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteProfile = async () => {
    response = await axios.delete(
      `${backEndUrl}/api/user//delete/profile/${user}`
    );
    console.log(response);
    setResponse(response.data.message);
    setImgUrl(DefaultProfile);
    setDefault(true);
  };
  const [preview, setPreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const handleUpload = (e) => {
    setUpload(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    console.log("preview", preview);
    setShowPreview(true);
    setConfirmUpload(true);
  };
  const handleEditDetails = (e) => {
    console.log(userData.name);
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "medicalHistory") {
      let arrData = value.split(",");
      setUserData({ ...userData, [name]: [...arrData] });
      // console.log(signUpDetails);
    }
    if (name === "DOB") {
      const currentAge = new Date().getFullYear() - value.split("-")[0];
      setUserData({ ...userData, age: currentAge, [name]: value });
      // console.log(signUpDetails);
      return;
    }
  };
  const handleEditing = () => {
    setIsEditing(!isEditing);
  };
  const handleConfirmChange = async () => {
    try {
      const response = await axios.patch(
        `${backEndUrl}/api/user/patch/${user}`,
        userData
      );
      console.log(response.data.response);
    } catch (err) {
      console.log(err);
    }
    getUserdetails();
    setIsEditing(false);
  };
  const handleConfirmImage = async () => {
    setShowPreview(false);
    await uploadProfile();
  };
  const handleCancleImage = () => {
    setShowPreview(false);
    setImgUrl((prev) => prev);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
  };

  return (
    <div
      className={` ${theme} ${
        theme === "dark"
          ? "bg-dark-bg text-white-bg"
          : "bg-white-bg text-black-c"
      } pl-5 relative h-full w-full flex flex-col items-start justify-self-start  `}
    >
      {imgUrl ? (
        <>
          <div className=" bg-natural-mirror w-full  flex flex-row items-center gap-5 pt-1 ">
            <img
              src={Default ? DefaultProfile : imgUrl}
              className="w-24 h-24 rounded-full object-cover  shadow-[0px_0px_0.4rem_rgba(0,0,0,0.15)] "
              alt={!Default ? "Default Profile" : "Profile"}
            />
            {!Default && imgUrl != DefaultProfile && (
              // {imgUrl != DefaultProfile && (
              // <div className="">
              <button
                onClick={DeleteProfile}
                className={`bg-Red-500 text-white-bg  p-2 px-3 rounded-lg flex flex-row  gap-2 items-center ${btnHover} ${btnHoverLight}   `}
              >
                <IoMdTrash size={16} />
                <m.h4
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  Remove
                </m.h4>
              </button>
            )}
            <label className="relative cursor-pointer">
              <button
                // onClick={uploadProfile}
                className={` w-full text-white-bg  p-2 px-4 rounded-lg flex flex-row gap-2 items-center justify-center ${btnHover} ${btnHoverLight}   `}
              >
                <MdImage size={16} />
                {imgUrl === DefaultProfile ? "Upload" : "Update"}
              </button>
              <input
                type="file"
                onChange={handleUpload}
                className="absolute inset-0 opacity-0 w-full h-full  cursor-pointer"
                ref={fileInputRef}
              />
            </label>
          </div>
        </>
      ) : (
        <div className=" bg-natural-mirror w-full  flex flex-row items-center gap-5 ">
          <div className="w-24 h-24 rounded-full object-cover animate-skeleton-load " />
          {!Default && (
            <button
              className={`animate-skeleton-load w-[8rem] h-[3rem] p-2 px-4 rounded-lg `}
            ></button>
          )}
          <button
            className={` animate-skeleton-load w-[8rem] h-[3rem]  text-white-bg  p-2 px-4 rounded-lg `}
          ></button>
        </div>
      )}
      <div className="flex flex-row items-center justify-center w-full   "></div>
      <div className="flex flex-col pl-3 items-center  w-full max-w-[38vw] ">
        <PersonalizationInput
          title="Name"
          disabled={!isEditing ? true : false}
          type={"text"}
          name={"name"}
          icon={<FaRegUser />}
          value={userData.name}
          func={handleEditDetails}
        />

        <div className=" flex gap-4 items-start justify-start w-full  ">
          <PersonalizationInput
            title="Date of Birth"
            disabled={!isEditing ? true : false}
            type="text"
            icon={<MdOutlineCalendarToday />}
            name={"DOB"}
            value={userData.DOB}
            func={handleEditDetails}
          />
          <PersonalizationInput
            title="Contact Number"
            disabled={!isEditing ? true : false}
            type="string"
            icon={<MdPhoneIphone />}
            name={"contactNumber"}
            value={userData.contactNumber}
            func={handleEditDetails}
          />
        </div>
        <PersonalizationInput
          title="Address"
          disabled={!isEditing ? true : false}
          type="string"
          icon={<MdOutlineLocationOn />}
          name={"address"}
          value={userData.address}
          func={handleEditDetails}
        />
        <PersonalizationInput
          title="medical Conditions"
          disabled={!isEditing ? true : false}
          type="string"
          icon={<MdOutlineLocationOn />}
          name={"medicalHistory"}
          value={userData.medicalHistory}
          func={handleEditDetails}
        />
      </div>
      <m.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ width: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex flex-row gap-5 w-full max-w-[40vw] px-2 py-1 overflow-y-auto mt-6"
      >
        <button
          onClick={handleEditing}
          className={`w-full h-fit py-1 transition-all duration-300  rounded-md  text-light-pink  md:max-w-[14vw]  ${btnHover} ${btnHoverLight} `}
        >
          {isEditing ? (
            <div className="flex flex-row gap-2 items-center justify-center ">
              <GrClose /> Cancle
            </div>
          ) : (
            <div className="flex flex-row gap-2 items-center justify-center   ">
              <MdEditNote size={26} /> Edit
            </div>
          )}
        </button>
        {isEditing && (
          <m.button
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={handleConfirmChange}
            className={`w-3/4   rounded-lg  text-light-pink flex flex-row gap-2 items-center justify-center md:max-w-[14vw]  ${btnHover} ${btnHoverLight} `}
          >
            <MdOutlineDoneAll size={26} />
            Save
          </m.button>
        )}
      </m.div>
      {showPreview && (
        <div className="absolute z-50 mx-h-[60vh] flex flex-col overflow-y-hidden overflow-hidden items-center justify-center  w-fit h-[80vh] max-w-[60vw]   ">
          <m.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative w-full h-fit flex flex-col items-center justify-center bg-deep-dark rounded-xl dark:bg-white-bg p-4 overflow-y-hidden "
          >
            <img
              src={preview}
              alt="Preview"
              className="relative object-fill max-h-[70vh] "
            />
            {/* <div className=" absolute bottom-2 right-2 flex flex-row gap-2 m-2"> */}
            <button
              className={` absolute top-3 right-2  p-1 rounded-lg flex flex-row gap-2 items-center justify-center  ${btnHover} ${btnHoverLight} overflow-y-hidden `}
            >
              <GrClose
                // <IoClose
                // className={` text-color-white text-2xl  absolute right-2 top-2 `}
                onClick={handleCancleImage}
              />
            </button>
            <m.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{ width: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex flex-row items-end justify-end gap-6 absolute w-fit h-fit bottom-0 overflow-hidden pr-3 "
            >
              <button
                // className="bg-mic-fill p-2 rounded-lg absolute bottom-6 right-2 "
                onClick={handleConfirmImage}
                className={`p-1 rounded-lg  flex  gap-2 items-center justify-center font-inter tracking-wider  hover:font-normal  bg-light-primary hover:border-2 hover:border-light-primary hover:text-light-primary ${btnHover} `}
              >
                <MdOutlineDoneAll size={20} />
                {/* confirm */}
              </button>
              <label
                className={` p-1 rounded-lg   flex  items-center justify-center font-inter tracking-wider  hover:font-normal  bg-light-primary hover:border-2 hover:border-light-primary hover:text-light-primary  ${btnHover} `}
              >
                <button className="w-fit h-fit relative">
                  <input
                    type="file"
                    onChange={handleUpload}
                    // placeholder="Upload.."
                    // className="m-1 w-[10rem] p-1 text-white-bg shadow-[0px_0px_0.5rem_rgba(0,0,0,0.15)] "
                    className="absolute w-fit h-fit inset-0 opacity-0 cursor-pointer overflow-hidden "
                  />
                  <MdRepeat size={20} />
                </button>
              </label>
            </m.div>
            {/* </div> */}
          </m.div>
        </div>
      )}
    </div>
  );
};
