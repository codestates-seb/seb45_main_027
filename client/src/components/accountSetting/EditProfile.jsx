import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditProfile = ({
  profileData,
  setProfileData,

  buttonStyle,
  fileInputStyle,
  inputStyle,

  handleProfileUpdate,
}) => {
  const [imageUploadInProgress, setImageUploadInProgress] = useState(false);

  //유저가 사진 업로드시 서버로 보냄
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const formData = new FormData();
    formData.append("myInfoImage", file);

    setImageUploadInProgress(true);

    reader.onloadend = () => {
      setProfileData({ ...profileData, profileImg: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    toast.loading("이미지를 업로드중입니다...");

    try {
      const response = await axios.post(`/imageUpload/myInfoImage`, formData, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });

      //이미지 업로드 성공시 응답으로 받은 사진 경로 확인
      //console.log("Image uploaded:", response.data);

      // 응답으로 받은 사진을 여기서 저장해서 유저한테 보여줌
      setProfileData({ ...profileData, profileImg: response.data });
    } catch (error) {
      //console.error("Image upload failed:", error);
      toast.error("사진 업로드에 실패했습니다. 이미지는 10mb 이하로 업로드해주세요.");
      setProfileData({ ...profileData, profileImg: null });
    } finally {
      setImageUploadInProgress(false);
      toast.dismiss();
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageDelete = async () => {
    setProfileData({ ...profileData, profileImg: null });
  };

  return (
    <div className="flex flex-col justify-center items-center h-[500px]">
      <img
        src={
          profileData.profileImg
            ? profileData.profileImg
            : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userImg.png"
        }
        alt="Profile"
        className="w-[200px] h-[200px] mb-6 rounded-full object-cover opacity-100"
      />
      <div className="flex flex-row">
        <label
          className={`${buttonStyle} cursor-pointer flex justify-center mr-1`}
          htmlFor="profilePictureInput"
        >
          Choose Profile Picture
        </label>
        <button className={buttonStyle} onClick={handleImageDelete}>
          Delete
        </button>
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
        value={profileData.nickname}
        onChange={handleProfileChange}
        className={`${inputStyle} mt-8`}
      />
      <textarea
        name="myIntro"
        placeholder="Bio or Description"
        value={profileData.myIntro}
        onChange={handleProfileChange}
        className={`${inputStyle} pb-20`}
      />
      <button
        onClick={handleProfileUpdate}
        className={buttonStyle}
        disabled={imageUploadInProgress}
      >
        Update Profile
      </button>
    </div>
  );
};

export default EditProfile;
