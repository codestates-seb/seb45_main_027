import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../common/tokens";
import { toast } from "react-hot-toast";

const data = [
  { url: "./asset/image.png", isBookmarked: true, feedId: 1 },
  { url: "./asset/image2.png", isBookmarked: false, feedId: 2 },
  { url: "./asset/image3.png", isBookmarked: false, feedId: 3 },
  { url: "./asset/image4.png", isBookmarked: false, feedId: 4 },
  { url: "./asset/image.png", isBookmarked: false, feedId: 5 },
  { url: "./asset/image2.png", isBookmarked: false, feedId: 6 },
  { url: "./asset/image3.png", isBookmarked: false, feedId: 7 },
  { url: "./asset/image4.png", isBookmarked: false, feedId: 8 },
  { url: "./asset/image.png", isBookmarked: true, feedId: 9 },
  { url: "./asset/image2.png", isBookmarked: false, feedId: 10 },
  { url: "./asset/image3.png", isBookmarked: false, feedId: 11 },
  { url: "./asset/image4.png", isBookmarked: false, feedId: 12 },
  { url: "./asset/image.png", isBookmarked: false, feedId: 13 },
  { url: "./asset/image2.png", isBookmarked: false, feedId: 14 },
  { url: "./asset/image3.png", isBookmarked: false, feedId: 15 },
  { url: "./asset/image4.png", isBookmarked: false, feedId: 16 },
  { url: "./asset/image.png", isBookmarked: true, feedId: 17 },
  { url: "./asset/image2.png", isBookmarked: false, feedId: 18 },
  { url: "./asset/image3.png", isBookmarked: false, feedId: 19 },
  { url: "./asset/image4.png", isBookmarked: false, feedId: 20 },
  { url: "./asset/image.png", isBookmarked: false, feedId: 21 },
  { url: "./asset/image2.png", isBookmarked: false, feedId: 22 },
  { url: "./asset/image3.png", isBookmarked: false, feedId: 23 },
  { url: "./asset/image4.png", isBookmarked: false, feedId: 24 },
];

const AllContent = ({ showroomData, setShowroomData }) => {
  const navigate = useNavigate();

  // 북마크 상태를 변경시켜주는 함수
  const toggleBookmark = async (feedId) => {
    try {
      // API 호출을 위한 설정 객체
      const configParams = {
        method: "PATCH",
        url: `/feed/${feedId}/feedBookMark`,
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
        const updatedShowroomData = [...showroomData];

        // feedId와 일치하는 요소 찾기
        const updatedItemIndex = updatedShowroomData.findIndex(
          (item) => item.feedId === feedId
        );

        if (updatedItemIndex !== -1) {
          // feedId가 일치하는 요소가 있다면 bookMarkYn 값을 업데이트
          if (response.data.data.bookMarkYn === true) {
            toast.success("북마크가 등록되었습니다!");
          } else {
            toast.success("북마크가 해제되었습니다!");
          }
          updatedShowroomData[updatedItemIndex].bookMarkYn =
            response.data.data.bookMarkYn;
          setShowroomData(updatedShowroomData); // 업데이트된 배열을 상태로 설정합니다.
          console.log(showroomData);
        }
      }
    } catch (error) {
      toast.error("북마크 처리에 실패하였습니다.");
      console.error("북마크 토글 실패:", error);
    }
  };

  // 게시글 클릭시 페이지 이동하는 핸들러 함수
  const handleFeedClick = (feedId) => {
    navigate(`/showroom/${feedId}`);
  };

  console.log(showroomData);
  return (
    <div className="flex-col mx-4">
      <div className="flex justify-between flex-wrap">
        {showroomData.map((item, idx) => (
          <div
            key={idx}
            className="flex-col mx-3 mb-3 w-full sm:w-[45%] lg:w-[30%] h-[20%]"
          >
            {console.log(item.bookMarkYn)}
            <div className="relative">
              <img
                // 이미지 들어오면 수정 **
                // src="./asset/image.png"
                src={item.coverPhoto}
                alt="shroomimg"
                className="aspectRatioImage_4_3 rounded-md cursor-pointer"
                onClick={() => handleFeedClick(item.feedId)}
              />
              <p>
                <img
                  // isBookmarked 변수명 수정요함 **
                  src={
                    item.bookMarkYn
                      ? "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/isBookmarked.png"
                      : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/bookmark.png"
                  }
                  alt="Bookmark"
                  className="absolute w-10 h-10 bottom-4 right-4 cursor-pointer"
                  onClick={() => toggleBookmark(item.feedId)}
                />
              </p>
            </div>
            <div className="flex-col pt-2 mb-14">
              <div
                className="flex justify-center my-3 cursor-pointer"
                onClick={() => handleFeedClick(item.feedId)}
              >
                <span className="text-3xl font-semibold">{item.title}</span>
              </div>
              <div className="flex justify-center items-center mb-3 text-gray-800">
                <img
                  // 멤버 이미지 수정 **
                  // src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/Wonho.png"
                  src={item.memberImage}
                  alt="프로필사진"
                  className="w-6 h-6 rounded-full mr-2"
                ></img>
                <span className="text-xl">{item.nickname}</span>
              </div>
              <div className="flex justify-center text-lg text-gray-500">
                <div className="mr-10">
                  {/* 스크랩 수정** */}
                  <span>스크랩 :</span>
                  <span className="ml-1">{item.bookMarkCount}</span>
                </div>
                <div>
                  <span>조회수 :</span>
                  <span className="ml-1">{item.views}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllContent;
