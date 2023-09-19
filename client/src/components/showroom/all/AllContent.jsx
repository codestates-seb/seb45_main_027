import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../common/tokens";
import { toast } from "react-hot-toast";

const AllContent = ({ showroomData, setShowroomData }) => {
  const [bookmarkCount, setBookmarkCount] = useState({});

  console.log(showroomData);

  const navigate = useNavigate();
  const defalutImage =
    "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userImg.png";

  // useEffect(() => {
  //   // showroomData가 변경될 때마다 bookmarkCount 상태를 업데이트
  //   const newBookmarkCount = {};
  //   showroomData.forEach((item) => {
  //     newBookmarkCount[item.feedId] = item.bookMarkCount;
  //   });
  //   setBookmarkCount(newBookmarkCount);
  // }, [showroomData]);

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
            updatedShowroomData[updatedItemIndex].bookMarkYn = true;
            // bookmarkCount 상태를 업데이트
            updatedShowroomData[updatedItemIndex].bookMarkCount += 1;
          } else {
            toast.success("북마크가 해제되었습니다!");
            updatedShowroomData[updatedItemIndex].bookMarkYn = false;
            updatedShowroomData[updatedItemIndex].bookMarkCount -= 1;
          }
          setShowroomData(updatedShowroomData); // 업데이트된 배열을 상태로 설정합니다.
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

  return (
    <div className="flex-col mx-4">
      <div className="flex justify-between flex-wrap">
        {showroomData.map((item, idx) => (
          <div
            key={idx}
            className="flex-col mx-3 mt-3 mb-3 w-full sm:w-[45%] lg:w-[30%] h-[20%]"
          >
            <div className="relative">
              <img
                src={item.coverPhoto}
                alt="shroomimg"
                className="aspectRatioImage_4_3 rounded-md cursor-pointer"
                onClick={() => handleFeedClick(item.feedId)}
              />
              <p>
                <img
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
                  src={
                    item.memberImage == null ? defalutImage : item.memberImage
                  }
                  alt="프로필사진"
                  className="w-6 h-6 rounded-full mr-2"
                ></img>
                <span className="text-xl">{item.nickname} </span>
              </div>
              <div className="flex justify-center text-lg text-gray-500">
                <div className="mr-10">
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
