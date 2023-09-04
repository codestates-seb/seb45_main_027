import React from "react";

const EditProfile = ({
  profileData,
  buttonStyle,
  fileInputStyle,
  inputStyle,
  handleProfilePictureChange,
  handleProfileChange,
  handleProfileUpdate,
}) => {
  let profilePictureSrc;

  if (
    profileData.profilePicture instanceof File ||
    profileData.profilePicture instanceof Blob
  ) {
    profilePictureSrc = URL.createObjectURL(profileData.profilePicture);
  } else {
    profilePictureSrc = profileData.profilePicture;
  }

  return (
    <div className="flex flex-col justify-center items-center h-[500px]">
      <img
        src={profilePictureSrc}
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
        onChange={handleProfilePictureChange}
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
