import React from "react";
import { Link } from "react-router-dom";

const BestInteriorHeader = () => {
  return (
    <div className="flex pt-10 justify-between">
      <div className="flex items-center">
        <h1 className="pt-1 text-4xl text-[#F5634A] font-semibold">
          Best Interior
        </h1>
        <h2 className="pl-4 pt-7 text-xl">삐삐에서 핫한 Best 10</h2>
      </div>

      <Link to="/showroom/write">
        <button className="bg-[#00647B] mt-4 px-4 pb-2 pt-1 text-2xl text-white rounded-2xl font-semibold">
          Post
        </button>
      </Link>
    </div>
  );
};

export default BestInteriorHeader;
