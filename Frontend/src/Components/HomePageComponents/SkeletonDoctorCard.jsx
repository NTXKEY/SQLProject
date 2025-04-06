import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SkeletonDoctorCard = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, key) => (
      <div
        key={key}
        className={`w-[350px] h-96 flex flex-col rounded p-5 dark:text-white-bg border-2 dark:border-2 dark:border-opacity-30 dark:border-white-bg hover:cursor-pointer overflow-hidden`}
      >
        <Skeleton />
        <span className="text-sm flex items-center gap-2 font-bold">
          <div className="text-Green-500"></div>
        </span>
        <div className=" shadow-[0px_0px_0.2rem_rgba(0,0,0,0.15)] dark:shadow-[0px_0px_0.2rem_rgba(255,255,255,0.1)] rounded-lg mt-5 p-2">
          <div className="flex items-center">
            <div className="rounded-full  flex justify-center items-center">
              <Skeleton circle height={60} width={60} />
            </div>
            <div className="w-32 flex flex-col">
              <span className=" ml-3 font-bold text-xl font-roboto">
                <Skeleton />
              </span>
              <span className=" ml-3 font-bold font-roboto text-xs opacity-50 dark:opacity-50">
                <Skeleton />
              </span>
            </div>
          </div>

          <div className="w-full mt-3 flex flex-wrap whitespace-nowrap">
            <Skeleton />
          </div>
        </div>
        <div className="leading-6 text-base font-robotoCondensed tracking-tight mt-6">
          <Skeleton count={2} />
        </div>
        <div className="mt-auto flex items-center justify-between cursor-pointer">
          <span className="w-16 text-xs font-semibold">
            <Skeleton />
          </span>
          <div className="flex items-center gap-1">
            <span className="w-56 text-xs font-semibold tracking-tight text-white-bg px-3 py-2 rounded-2xl">
              <Skeleton />
            </span>
            <div className=" ">
              <Skeleton circle height={40} width={40} />
            </div>
          </div>
        </div>
      </div>
    ));
};
