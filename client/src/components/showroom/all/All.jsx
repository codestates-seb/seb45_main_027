import React from "react";
import AllHeader from "./AllHeader";
import AllContent from "./AllContent";

const All = ({ viewportWidth, setViewportWidth }) => {
  return (
    <div className="flex-col mt-20">
      <AllHeader
        viewportWidth={viewportWidth}
        setViewportWidth={setViewportWidth}
      />
      <AllContent
        viewportWidth={viewportWidth}
        setViewportWidth={setViewportWidth}
      />
    </div>
  );
};

export default All;
