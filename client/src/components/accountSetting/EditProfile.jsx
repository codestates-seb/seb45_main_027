import React from "react";
import axios from "axios";

const EditProfile = ({
  profileData,
  setProfileData,

  buttonStyle,
  fileInputStyle,
  inputStyle,

  handleProfileUpdate,
}) => {
  //유저가 사진 업로드시 서버로 보냄
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const formData = new FormData();
    formData.append("myInfoImage", file);

    const baseURL = process.env.REACT_APP_API_URL;

    reader.onloadend = () => {
      setProfileData({ ...profileData, profilePicture: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    try {
      const response = await axios.post(
        `${baseURL}/imageUpload/myInfoImage`,
        formData
      );

      //이미지 업로드 성공시 응답으로 받은 사진 경로 확인
      console.log("Image uploaded:", response.data);
      // 응답으로 받은 사진을 여기서 저장해서 유저한테 보여줌
      setProfileData({ ...profileData, profilePicture: response.data });
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageDelete = async () => {};


  return (
    <div className="flex flex-col justify-center items-center h-[500px]">
      <img
        src={profileData.profilePicture}
        alt="Profile"
        className="w-[200px] h-[200px] rounded-full object-cover opacity-100"
      />
      <div className='flex flex-row'>
        <label
          className={`${buttonStyle} cursor-pointer flex justify-center`}
          htmlFor="profilePictureInput"
        >
          Choose Profile Picture
        </label>
        <button className={buttonStyle} onClick={handleImageDelete}>Delete</button>
      </div>
      <input
        type="file"
        id="profilePictureInput"
        accept="image/*"
        className={fileInputStyle}
        onChange={handleImageUpload}
      />
      <input
        type="text"
        name="nickname"
        placeholder="Nickname"
        value={profileData.username}
        onChange={handleProfileChange}
        className={`${inputStyle} mt-10`}
      />
      <textarea
        name="myIntro"
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
