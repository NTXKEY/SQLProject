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
    return response;
  } catch (error) {
    console.error(error);
    return { data: { message: error } };
  }
};

export const verifyResetEmail = async (body) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/passwordReset/verify",
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const saveDetailsAPI = async (body) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/save",
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

// export const getAccountType = async (body) => {
//   try {
//     const { email } = body;
//     const getUsernameRequest = await axios.post(
//       "http://localhost:5000/api/auth/getOne",
//       { email }
//     );
//     const username = getUsernameRequest.data.result.username;
//     const response = await axios.get(
//       `http://localhost:5000/api/user/get/${username}`
//     );
//     if (response.data.name) return "user";

//     const response2 = await axios.get(
//       `http://localhost:5000/api/doctor/get/${username}`
//     );

//     if (response2.data.name) return "doctor";
//     return { response: { data: { message: "User Not Found" } } };
//   } catch (error) {
//     console.error(error);
//   }
// };

export const getDetails = async (body) => {
  try {
    const { email } = body;
    const getUsernameRequest = await axios.post(
      "http://localhost:5000/api/auth/getOne",
      { email }
    );
    const username = getUsernameRequest.data.result.username;
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

// export const getDetails = async (body) => {
//   try {
//     const { email } = body;
//     const getUsernameRequest = await axios.post(
//       `${backEndUrl}/api/auth/getOne`,
//       { email }
//     );
//     const username = getUsernameRequest.data.result.username;
//     const response = await axios.get(`${backEndUrl}/api/user/get/${username}`);
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const GetProfile = async (user) => {
  try {
    const response = await axios.get(
      `${backEndUrl}/api/user/get/profile/${user}`,
      {
        responseType: "blob",
      }
    );
    const contentType = response.headers["content-type"];
    if (contentType.startsWith("image/")) {
      const url = URL.createObjectURL(response.data);

      return url;
    } else if (contentType.includes("application/json")) {
      const text = await response.data.text();
      const json = JSON.parse(text);
      if (json.profilePic === null) {
        return null;
      }
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.log("Profile pic file not found or user not found.");
    } else {
      console.error("Error fetching profile picture:", err);
    }
    return;
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
