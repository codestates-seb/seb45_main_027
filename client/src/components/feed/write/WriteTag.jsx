import React, { useState, useCallback } from "react";

const WriteTag = () => {
  const [tags, setTags] = useState([]);

  // 태그추가
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = `#${e.target.value.trim()}`;
      if (newTag !== "" && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        e.target.value = "";
      }
    }
  };
  // 태그삭제
  const handleTagClick = useCallback(
    (index) => {
      const newTags = [...tags];
      newTags.splice(index, 1);
      setTags(newTags);
    },
    [tags]
  );

  return (
    <div>
      <div className="mt-4">
        <div className="flex flex-wrap items-center ">
          {tags.map((tag) => (
            <span
              key={tag}
              className="m-1 p-1 border rounded-md cursor-pointer"
              onClick={() => handleTagClick(tag)}>
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
