import React from "react";

const ViewForm = ({ feedData }) => {
  return (
    <div className="w-full h-full py-10 border mt-20">
      <span className=" text-5xl">{feedData.content}</span>
    </div>
  );
};

export default ViewForm;
