import React from "react";

const Background = ({ background, height, children }) => {
  return (
    <main className="flex justify-center w-full">
      <div className={`flex w-full max-w-[1440px] ${background} ${height}`}>
        {children}
      </div>
    </main>
  );
};

export default Background;
