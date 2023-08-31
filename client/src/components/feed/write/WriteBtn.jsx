import React from 'react';

const btn = "rounded-3xl px-9 py-1 mx-2 shadow ";

const WriteBtn = ({buttonBgColor,buttonBorderColor,buttonTextColor,Title}) => {
    return (
      <div className="flex w-full justify-between pt-24 text-2xl">
        <div className="flex">
          <div className={`${buttonBgColor} text-white ${btn}`}>주제</div>
          <div
            className={`${buttonBorderColor} ${buttonTextColor} border bg-white ${btn}`}>
            {Title}
          </div>
        </div>
        <div className="flex font-semibold">
          <button
            className={`${buttonBorderColor} ${buttonTextColor} border bg-white ${btn}`}>
            임시저장
          </button>
          <button className={`${buttonBgColor} text-white ${btn}`}>
            작성하기
          </button>
        </div>
      </div>
    );
};

export default WriteBtn;