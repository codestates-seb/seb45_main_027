import React from "react";

const ViewForm = ({ feedData }) => {
  console.log(feedData.content);
  return (
    <div className="w-full h-full py-10 border mt-20">
      <div
        className="text-5xl"
        dangerouslySetInnerHTML={{ __html: feedData.content }}
      />
    </div>
  );
};

export default ViewForm;
