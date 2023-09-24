import { useState } from "react";
import MyInfoShowroom from "./MyInfoShowroom";

const MyInfoContentList = ({ myinfoData, fetchMyinfoData }) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabs = (tabIdx) => {
    setActiveTab(tabIdx);
  };

  const handleFollowAction = () => {
    fetchMyinfoData();
  };

  const tabStyle = (tabIndex) =>
    `${
      activeTab === tabIndex
        ? "text-[#F5634A] border-[#F5634A]/60"
        : "text-neutral-600"
    } font-bold border-b-4 border-transparent cursor-pointer px-3 py-2 mb-[4%] mr-[6%] text-md md:text-xl`;

  if (!myinfoData) {
    return <div>loading...</div>;
  }

  return (
    <div
      className="
      flex-col bg-white rounded-md shadow-md 
      mb-6 md:ml-[2%] md:my-[2%] px-[4%] py-[2%]
      md:h-[630px] lg:h-[690px] xl:h-[750px]
      w-full sm:w-[500px] md:w-[580px] lg:w-[700px] xl:w-[850px]"
    >
      <ul className="flex ">
        <li className={tabStyle(1)} onClick={() => handleTabs(1)}>
          게시글
        </li>
        <li className={tabStyle(2)} onClick={() => handleTabs(2)}>
          북마크
        </li>
        <li className={tabStyle(3)} onClick={() => handleTabs(3)}>
          좋아요
        </li>
      </ul>
      <div className="flex flex-col flex-wrap ">
        {myinfoData && myinfoData.showRoom && (
          <>
            <div className="text-[#F5634A] text-xl md:text-3xl font-semibold my-[2%] Showcard-Gothic ">
              Showroom
            </div>
            <MyInfoShowroom
              label={"showroom"}
              postData={myinfoData.showRoom.post}
              bookmarkData={myinfoData.showRoom.bookMark}
              likeData={myinfoData.showRoom.like}
              activeTab={activeTab}
              handleFollowAction={handleFollowAction}
            />
          </>
        )}
        {myinfoData && myinfoData.tipContent && (
          <>
            <div className="text-[#F5634A] text-xl md:text-3xl font-semibold my-[2%] Showcard-Gothic">
              Tips
            </div>
            <MyInfoShowroom
              label={"tips"}
              postData={myinfoData.tipContent.post}
              bookmarkData={myinfoData.tipContent.bookMark}
              likeData={myinfoData.tipContent.like}
              activeTab={activeTab}
              handleFollowAction={handleFollowAction}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MyInfoContentList;
