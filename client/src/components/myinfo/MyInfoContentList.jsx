import { useEffect, useState } from "react";
import MyInfoShowroom from "./MyInfoShowroom";
import MyInfoTips from "./MyInfoTips";

import MyInfoDummy from "./MyInfoDummy";

const MyInfoContentList = () => {

  const myinfoData = MyInfoDummy;

  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {}, [activeTab]);

  const handleTabs = (tabIdx) => {
    setActiveTab(tabIdx);
  };

  const tabStyle = (tabIndex) =>
    `${
      activeTab === tabIndex
        ? "text-[#F5634A] border-[#F5634A]/50"
        : "text-neutral-600"
    } text-xl font-semibold border-b-4 border-transparent cursor-pointer px-4 py-2 mb-[3%] mr-[6%] md:text-2xl`;

    const postsByType = {
      1: "post",
      2: "bookmark",
      3: "like",
    };

    const selectedFilter = myinfoData[postsByType[activeTab]];

  return (
    <div className="flex-col bg-white rounded-md w-full shadow-md mb-6 pl-[4%] pr-[1.5%] pt-[2%] md:w-[75%] md:my-[2%]">
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
      <div className="flex flex-wrap">
      {selectedFilter && (
          <div>
            {selectedFilter.map((item) => (
              <div key={item.type}>
                {item.type === "showroom" && (
                  <MyInfoShowroom showroomData={item.posts} />
                )}
                {item.type === "tips" && (
                  <MyInfoTips tipsData={item.posts} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInfoContentList;
