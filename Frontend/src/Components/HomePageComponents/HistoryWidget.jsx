import { themeContext } from "@/Context/Contexts";
import { useContext, useState } from "react";
import { HistoryCard } from "./HistoryCard";

export const HistoryWidget = () => {
  const { theme } = useContext(themeContext);

  // eslint-disable-next-line no-unused-vars
  const [medicalHistory, setMedicalHistory] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const getMedicalHistory = async () => {
    // Write the Api call to save MedicalHistory into the medicalHistory state

    const response = "";

    setMedicalHistory(response.data);
  };
  const renderMedicalHistoryCard = (historyData, key) => {
    return <HistoryCard key={key} {...historyData} />;
  };

  return (
    <div
      className={`${theme} ${
        theme === "dark" ? "bg-dark-bg-alt" : "bg-white-bg"
      } w-[400px] h-[300px]  p-5 flex flex-col gap-5 shadow-[0px_0px_0.2rem_rgba(0,0,0,0.15)] text-black-c dark:text-white-bg dark:border-2 dark:border-white-bg dark:border-opacity-10 rounded-md  `}
    >
      <div className="w-full flex items-center justify-between border-b-2 pb-3 border-light-primary dark:border-dark-primary">
        <span className="text-base font-inter">History</span>
        <div className="flex items-center gap-3"></div>
      </div>
      <div className=" w-full px-1 py-1 gap-3 flex flex-col overflow-y-auto scrollbar-none ">
        {medicalHistory.length > 0 ? (
          medicalHistory.map((medicalHistory, key) =>
            renderMedicalHistoryCard(medicalHistory, key)
          )
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 transition-all duration-300">
            <HistoryCard
              name={"Ramesh Sharma"}
              special={"Dermatologist"}
              date={"10/10/2023"}
              reason={"Skin Cancer"}
            />
            <HistoryCard
              name={"Rahul Deshmukh"}
              special={"Nephrologist"}
              date={"10/10/2023"}
              reason={"Kidney Disease"}
            />
            <HistoryCard
              name={"Vinay Joshi"}
              special={"Oncologist"}
              date={"10/10/2023"}
              reason={"Cancer"}
            />
          </div>
        )}
      </div>
    </div>
  );
};
