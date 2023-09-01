import React, { useState } from "react";

const WriteTitle = () => {
  const [title, setTitle] = useState("");

  const TitleChange = (e) => {
    setTitle(e.target.value);
  };
    return (
        <div className="mb-4 border-b">
        <input
          id="title"
          type="text"
          value={title}
          onChange={TitleChange}
          placeholder="제목을 입력해주세요."
          className="my-4 p-2 w-full text-2xl "
        />
      </div>
    );
};

export default WriteTitle;