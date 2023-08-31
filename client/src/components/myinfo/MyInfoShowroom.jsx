import React from "react";
import MyInfoContent from "./MyInfoContent";

const MyInfoShowroom = ({showroomData}) => {
  return (
    <div className=" ">
      <div className="text-[#F5634A] text-4xl font-bold mb-[2%]">Show Room</div>
      <div className="flex flex-wrap justify-center items-start">
      {showroomData.map((item) => (
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

export default MyInfoShowroom;
