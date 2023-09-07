import React, { useState } from "react";

const WriteCoverImg = ({ bgColor, btnColor }) => {
  const [image, setImage] = useState(null);

  const imageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    document.getElementById("hiddenFileInput").click();
  };

  return (
    <div className="w-full h-full flex mt-10">
      <div
        className={`${bgColor} w-full h-[500px] flex flex-col justify-center items-center text-xl rounded-md shadow`}
      >
        {image ? (
          <img
            src={image}
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

        {!image ? (
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
