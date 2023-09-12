import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";

const coverImg =
  "flex items-center justify-center aspectRatioImage_16_9 md:max-h-[calc(100vh-350px)]";

const ViewCoverImg = () => {
  const [coverPhoto, setCoverPhoto] = useState(null);
  const { tipId } = useParams();
  console.log(coverPhoto);

  const configParams = {
    method: "GET",
    url: `/tip/${tipId}`,
    headers: {
      "ngrok-skip-browser-warning": "69420",
    },
  };

  const [response, error, loading] = useAxios(configParams);

  useEffect(() => {
    if (response) {
      setCoverPhoto(response.data.coverPhoto);
    } else if (error) {
      console.error("Error:", error);
    }
  }, [response, error]);

  useEffect(() => {
    if (!coverPhoto && loading) {
      toast.loading("로딩중...");
    } else if (coverPhoto || error) {
      toast.dismiss();
    }
  }, [coverPhoto, loading, error]);

  return (
    <div className="pt-0 md:pt-24 max-h-[calc(100vh-350px)] aspectRatioImage_16_9 bg-white">
      {coverPhoto ? (
        <img src={coverPhoto} alt="Cover" className={coverImg} />
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
