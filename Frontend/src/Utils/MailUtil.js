import axios from "axios";

export const sendReq = async (body) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/mail/send",
      body
    );
    alert(response.data.message);
    return response;
  } catch (error) {
    console.error(error);
  }
};
