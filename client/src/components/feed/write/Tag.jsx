import React, { useState } from "react";

const Tag = ({ x, y, text, handleTagDelete, photoHovered }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`flex justify-center items-center absolute bg-[#f5634a] p-4 ${
        hovered
          ? "rounded-[4px] w-auto h-[22px]"
          : "rounded-[50%] w-[2%] h-[2%]"
      } text-white font-[13px]`}
      style={{
        left: x,
        top: y,
        opacity: hovered ? 1 : 0.85,
        visibility: photoHovered ? "visible" : "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {photoHovered && (
        <>
          {hovered ? text : "+"}
          {hovered && (
            <button
              className="p-1 bg-transparent border-none text-white font-[12px] cursor-pointer ml-3"
              onClick={() => handleTagDelete(text)}
            >
              X
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Tag;
