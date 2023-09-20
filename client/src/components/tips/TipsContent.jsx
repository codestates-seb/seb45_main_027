import React, { useState } from "react";
import TipsInfo from "./TipsInfo";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../common/tokens";

const TipsContent = ({ tipData, setTipData }) => {
  // 북마크 상태를 변경시켜주는 함수
  const toggleBookmark = async (tipId) => {
    try {
      // API 호출을 위한 설정 객체
      const configParams = {
        method: "PATCH",
        url: `/tip/${tipId}/tipbookmark`,
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      };

      // API 호출
      const response = await api(configParams);

      // API 호출이 성공했을 때 이미지 상태 업데이트
      if (response.status === 200) {
        // showroomData 배열을 복사하여 새로운 배열을 생성
        const updatedTipData = [...tipData];

        // feedId와 일치하는 요소 찾기
        const updatedItemIndex = updatedTipData.findIndex(
          (item) => item.tipId === tipId
        );
        if (updatedItemIndex !== -1) {
          // feedId가 일치하는 요소가 있다면 bookMarkYn 값을 업데이트
          if (response.data.data.bookmarkYn === true) {
            toast.success("북마크가 등록되었습니다!");
          } else {
            toast.success("북마크가 해제되었습니다!");
          }
          updatedTipData[updatedItemIndex].bookmarkYn =
            response.data.data.bookmarkYn;
          setTipData(updatedTipData); // 업데이트된 배열을 상태로 설정합니다.
        }
      }
    } catch (error) {
      toast.error("로그인이 필요한 서비스 입니다.");
      localStorage.setItem("prevPath", window.location.pathname);
      navigate("/login");
      console.error("북마크 토글 실패:", error);
    }
  };

  const navigate = useNavigate();

  // 게시글 클릭시 페이지 이동하는 핸들러 함수
  const handleTipClick = (tipId) => {
    navigate(`/tips/${tipId}`);
  };
  return (
    <div>
      <div className="w-full h-full my-5 align-between sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-20 gap-y-4 px-8">
        {tipData.map((item, idx) => (
          <div key={idx} className="mb-3 h-full">
            <div className="relative">
              <img
                // 이미지 주소 바꿔줘야함
                // src="/asset/image.png"
                src={item.coverPhoto}
                alt="tipsimg"
                className="h-full aspectRatioImage_1_1 rounded-md cursor-pointer"
                onClick={() => handleTipClick(item.tipId)}
              />
              <p>
                <img
                  src={
                    item.bookmarkYn
                      ? "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/isBookmarked.png"
                      : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/bookmark.png"
                  }
                  alt="Bookmark"
                  className="absolute w-10 h-10 bottom-4 right-4 cursor-pointer"
                  onClick={() => toggleBookmark(item.tipId)}
                />
              </p>
            </div>
            <TipsInfo handleTipClick={handleTipClick} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsContent;
