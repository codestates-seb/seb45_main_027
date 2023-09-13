import React from "react";

const coverImg =
  "flex items-center justify-center aspectRatioImage_16_9 object-cover w-full h-full"; 

const ViewCoverImg = ({ setFeedData, feedData }) => {
  console.log(feedData);
  return (
    <div className="relative pt-0 md:pt-24 max-h-[calc(100vh-350px)] aspectRatioImage_16_9 bg-white">
      {feedData.coverPhoto ? (
        <img src={feedData.coverPhoto} alt="Cover" className={coverImg} />
      ) : (
        <div className={coverImg}>
          <img
            className="object-contain h-full"
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/loading.gif"
            alt="로딩중"
          />
        </div>
      )}
    </div>
  );
};

export default ViewCoverImg;
