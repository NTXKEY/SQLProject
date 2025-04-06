import { Link } from "react-router-dom";

export const DevPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-dvh gap-5 bg-dark-bg">
        <div className="bg-white-bg shadow-[0px_0px_0.5rem_rgba(0,0,0,0.25)] rounded-s p-5">
          <Link to="/login">Login</Link>
        </div>
        <div className="bg-white-bg shadow-[0px_0px_0.5rem_rgba(0,0,0,0.25)] rounded-s p-5">
          <Link to="/signup">Signup</Link>
        </div>
        <div className="bg-white-bg shadow-[0px_0px_0.5rem_rgba(0,0,0,0.25)] rounded-s p-5">
          <Link to="/user/home">home</Link>
        </div>
        <div className="bg-white-bg shadow-[0px_0px_0.5rem_rgba(0,0,0,0.25)] rounded-s p-5 ">
          <Link to="/Personalization">Personalization</Link>
        </div>
        <div className="bg-white-bg shadow-[0px_0px_0.5rem_rgba(0,0,0,0.25)] rounded-s p-5 ">
          <Link to="/new-verify">New-Verify</Link>
        </div>
        <div className="bg-white-bg shadow-[0px_0px_0.5rem_rgba(0,0,0,0.25)] rounded-s p-5">
          <Link to="/temp">Temp</Link>
        </div>
        <div className="bg-white-bg shadow-[0px_0px_0.5rem_rgba(0,0,0,0.25)] rounded-s p-5">
          <Link to="/help">Chat Bot</Link>
        </div>
      </div>
    </>
  );
};
