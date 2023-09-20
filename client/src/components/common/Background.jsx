import React from "react";

const Background = ({ mainclassName, divclassName, style, children }) => {
  return (
    <main
      className={`flex justify-center w-full min-h-screen pt-0 md:pt-24 bg-gradient-to-b from-[#FFFAEE] via-[#fff1d1] to-[#FFFAEE] ${mainclassName}`}
      style={style}>
      <div className={`flex h-full w-full max-w-[1440px] ${divclassName}`}>
        {children}
      </div>
    </main>
  );
};

export default Background;
