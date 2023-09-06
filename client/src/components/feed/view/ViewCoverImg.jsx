import React, { useEffect, useState } from "react";
import axios from "axios";

const coverImg =
  "flex items-center justify-center aspectRatioImage_16_9 md:max-h-[calc(100vh-350px)]";

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
    <div className="pt-0 md:pt-24 max-h-[calc(100vh-350px)] aspectRatioImage_16_9 bg-white">
      {coverPhoto ? (
        <img src={coverPhoto} alt="Cover" className={coverImg} />
      ) : (
        <div className={coverImg}>
          <img src="/images/loading.gif" alt="로딩중" />
        </div>
      )}
    </div>
  );
};

export default ViewCoverImg;
