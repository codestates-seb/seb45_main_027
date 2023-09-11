import React, { useState, useEffect } from "react";
import Background from "../components/common/Background";
import BestInterior from "../components/showroom/bestinterior/BestInterior";
import All from "../components/showroom/all/All";
import useAxios from "../hooks/useAxios";
import { toast } from "react-hot-toast";

const ShowRoom = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [showroomData, setShowroomData] = useState("");
  console.log(showroomData);

  console.log(showroomData);
  const configParams = {
    method: "GET",
    url: "/feed/filter/RECENT00",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
  };

  const [response, error, loading] = useAxios(configParams);

  useEffect(() => {
    if (response) {
      setShowroomData(response.data.data);
    } else if (error) {
      console.error("Error:", error);
    }
  }, [response, error]);

  useEffect(() => {
    // 반응형 조건부렌더링
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    // 언마운트시 리스너제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [viewportWidth]);

  useEffect(() => {
    if (!showroomData && loading) {
      toast.loading("로딩중...");
    } else if (showroomData || error) {
      toast.dismiss();
    }
  }, [showroomData, loading, error]);

  if (!showroomData) {
    return (
      <div className="flex justify-center h-auto">
        <img
          src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/loading.gif"
          alt="로딩중"
        />
      </div>
    );
  }

  return (
    <Background mainclassName="h-full bg-[#FFFAEE]">
      <div className="flex-col w-full">
        <BestInterior
          viewportWidth={viewportWidth}
          showroomData={showroomData}
        />
        <All
          viewportWidth={viewportWidth}
          setViewportWidth={setViewportWidth}
          showroomData={showroomData}
        />
      </div>
    </Background>
  );
};

export default ShowRoom;
