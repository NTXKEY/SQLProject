import { useContext, useEffect, useState } from "react";
import { DoctorCard } from "./DoctorCard";
import { getDoctorData } from "@/API/apis";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonDoctorCard } from "./SkeletonDoctorCard";
import { FilterBar } from "./FilterBar";
import { filterContext } from "@/Context/Contexts";

export const Browse = () => {
  const { filters } = useContext(filterContext);
  const [doctors, setDoctors] = useState([]);
  // eslint-disable-next-line no-unused-vars

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await getDoctorData();
      console.log(response)
      setDoctors(response);
      setIsLoading(false);
    };
    setTimeout(() => {
      getData();
    }, 2000);
  }, []);

  const renderCards = (doctor, key) => {
    console.log("doctor.special", doctor.special);
    console.log("filters", filters);
    if (filters.length === 0) {
      return <DoctorCard key={key} {...doctor} />;
    }
    if (filters.includes(doctor.special)) {
      console.log("Filtered");
      return <DoctorCard key={key} {...doctor} />;
    }
  };

  return (
    <>
      <div className="m-5">
        <span className="flex font-inter text-sm font-bold opacity-50 dark:text-white-bg mt-5">
          {doctors.filter((doctor) => {
            if (filters.includes(doctor.special)) {
              return doctor;
            }
            if (filters.includes(Number(doctor.tags[0].split(" ")[0]))) {
              return doctor;
            }
          }).length ||
            doctors.length || (
              <div className="w-10 mr-5">
                <Skeleton count={1} />
              </div>
            )}{" "}
          Specialist
        </span>
      </div>
      <div className="flex overflow-y-auto">
        <div className="w-full h-full pt-3 flex flex-wrap justify-center row  gap-6 overflow-y-auto scrollbar-none ">
          {isLoading && <SkeletonDoctorCard cards={9} />}
          {!isLoading && doctors.map((doctor, key) => renderCards(doctor, key))}
        </div>
        <div className="h-full pt-3 mr-1 flex">
          <FilterBar />
        </div>
      </div>
    </>
  );
};
