import { useState } from "react";
import axios from "axios";
// import { generateOTP } from "../Utils/util";
import { sendReq } from "../Utils/MailUtil";
// import { OtpGenerator } from "../Utils/OtpGenerator";
import toast from "react-hot-toast";

export const Temp = () => {
  const form = {
    from: "projectvitalcure@gmail.com",
    to: "rohitrajandev@gmail.com",
    subject: "test",
    text: "Hello",
  };
  const [msg, setMsg] = useState("not verified");

  const mail = { email: "rohitrajandev@gmail.com" };

  // console.log(form);

  const verify = async () => {
    const res = await axios.post("http://localhost:5000/api/mail/send", mail);
    setMsg(res.data.message);
  };

  const getDoctorData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/doctor/get/all`
      );
      response.data.map((item) => console.log(item));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectOption = (event) => {
    const selectedOption = event.target.value;
    console.log(selectedOption);
  };

  return (
    <>
      <div className="w-dvw h-dvh flex flex-col justify-center items-center">
        <button
          className=" flex justify-center items-center w-full p-5"
          onClick={() => {
            sendReq(form);
          }}
        >
          Send Mail
        </button>

        <div className="w-dvw  flex justify-center items-center">
          <button
            onClick={() => {
              verify();
            }}
          >
            <h2 className="w-full flex justify-center items-center p-5">
              Verify
            </h2>
          </button>
        </div>
        <h2 className="w-full flex justify-center items-center p-5">{msg}</h2>

        <div className="w-dvw  flex justify-center items-center">
          <button
            onClick={() => {
              toast.success("Toast");
            }}
          >
            <h2 className="w-full flex justify-center items-center p-5">
              Toast
            </h2>
          </button>
        </div>
        <div className="w-dvw  flex justify-center items-center">
          <button onClick={getDoctorData}>
            <h2 className="w-full flex justify-center items-center p-5">
              get Doctor
            </h2>
          </button>
        </div>
        <div className="">
          <span className="mr-3">Time</span>
          <select
            onClick={handleSelectOption}
            className="p-2 rounded"
            name=""
            id=""
          >
            <option value="09 : 00 AM">09 : 00 AM</option>
            <option value="10 : 00 AM">10 : 00 AM</option>
            <option value="11 : 00 AM">11 : 00 AM</option>
            <option value="12 : 00 PM">12 : 00 PM</option>
            <option value="01 : 00 PM">01 : 00 PM</option>
            <option value="02 : 00 PM">02 : 00 PM</option>
            <option value="03 : 00 PM">03 : 00 PM</option>
            <option value="04 : 00 PM">04 : 00 PM</option>
            <option value="05 : 00 PM">05 : 00 PM</option>
            <option value="06 : 00 PM">06 : 00 PM</option>
            <option value="07 : 00 PM">07 : 00 PM</option>
          </select>
        </div>
      </div>
    </>
  );
};
