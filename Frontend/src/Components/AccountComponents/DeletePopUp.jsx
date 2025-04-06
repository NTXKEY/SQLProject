/* eslint-disable react/prop-types */
import { GrClose } from "react-icons/gr";
import { btnHover, btnHoverLight } from "../../Pages/ProfilePage";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "@/API/apis";
import toast from "react-hot-toast";
import { useContext } from "react";
import { detailsContext } from "@/Context/Contexts";

const DeletePopUp = ({ handleDeleteClicked }) => {
  const { userDetails } = useContext(detailsContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/signup");
  };
  const handleDelete = async () => {
    try {
      const response = await deleteUser(userDetails.username);
      response != null ? handleLogout() : toast.error("user not found !!");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" absolute z-50 flex items-center justify-center h-[70vh] w-full md:max-w-[30vw] ">
      {/* <> */}
      <div className=" relative shadow-[0px_0px_0.5rem_rgba(0,0,0,0.15)] dark:shadow-[0px_0px_0.5rem_rgba(255,255,255,255.15)]   rounded-xl  p-10 w-full bg-white-bg dark:bg-dark-bg-alt  ">
        <div className="flex flex-col items-center justify-center w-full gap-4 mb-6 ">
          <ul>
            <li>
              <span className="text-black-c dark:text-white-bg font-inter font-semibold whitespace-nowrap opacity-55 dark:opacity-100  ">
                Deleting Your Account
              </span>
            </li>
            <li>
              <span className="text-black-c dark:text-white-bg font-inter font-semibold whitespace-nowrap opacity-55 dark:opacity-100  ">
                May lead to clearing Your entire data
                <br /> related to this Web-App
              </span>
            </li>
            <li>
              <span className="text-black-c dark:text-white-bg font-inter font-semibold whitespace-nowrap opacity-55 dark:opacity-100  ">
                and you won&apos;t be able login next time
              </span>
            </li>
          </ul>
        </div>
        {/* </> */}
        <div className={`absolute bottom-1 right-2 mt-5  `}>
          <button
            // onClick={handleLogout}
            onClick={handleDelete}
            className={` w-full rounded-md p-2 px-6 text-color-white ${btnHover} ${btnHoverLight}`}
          >
            Delete
          </button>
        </div>
        <div className={`absolute top-2 right-4 text-xl`}>
          <button
            onClick={handleDeleteClicked}
            // className={` w-full rounded-md p-2 px-4 text-color-white ${btnHover} ${btnHoverLight}`}
          >
            <GrClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
DeletePopUp.propTypes = {
  isDeleClicked: PropTypes.bool,
  setIsDeleClicked: PropTypes.func,
};
