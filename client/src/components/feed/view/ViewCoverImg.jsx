import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewCoverImg = () => {
  const [coverPhoto, setCoverPhoto] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/feed/{parameter}`)
      .then((res) => {
        setCoverPhoto(res.data.coverPhoto);
      })
      .catch((err) => {
        console.log("Error msg:", err);
      });
  }, []);

  return (
    <div className="pt-0 md:pt-24 w-full max-h-[calc(100vh-350px)] h-96 md:h-[787px] bg-red-500">
          {coverPhoto
              ? (
        <img src={coverPhoto} alt="Cover" className="w-full h-full" />
              )
              : (
        <div className="w-full h-full"> 커버 이미지 예정 </div>
      )}
    </div>
  );
};

export default ViewCoverImg;
