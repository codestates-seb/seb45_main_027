import React, { useState } from "react";

const WriteTitle = ({ title, setTitle }) => {
  const TitleChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <div className="mx-4 mb-4 border-b">
      <input
        id="title"
        type="text"
        value={title}
        onChange={TitleChange}
        placeholder="제목을 입력해주세요."
        className="px-5 my-2 py-2.5 w-full text-xl sm:text-3xl font-semibold text-gray-800 "
      />
    </div>
  );
};

export default WriteTitle;
