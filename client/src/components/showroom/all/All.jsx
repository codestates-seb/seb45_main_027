import React from "react";
import AllHeader from "./AllHeader";
import AllContent from "./AllContent";

const All = ({
  viewportWidth,
  setViewportWidth,
  showroomData,
  setShowroomData,
  handleFilterClick,
  inputValue,
  handleInputChange,
  handleSearch,
}) => {
  return (
    <div className="flex-col mt-20">
      <AllHeader
        viewportWidth={viewportWidth}
        setViewportWidth={setViewportWidth}
        showroomData={showroomData}
        setShowroomData={setShowroomData}
        handleFilterClick={handleFilterClick}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
      />
      <AllContent
        viewportWidth={viewportWidth}
        setViewportWidth={setViewportWidth}
        showroomData={showroomData}
      />
    </div>
  );
};

export default All;
