import React, { useState, useEffect, useRef } from "react";

const WriteEditor = () => {
  const [editor, setEditor] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const tagInputRef = useRef(null);

  // 타이틀 변경
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 텍스트 에어리어 변경
  const handleTextChange = (e) => {
    setEditor(e.target.value);
  };

  // 이미지 업로드
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setEditor(`${editor}\n![Uploaded Image](${imageUrl})`);
      };
    }
  };

  // 태그 추가
  const handleTagKeyDown  = (e) => {
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

  // 태그 인풋에 포커스
  useEffect(() => {
    tagInputRef.current.focus();
  }, [tags]);

  return (
    <div className="mt-10 mb-20 p-4 bg-white w-full h-[500px]">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-600">
          타이틀
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-2 w-full">
        <label htmlFor="imageUpload" className="cursor-pointer">
          이미지 업로드
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
      <textarea
        value={editor}
        onChange={handleTextChange}
        rows="10"
        className="w-full p-2 border rounded"></textarea>
      <div className="mt-4">
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-600">
          태그
        </label>
        <div className="flex flex-wrap items-center">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="m-1 p-1 border rounded-md cursor-pointer"
              onClick={() => handleTagClick(index)}>
              {tag}
            </span>
          ))}
          <input
            id="tags"
            type="text"
            ref={tagInputRef}
            onKeyDown={handleTagKeyDown}
            placeholder="#태그"
            className="mt-1 p-1 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default WriteEditor;
