import React, { useState, useEffect } from "react";
import api from "../../common/tokens";
import { useNavigate } from "react-router-dom";

const TagForm = ({ feedData }) => {
  const [tags, setTags] = useState([]);
  const Navigate = useNavigate();

  // 컴포넌트가 마운트되면 서버에서 태그를 받아옵니다.
  useEffect(() => {
    if (feedData && feedData.tags) {
      setTags(feedData.tags);
    }
  }, [feedData]);

  const handleTagSearch = (keyworld) => {
    // tag 검색을 위한 변수 state로 보냄
    const method = "GET";
    const url = `/tip/searchTag/${keyworld}?page=1`;
    const headers = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    };
    const state = { method, url, headers };
    Navigate("/tips", { state });
  };

  return (
    <div className="w-full mt-2">
      {tags.map((tag) => (
        <span
          key={tag.tagId} // 고유한 값으로 key 설정
          className="hover:text-blue-500 text-[#35c5f0] font-semibold text-xl mx-2 cursor-pointer"
          onClick={() => {
            handleTagSearch(tag.tagContent);
          }}
        >
          #{tag.tagContent}
        </span>
      ))}
    </div>
  );
};

export default TagForm;
