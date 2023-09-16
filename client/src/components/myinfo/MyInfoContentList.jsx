import { useState } from "react";
import MyInfoShowroom from "./MyInfoShowroom";

const MyInfoContentList = ({myinfoData, fetchMyinfoData}) => {
  
  const [activeTab, setActiveTab] = useState(1);


  const handleTabs = (tabIdx) => {
    setActiveTab(tabIdx);
  };

  const handleFollowAction = () => { fetchMyinfoData();};


  const tabStyle = (tabIndex) =>
    `${
      activeTab === tabIndex
        ? "text-[#F5634A] border-[#F5634A]/20"
        : "text-neutral-600"
    } text-xl font-bold border-b-4 border-transparent cursor-pointer px-4 py-2 mb-[3%] mr-[6%] md:text-xl`;

  if (!myinfoData) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex-col bg-white rounded-md w-full shadow-md mb-6 pl-[4%] pt-[2%] 2xl:w-[70%] md:min-h-[800px] md:my-[2%] 2xl:min-w-[800px]">
      <ul className="flex md:mb-[2%]">
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
            <div className="text-[#F5634A] text-3xl font-bold mb-[2%]">
              Showroom
            </div>
            <MyInfoShowroom
              label={'showroom'}
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
            <div className="text-[#F5634A] text-3xl font-bold mb-[2%]">
              Tips
            </div>
            <MyInfoShowroom
              label={'tips'}
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
