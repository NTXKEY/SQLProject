import { Outlet } from "react-router-dom";
import { SideBar } from "../Components/HomePageComponents/SideBar";
import { TopBar } from "@/Components/HomePageComponents/Topbar";
import { useContext, useState } from "react";
import { themeContext, filterContext } from "@/Context/Contexts";
import { DoctorDetailsContextComponent } from "@/Context/DoctorDetailsContextComponent";

export const HomePageLayout = () => {
  const { theme } = useContext(themeContext);
  const [filters, setFilters] = useState([]);

  const handleClick = (event) => {
    const { name, checked } = event.target;
    console.log("name", name);
    if (checked) {
      setFilters([...filters, name]);
    } else {
      setFilters(filters.filter((item) => item !== name));
    }
  };

  return (
    <DoctorDetailsContextComponent>
      <filterContext.Provider value={{ filters, setFilters, handleClick }}>
        <div
          className={`${theme} w-dvw h-dvh flex ${
            theme === "dark" ? "bg-dark-bg" : "bg-light-neutral"
          } transition-all `}
        >
          <SideBar />
          <div className="w-full flex flex-col overflow-hidden pt-5 mb-5">
            <TopBar />
            <Outlet />
          </div>
        </div>
      </filterContext.Provider>
    </DoctorDetailsContextComponent>
  );
};
