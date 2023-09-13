import React from "react";

const TitleText = "flex items-center justify-center text-4xl font-bold";

const ViewTitle = ({ feedData }) => {
  console.log(feedData);
  return (
    <div className="max-h-full">
      {feedData.title ? (
        <span className={TitleText}>{feedData.title}</span>
      ) : null}
    </div>
  );
};

export default ViewTitle;