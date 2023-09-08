import React from "react";

const TipsInfo = () => {
  return (
    <div className="flex-col pt-2 mb-14">
      <div className="flex justify-center">
        <span className="text-3xl font-bold my-3">Title.</span>
      </div>

      <div className="flex justify-between text-xl">
        <div className="flex">
          <div className="flex items-center mr-4">
            <img
              src="./images/Tips_like.png"
              alt="Tips_like"
              className="w-10 h-10 rounded-full mr-1"
            />
            <span className="ml-1 font-medium">0</span>
          </div>
          <div className="flex items-center mr-4">
            <img
              src="./images/Tips_comment.png"
              alt="Tips_comment"
              className="w-10 h-10 rounded-full mr-1"
            />
            <span className="ml-1 font-medium">0</span>
          </div>
          <div className="flex items-center mr-4">
            <img
              src="./images/Tips_view.png"
              alt="Tips_view"
              className="w-10 h-10 rounded-full mr-1"
            />
            <span className="ml-1 font-medium">0</span>
          </div>
        </div>
        <span className="flex items-center font-medium text-gray-800">
          Username
        </span>
      </div>
    </div>
  );
};

export default TipsInfo;
