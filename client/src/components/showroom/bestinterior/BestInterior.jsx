import React, { useState, useEffect } from "react";
import BestInteriorHeader from "./BestInteriorHeader";
import BestInteriorCarousel from "./BestInteriorCarousel";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const BestInterior = ({ viewportWidth }) => {
  const [best10Data, setBest10Data] = useState([]);

  const configParams = {
    method: "GET",
    url: "/feed/likeTop10",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
  };

  const [response, error, loading] = useAxios(configParams);

  useEffect(() => {
    if (response) {
      setBest10Data(response.data.data);
    } else if (error) {
      console.error("Error:", error);
    }
  }, [response, error]);

  if (loading) {
    toast.loading("Best10 데이터를 불러오고 있습니다.");
  } else {
    toast.dismiss(); // 로딩 메시지 닫기
  }

  return (
    <div className="flex-col">
      <>
        <BestInteriorHeader />
        {loading && (
          <div className="w-full pb-16 flex items-center justify-center h-[420px]">
            <div className="m-10 flex justify-center ">
              <img
                className="w-20 mb-12 animate__animated animate__wobble animate__infinite animate__slow"
                src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/logo.png"
                alt="BIBIloading"
              />
            </div>
          </div>
        )}
        <BestInteriorCarousel
          viewportWidth={viewportWidth}
          best10Data={best10Data}
          setBest10Data={setBest10Data}
        />
      </>
    </div>
  );
};

export default BestInterior;
