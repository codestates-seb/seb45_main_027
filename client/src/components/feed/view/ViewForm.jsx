import React from "react";

const ViewForm = ({ feedData }) => {
  return (
    <div className="w-full h-full p-10 border mt-20">
      <div
        className="text-xl"
        dangerouslySetInnerHTML={{ __html: feedData.content }}
      />
    </div>
  );
};

export default ViewForm;
