import { themeContext } from "@/Context/Contexts";
import { useContext, useState } from "react";
import { FilesCard } from "./FilesCard";

export const FilesWidget = () => {
  const { theme } = useContext(themeContext);

  const [files, setFiles] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const getFiles = async () => {
    // write the api call to save Files into the Files state

    const response = "";

    setFiles(response.data);
  };

  const renderFiles = (fileData, key) => {
    return <FilesCard key={key} {...fileData} />;
  };

  return (
    <div
      className={`${theme} ${
        theme === "dark" ? "bg-dark-bg-alt" : "bg-white-bg"
      } w-[300px] h-full  p-4 flex flex-col gap-5 shadow-[0px_0px_0.2rem_rgba(0,0,0,0.15)] text-black-c dark:text-white-bg dark:border-2 dark:border-white-bg dark:border-opacity-10 rounded-md overflow-hidden `}
    >
      <div className="w-full flex items-center justify-between border-b-2 pb-2 border-light-primary dark:border-dark-primary">
        <span className="text-sm font-inter">Your Files</span>
      </div>
      <div className=" w-full px-1 py-1 gap-5 flex flex-col overflow-y-auto scrollbar-none ">
        {files.length > 0 ? (
          files.map((files, key) => renderFiles(files, key))
        ) : (
          <div>
            <FilesCard fileName={"File"} />
            <FilesCard fileName={"File"} />
            <FilesCard fileName={"File"} />
            <FilesCard fileName={"File"} />
            <FilesCard fileName={"File"} />
            <FilesCard fileName={"File"} />
          </div>
        )}
      </div>
    </div>
  );
};
