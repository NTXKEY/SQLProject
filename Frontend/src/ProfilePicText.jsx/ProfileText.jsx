import axios from "axios";
import { useEffect, useState } from "react";
const ProfileText = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [Response, setResponse] = useState("");
  const [upload, setUpload] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(false);
  useEffect(() => {
    Call();
  }, []);
  let response;
  const Call = async () => {
    try {
      response = await axios.get(
        "http://localhost:5000/api/user/get/profile/waste",
        {
          responseType: "blob",
        }
      );
      const dataUrl =
        (await response.data.message) === null ? "" : response.data;
      // const url = URL.createObjectURL(response.data);
      const url = URL.createObjectURL(dataUrl);
      setImgUrl(url);
      // const contentDisposition = response.headers["content-disposition"];
      // let filename = "downloaded_file.pdf"; // Default filename
      // if (contentDisposition) {
      //   const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      //   const matches = filenameRegex.exec(contentDisposition);
      //   if (matches != null && matches[1]) {
      //     filename = matches[1].replace(/['"]/g, ""); // Remove quotes
      //   }
      // }
      // saveAs(response.data, filename);
      console.log(response);
    } catch (Err) {
      console.log(Err);
    }
  };
  const uploadProfile = async () => {
    // setUpload(e.target.files[0]);
    // console.log(e.target.files[0]);
    if (!upload) return;
    try {
      const patchData = new FormData();
      patchData.append("profilePic", upload);
      response = await axios.patch(
        "http://localhost:5000/api/user/profilePatch/waste",
        patchData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setUploadResponse(true);
      Call();
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteProfile = async () => {
    response = await axios.delete(
      "http://localhost:5000/api/user//delete/profile/waste"
    );
    console.log(response);
    setResponse(response.data.message);
    setImgUrl("");
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      {imgUrl ? (
        <>
          <img
            src={imgUrl}
            className="w-24 h-24 rounded-full object-cover   "
            alt="Profile"
          />
          <button
            onClick={DeleteProfile}
            className="bg-Red-500 text-white-bg m-4 p-2 rounded-lg"
          >
            Delete Profile
          </button>
          <p>{Response}</p>
        </>
      ) : (
        // <embed
        //   src={imgUrl}
        //   type="application/pdf"
        //   className="w-full h-full rounded-full object-cover   "
        //   alt="Profile"
        // />
        <p>Loading image...</p>
      )}
      <input
        type="file"
        onChange={(e) => setUpload(e.target.files[0])}
        className="m-4 p-2"
      />
      <button
        onClick={uploadProfile}
        className="bg-Blue-500 text-black-c  p-2 rounded-lg"
      >
        Upload Profile
      </button>
    </div>
  );
};

export default ProfileText;
