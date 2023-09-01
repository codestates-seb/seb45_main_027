import React from "react";
import AllHeader from "./AllHeader";
import Allcontent from "./Allcontent";

const All = ({ viewportWidth, setViewportWidth }) => {
  return (
    <div className="flex-col mt-10">
      <AllHeader
        viewportWidth={viewportWidth}
        setViewportWidth={setViewportWidth}
      />
      <Allcontent
        viewportWidth={viewportWidth}
        setViewportWidth={setViewportWidth}
      />
    </div>
  );
};

export default All;
