import React from "react";

const TipsInfo = () => {
  return (
    <div className="flex-col pt-2 mb-8">
      <div className="flex justify-center mb-3">
        <span className="text-3xl font-bold">Title.</span>
      </div>

      <div className="flex justify-between text-xl">
        <div className="flex">
          <div className="flex mr-4">
            <img
              src="./images/Tips_like.png"
              alt="Tips_like"
              className="w-[25px]"
            />
            <span className="pl-1">00</span>
          </div>
          <div className="flex mr-4">
            <img
              src="./images/Tips_comment.png"
              alt="Tips_comment"
              className="w-[25px]"
            />
            <span className="pl-1">11</span>
          </div>
          <div className="flex mr-4">
            <img
              src="./images/Tips_view.png"
              alt="Tips_view"
              className="w-[25px]"
            />
            <span className="pl-1">22</span>
          </div>
        </div>
        <span>Username</span>
      </div>
    </div>
  );
};

export default TipsInfo;
