import { themeContext } from "@/Context/Contexts";
import { LucideAppWindowMac } from "lucide-react";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { TbUserEdit } from "react-icons/tb";
import { Outlet, useNavigate } from "react-router-dom";

export const SettingsPage = () => {
  const { theme } = useContext(themeContext);

  const [active, setActive] = useState({
    Profile: true,
    Account: false,
    Appearance: false,
  });

  const handleActiveStatus = (key) => {
    setActive(
      Object.fromEntries(
        Object.keys(active).map((currKey) => [
          currKey,
          currKey === key ? !active[key] : false,
        ])
      )
    );
  };

  return (
    <div
      className={`${theme} ${
        theme === "dark" ? "bg-dark-bg" : "bg-white-bg"
      } h-full flex justify-center items-center dark:border-2 dark:border-white-bg mt-5 mr-5 rounded-md`}
    >
      <aside className="h-full text-black-c dark:text-white-bg p-5 border-r-2 dark:border-r-2 dark:border-white-bg  ">
        <span className="text-xl text-black-c dark:text-white-bg ">
          Settings
        </span>
        <div className="flex-1 flex flex-col justify-center mt-10">
          <SettingsPageSideBarItems
            icon={<TbUserEdit size={15} />}
            text={"Profile"}
            path={"/user/home/settings"}
            active={active.Profile}
            func={handleActiveStatus}
          />
          <SettingsPageSideBarItems
            icon={<IoSettingsOutline size={15} />}
            text={"Account"}
            path={"/user/home/settings/account"}
            active={active.Account}
            func={handleActiveStatus}
          />
          <SettingsPageSideBarItems
            icon={<LucideAppWindowMac size={15} />}
            text={"Appearance"}
            path={"/user/home/settings/appearance"}
            active={active.Appearance}
            func={handleActiveStatus}
          />
        </div>
      </aside>
      <div className="flex-1 h-full p-5 text-white-bg">
        <Outlet />
      </div>
    </div>
  );
};

const SettingsPageSideBarItems = ({ icon, text, path, active, func }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        active ? null : func(text);
        navigate(path);
      }}
      className={`flex justify-start items-center mt-5 cursor-pointer pr-2 ${
        active
          ? "border-r-4  border-r-light-primary dark:border-r-dark-primary"
          : ""
      }  `}
    >
      {icon}
      <span className="w-24 ml-5">{text}</span>
    </div>
  );
};

SettingsPageSideBarItems.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  path: PropTypes.string,
  active: PropTypes.bool,
  func: PropTypes.func,
};
