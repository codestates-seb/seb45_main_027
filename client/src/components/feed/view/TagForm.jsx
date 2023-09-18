import React, { useState, useEffect } from "react";

const TagForm = ({ feedData }) => {
  const [tags, setTags] = useState([]);

  // 컴포넌트가 마운트되면 서버에서 태그를 받아옵니다.
  useEffect(() => {
    if (feedData && feedData.tags) {
      setTags(feedData.tags);
    }
  }, [feedData]);

  return (
    <div className="w-full mt-2">
      {tags.map((tag) => (
        <span
          key={tag.tagId} // 고유한 값으로 key 설정
          className="hover:text-blue-500 text-[#35c5f0] font-semibold text-xl mx-2"
        >
          {tag.tagContent}
        </span>
      ))}
    </div>
  );
};

export default TagForm;
