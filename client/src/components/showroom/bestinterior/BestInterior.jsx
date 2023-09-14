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
      // toast.loading("데이터를 불러오는 중입니다.");
      setBest10Data(response.data.data);
      console.log(best10Data);
      // toast.dismiss(); // 로딩 메시지 닫기
    } else if (error) {
      console.error("Error:", error);
    }
  }, [response, error]);

  return (
    <div className="flex-col">
      <BestInteriorHeader />
      <BestInteriorCarousel
        viewportWidth={viewportWidth}
        best10Data={best10Data}
      />
    </div>
  );
};

export default BestInterior;
