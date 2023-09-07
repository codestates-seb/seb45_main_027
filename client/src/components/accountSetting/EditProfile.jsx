import React from "react";
import axios from "axios";

const EditProfile = ({
  profileData,
  buttonStyle,
  fileInputStyle,
  inputStyle,
  handleProfileChange,
  handleProfileUpdate,
}) => {
  // let profilePictureSrc;

  // if (
  //   profileData.profilePicture instanceof File ||
  //   profileData.profilePicture instanceof Blob
  // ) {
  //   profilePictureSrc = URL.createObjectURL(profileData.profilePicture);
  // } else {
  //   profilePictureSrc = profileData.profilePicture;
  // }

  const handleImageUpload = async (e) => {
    try {
      const formData = new FormData();
      formData.append("myInfoImage", e.target.files[0]);

      const response = await axios.post(
        "http://백엔드호스트/imageUpload/myInfoImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // `response.data` will contain the S3 URL of the uploaded image
      console.log("Image uploaded:", response.data);

      // Update profileData with the new image URL
      handleProfileChange({
        target: {
          name: "profilePicture",
          value: response.data,
        },
      });
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[500px]">
      <img
        src={profileData.profilePicture}
        alt="Profile"
        className="w-[200px] h-[200px] rounded-full object-cover opacity-100"
      />
      <label
        className={`${buttonStyle} cursor-pointer flex justify-center`}
        htmlFor="profilePictureInput"
      >
        Choose Profile Picture
      </label>
      <input
        type="file"
        id="profilePictureInput"
        accept="image/*"
        className={fileInputStyle}
        onChange={handleImageUpload}
      />
      <input
        type="text"
        name="username"
        placeholder="Nickname"
        value={profileData.username}
        onChange={handleProfileChange}
        className={`${inputStyle} mt-10`}
      />
      <textarea
        name="bio"
        placeholder="Bio or Description"
        value={profileData.bio}
        onChange={handleProfileChange}
        className={`${inputStyle} pb-20`}
      />
      <button onClick={handleProfileUpdate} className={buttonStyle}>
        Update Profile
      </button>
    </div>
  );
};

export default EditProfile;
