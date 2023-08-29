import React from "react";

const Background = ({ mainclassName, divclassName, children }) => {
  return (
    <main className={`flex justify-center w-full px-8 ${mainclassName}`}>
      <div className={`flex w-full max-w-[1440px] ${divclassName}`}>
        {children}
      </div>
    </main>
  );
};

export default Background;
