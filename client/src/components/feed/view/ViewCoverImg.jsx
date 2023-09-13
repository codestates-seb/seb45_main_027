import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const coverImg =
  "flex items-center justify-center aspectRatioImage_16_9 object-cover w-full h-full"; // object-cover, w-full, h-full 추가

const ViewCoverImg = ({ coverPhoto, loading, error }) => {
  useEffect(() => {
    if (!coverPhoto && loading) {
      toast.loading("로딩중...");
    } else if (coverPhoto || error) {
      toast.dismiss();
    }
  }, [coverPhoto, loading, error]);

  return (
    <div className="relative pt-0 md:pt-24 max-h-[calc(100vh-350px)] aspectRatioImage_16_9 bg-white">
      {coverPhoto ? (
        <img src={`${coverPhoto}`} alt="Cover" className={coverImg} />
      ) : (
        <div className={coverImg}>
          <img
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/loading.gif"
            alt="로딩중"
          />
        </div>
      )}
    </div>
  );
};

export default ViewCoverImg;
