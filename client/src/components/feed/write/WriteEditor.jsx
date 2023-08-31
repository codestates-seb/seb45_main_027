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
    <div className="mt-10 mb-20 p-4 bg-white w-full h-full">
      {/* 타이틀 입력창 */}
      <div className="mb-4 border-b">
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="제목을 입력해주세요."
          className="my-4 p-2 w-full focus:border-none focus:ring-0 text-2xl"
        />
      </div>

      {/* 이미지추가 버튼 */}
      <div className="mb-2 w-full">
        <label htmlFor="imageUpload" className="cursor-pointer">
          <img className="p-2" src="/images/gallery.png" alt="" />
        </label>

        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* 입력창 */}
      <textarea
        value={editor}
        onChange={handleTextChange}
        rows="30"
        placeholder="내용을 입력해주세요."
        className="w-full p-2 border-b"
      />

      {/* 태그 */}
      <div className="mt-4">
        <div className="flex flex-wrap items-center ">
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
