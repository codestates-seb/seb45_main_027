import React from "react";
import MyInfoContent from "./MyInfoContent";

const MyInfoTips = ({ tipsData }) => {
  return (
    <div>
      <div className="text-[#F5634A] text-4xl font-bold mb-[2%]">Tips</div>
      <div className="flex flex-wrap justify-center">
        {tipsData.map((item) => (
          <MyInfoContent
            key={item.id}
            imgSrc={item.imgSrc}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default MyInfoTips;
