import { createContext, useContext, useEffect, useState } from "react";
import { motion as m } from "framer-motion";

import PropTypes from "prop-types";

import VitalCureLogoLight from "../../assets/Icons/Vital Cure Logo Light mode.svg";
import VitalCureLogoDark from "../../assets/Icons/Vital Cure Logo Dark mode.svg";

import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { MdMoreVert } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { BiSearchAlt } from "react-icons/bi";
import { BsCalendar } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { GoDeviceCameraVideo } from "react-icons/go";
import { detailsContext, themeContext } from "@/Context/Contexts";
// import { ThemeToggle } from "../ThemeToggle";
import { GetProfile } from "@/API/apis";
import ProfileInBar from "../ProfileComponents/ProfileInBar.jsx";
import { IoIosLogOut } from "react-icons/io";

const ExpandedContext = createContext();
export const SideBar = () => {
  const { theme } = useContext(themeContext);
  const { userDetails, handleUserDetails } = useContext(detailsContext);

  const [isSideBarExpanded, setIsExpanded] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isLogoutExpanded, setIsLogoutExpanded] = useState(false);

  const [isActive, setIsActive] = useState({
    Home: true,
    Browse: false,
    Appointments: false,
    Consultations: false,
    Settings: false,
    Support: false,
  });

  const navigate = useNavigate();

  const handleActiveStatus = (key) => {
    setIsActive(
      Object.fromEntries(
        Object.keys(isActive).map((currKey) => [
          currKey,
          currKey === key ? !isActive[key] : false,
        ])
      )
    );
  };
  const [Default, setDefault] = useState(null);
  const profile = async () => {
    const res = await GetProfile(userDetails.username);
    console.log("res", res);
    res === null ? setDefault(null) : setDefault(res);
  };
  useEffect(() => {
    profile();
  }, []);
  return (
    <aside className={`${theme} h-dvh p-5`}>
      <nav className="h-full flex flex-col bg-white-bg dark:bg-dark-bg dark:border-2 dark:border-white-bg rounded-lg ">
        <div
          className={`p-4 flex items-center ${
            isSideBarExpanded ? "justify-between" : "justify-center"
          }`}
        >
          <img
            className={` transition-all overflow-hidden ${
              isSideBarExpanded ? "w-28" : "w-0"
            }`}
            src={theme === "dark" ? VitalCureLogoDark : VitalCureLogoLight}
          />
          <button
            className={`dark:text-white-bg`}
            onClick={() => {
              setIsExpanded((curr) => !curr);
            }}
          >
            {isSideBarExpanded ? (
              <TbLayoutSidebarLeftCollapseFilled size={25} />
            ) : (
              <TbLayoutSidebarRightCollapseFilled size={25} />
            )}
          </button>
        </div>
        <ExpandedContext.Provider value={{ isExpanded: isSideBarExpanded }}>
          <ul className="flex-1 p-4 text-black-c dark:text-white-bg">
            <SideBarItems
              icon={<GrHomeRounded size={20} />}
              text={"Home"}
              func={(e) => handleActiveStatus(e)}
              active={isActive.Home}
              path="/user/home"
            />
            <SideBarItems
              icon={<BiSearchAlt size={20} />}
              text={"Browse"}
              func={(e) => handleActiveStatus(e)}
              active={isActive.Browse}
              path="/user/home/browse"
            />
            <SideBarItems
              icon={<BsCalendar size={20} />}
              text={"Appointments"}
              func={(e) => handleActiveStatus(e)}
              active={isActive.Appointments}
              path="/user/home/appointments"
            />
            {/* <SideBarItems
              icon={<GoDeviceCameraVideo size={20} />}
              text={"Consultations"}
              func={(e) => handleActiveStatus(e)}
              active={isActive.Consultations}
              path="/user/home/Consultations"
            /> */}
            {isSideBarExpanded ? (
              <ul
                className={`flex items-center gap-2 mt-8 cursor-pointer font-inter transition-all text-sm overflow-hidden whitespace-nowrap ${
                  isSideBarExpanded ? "w-28" : "w-0"
                }`}
              >
                Settings & Help
              </ul>
            ) : (
              <div className=" h-0 border mt-[50px] border-light-neutral dark:text-white-bg"></div>
            )}
            <SideBarItems
              icon={<IoSettingsOutline size={20} />}
              text={"Settings"}
              func={(e) => handleActiveStatus(e)}
              active={isActive.Settings}
              path="/user/home/settings"
            />
            {/* <SideBarItems
              icon={<BiSupport size={20} />}
              text={"Support"}
              func={(e) => handleActiveStatus(e)}
              active={isActive.Support}
              path="/user/home/help"
            /> */}
          </ul>
        </ExpandedContext.Provider>

        <div
          className={`relative flex mx-4 ${
            isSideBarExpanded ? "" : "justify-center"
          } p-2 border-t-[3px] pt-4 border-light-neutral dark:text-white-bg`}
        >
          <button
            className="flex items-center justify-center transition-all overflow-hidden "
            onClick={() => {
              if (!isSideBarExpanded) {
                setIsExpanded((curr) => !curr);
              }
            }}
          >
            <div>
              {Default === null ? (
                <FaUser size={20} />
              ) : (
                <ProfileInBar src={Default} />
              )}
            </div>
          </button>
          <div
            className={`flex overflow-hidden transition-all ${
              isSideBarExpanded ? "w-32 ml-3" : "w-0"
            }`}
          >
            <div className=" leading-4">
              <h4 className="text-sm font-inter ">{userDetails.username}</h4>
              <span className="text-xs font-inter font-semibold tracking-tighter opacity-50 whitespace-nowrap">
                {userDetails.email}
              </span>
            </div>
          </div>
          {isSideBarExpanded && (
            <button
              onClick={() => {
                setIsMenuExpanded((curr) => !curr);
              }}
            >
              <MdMoreVert size={25} />
            </button>
          )}
          <div
            className={`flex  items-center justify-start absolute bottom-full left-0 border-2 shadow-[0px_0px_0.5rem_rgba(0,0,0,0.15)] overflow-hidden dark:bg-dark-bg bg-white-bg border-white-bg w-full ${
              isMenuExpanded && isSideBarExpanded ? "h-16 p-5" : "h-0 p-0"
            } transition-all rounded`}
          >
            {isMenuExpanded && (
              <m.div
                onMouseEnter={() => setIsLogoutExpanded(true)}
                onMouseLeave={() => setIsLogoutExpanded(false)}
                onClick={() => {
                  handleUserDetails({});
                  navigate("/login");
                }}
                className="flex items-center gap-2 cursor-pointer overflow-hidden whitespace-nowrap"
              >
                <IoIosLogOut size={20} className="text-Red-500 font-bold" />

                <span
                  className={`${
                    isLogoutExpanded ? "w-16" : "w-0"
                  } font-inter font-semibold transition-all whitespace-nowrap text-Red-500`}
                >
                  Log Out
                </span>
              </m.div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export const SideBarItems = ({ icon, text, func, active, path }) => {
  const { isExpanded } = useContext(ExpandedContext);
  const [onHover, setOnHover] = useState(false);
  const navigate = useNavigate();

  return (
    <m.li
      key={text}
      onClick={() => {
        active ? null : func(text);
        navigate(path);
      }}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      className={`group h-10 relative flex items-center rounded-md p-2 my-3 text-sm cursor-pointer  ${
        onHover
          ? `border-b-2 border-b-light-primary dark:border-b-dark-primary ${
              active ? "rounded" : "rounded-none"
            } dark:text-white-bg`
          : ""
      } ${
        active
          ? "border-light-primary rounded border-2 dark:border-dark-primary dark:text-white-bg "
          : ""
      } `}
    >
      {icon}
      <span
        className={` overflow-hidden font-inter font-semibold opacity-50 group-hover:opacity-100  transition-all text-sm ${
          isExpanded ? "w-28 ml-3" : "w-0"
        } ${active ? "opacity-100" : ""} `}
      >
        {text}
      </span>

      {!isExpanded && (
        <span
          className={
            " absolute left-full rounded px-2 py-1 ml-3 text-black-c bg-white-bg dark:text-white-bg dark:bg-dark-bg transition-all dark duration-300 opacity-20 -translate-x-3 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-x-3"
          }
        >
          {text}
        </span>
      )}
    </m.li>
  );
};

SideBarItems.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  func: PropTypes.func,
  active: PropTypes.bool,
  path: PropTypes.string,
};
