import React, { useState, useEffect } from "react";
import Background from "../components/common/Background";
import TipsHeader from "../components/tips/TipsHeader";
import TipsContent from "../components/tips/TipsContent";
import FooterMobile from "../components/footer/FooterMobile";
import useAxios from "../hooks/useAxios";
import { toast } from "react-hot-toast";

const Tips = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [tipData, setTipData] = useState("");

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
      setTipData(response.data.data);
    } else if (error) {
      console.error("Error:", error);
    }
  }, [response, error]);
  console.log(tipData);

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
  }, []);

  // 로딩시 토스트 및 이미지 처리
  useEffect(() => {
    if (!tipData && loading) {
      toast.loading("로딩중...");
    } else if (tipData || error) {
      toast.dismiss();
    }
  }, [tipData, loading, error]);

  if (!tipData) {
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
    <>
      <Background mainclassName="h-full bg-[#FFFAEE]" divclassName="">
        <div className="flex-col w-full">
          <TipsHeader viewportWidth={viewportWidth} />
          <TipsContent tipData={tipData} />
        </div>
      </Background>
      {viewportWidth < 720 && <FooterMobile />}
    </>
  );
};

export default Tips;
