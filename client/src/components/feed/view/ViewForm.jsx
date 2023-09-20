import React from "react";

const ViewForm = ({ feedData }) => {
  return (
    <div className="w-full h-full p-20 rounded-lg mt-10 bg-white bg-opacity-40 mb-10 shadow">
      <div
        className="text-xl"
        dangerouslySetInnerHTML={{ __html: feedData.content }}
      />
    </div>
  );
};

export default ViewForm;
