import React, { useState } from "react";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

const WriteCoverImg = ({ bgColor, btnColor, coverImage, setCoverImage }) => {
  const imageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const formData = new FormData();
    formData.append("coverPhotoImage", file);

    reader.onloadend = () => {
      setCoverImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    axios
      .post(
        "http://ec2-54-180-26-247.ap-northeast-2.compute.amazonaws.com:8080/imageUpload/coverImage",
        formData
      )
      .then((response) => {
        console.log(response.data);
        console.log("S3업로드 성공");
      })
      .catch((error) => {});
  };

  const handleUpload = () => {
    document.getElementById("hiddenFileInput").click();
  };

  return (
    <div className="w-full h-full flex mt-10">
      <div
        className={`${bgColor} w-full h-[500px] flex flex-col justify-center items-center text-xl rounded-md shadow`}
      >
        {coverImage ? (
          <img
            src={coverImage}
            alt="CoverImg"
            className="w-full h-[100%] rounded-md object-cover"
            onClick={handleUpload}
          />
        ) : (
          <span className="font-semibold text-gray-500 mb-10">
            추가하기 버튼으로 커버사진을 업로드 해주세요.
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="hiddenFileInput"
          onChange={imageUpload}
        />

        {!coverImage ? (
          <button
            className={`${btnColor} text-white px-10 py-2 rounded-md shadow mt-10`}
            onClick={handleUpload}
          >
            커버사진 추가하기
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default WriteCoverImg;
