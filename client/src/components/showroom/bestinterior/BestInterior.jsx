import React from "react";
import BestInteriorHeader from "./BestInteriorHeader";
import BestInteriorCarousel from "./BestInteriorCarousel";

const BestInterior = ({ viewportWidth, showroomData }) => {
  return (
    <div className="flex-col">
      <BestInteriorHeader />
      <BestInteriorCarousel
        viewportWidth={viewportWidth}
        showroomData={showroomData}
      />
    </div>
  );
};

export default BestInterior;
