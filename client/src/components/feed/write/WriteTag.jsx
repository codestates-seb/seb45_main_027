import React, { useState } from "react";

const WriteTag = () => {
  const [tags, setTags] = useState([]);

  // 태그 추가
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value.trim() !== "") {
        setTags([...tags, `#${e.target.value.trim()}`]);
        e.target.value = "";
      }
    }
  };

  // 태그 삭제
  const handleTagClick = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <div>
      {/* 태그 */}
      <div className="mt-4">
        <div className="flex flex-wrap items-center ">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="m-1 p-1 border rounded-md cursor-pointer"
              onClick={() => handleTagClick(index)}
            >
              {tag}
            </span>
          ))}
          <input
            id="tags"
            type="text"
            onKeyDown={handleTagKeyDown}
            placeholder="#태그"
            className="mt-1 p-1 border rounded-md text-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default WriteTag;
