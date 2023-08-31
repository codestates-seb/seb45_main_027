import React from "react";
import BestInteriorHeader from "./BestInteriorHeader";
import BestInteriorCarousel from "./BestInteriorCarousel";

const BestInterior = ({ viewportWidth, setViewportWidth }) => {
  return (
    <div className="flex-col">
      <BestInteriorHeader />
      <BestInteriorCarousel
        viewportWidth={viewportWidth}
        setViewportWidth={setViewportWidth}
      ></BestInteriorCarousel>
    </div>
  );
};

export default BestInterior;
