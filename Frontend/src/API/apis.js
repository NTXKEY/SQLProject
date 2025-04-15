import axios from "axios";
export const backEndUrl = `http://localhost:5000`;

export const sendReq = async (form) => {
  try {
    const response = await axios.post("http://localhost:5000/api/mail", form);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const signUpAPI = async (form) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      form
    );
    return response;
  } catch (error) {
    console.error(error);
    return { data: { message: error } };
  }
};

export const loginAPI = async (body) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      body
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return { data: { message: error } };
  }
};

export const saveDetailsAPI = async (body) => {
  const {
    username,
    name,
    address,
    contactNumber,
    DOB,
    gender,
    oocupation,
    medicalConditions,
  } = body;
  console.log(body);
  const data = {
    username,
    name,
    address,
    contactNumber,
    DOB,
    gender,
    oocupation,
    medicalConditions,
  };
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/user/patch/${username}/details`,
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const verifyDetails = async (body) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/getOne",
      body
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const checkPasswordValidity = async (body) => {
  try {
    const response = await axios.post(
      `${backEndUrl}/api/user/verifyPassword`,
      body
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updatePassword = async (body) => {
  try {
    const { email, password } = body;
    const getUsername = await axios.post(
      "http://localhost:5000/api/auth/getOne",
      { email }
    );
    const username = getUsername.data.result.username;
    const response = await axios.patch(
      `http://localhost:5000/api/auth/updatePassword/${username}`,
      { password }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const accountStatus = async (body) => {
  try {
    const { email } = body;
    const response = await axios.post("http://localhost:5000/api/auth/getOne", {
      email,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getDetails = async (body) => {
  try {
    const { username } = body;
    const response = await axios.get(
      `http://localhost:5000/api/user/get/${username}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getDoctorData = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/doctor/get/all`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchUser = async (body) => {
  const { username } = body;
  try {
    const response = await axios.patch(
      `${backEndUrl}/api/user/patch/${username}`,
      body
    );
    console.log(response.data.response);
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (user) => {
  console.log(user);
  try {
    const response = await axios.delete(
      `${backEndUrl}/api/user/delete/${user}`
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getAllSQLData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/user/get/all");
    console.log("response", response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addAppointment = async (body) => {
  console.log(body);
  try {
    const response = await axios.post(
      "http://localhost:5000/api/appointments/add",
      body
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
