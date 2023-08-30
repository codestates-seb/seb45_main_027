import { useEffect, useState } from "react";
import MyInfoShowroom from "./MyInfoShowroom";
import MyInfoTips from "./MyInfoTips";

const MyInfoContentList = () => {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {}, [activeTab]);

  const handleTabs = (tabIdx) => {
    setActiveTab(tabIdx);
    console.log(activeTab);
  };

  const tabStyle = (tabIndex) =>
    `${
      activeTab === tabIndex
        ? "text-[#F5634A] border-[#F5634A]"
        : "text-neutral-600"
    } text-3xl font-semibold border-b-4 border-transparent cursor-pointer px-4 py-2 mb-[10%] mr-[6%] `;

  return (
    <div className="bg-white rounded-md w-[70%] shadow-md px-[4%] pt-[2%]">
      <ul className="flex">
        <li className={tabStyle(1)} onClick={() => handleTabs(1)}>
          게시글
        </li>
        <li className={tabStyle(2)} onClick={() => handleTabs(2)}>
          댓글
        </li>
        <li className={tabStyle(3)} onClick={() => handleTabs(3)}>
          북마크
        </li>
        <li className={tabStyle(4)} onClick={() => handleTabs(4)}>
          좋아요
        </li>
      </ul>
      <div>
        <MyInfoShowroom />
        <MyInfoTips />
      </div>
    </div>
  );
};

export default MyInfoContentList;
