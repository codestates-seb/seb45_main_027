import React from "react";

const Background = ({ mainclassName, divclassName, style, children }) => {
  return (
    <main className={`flex justify-center w-full ${mainclassName}`}>
      <div className={`flex w-full max-w-[1440px] ${divclassName}`}>
        {children}
      </div>
    </main>
  );
};

export default Background;
