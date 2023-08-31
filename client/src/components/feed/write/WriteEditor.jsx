import React, { useState, useRef } from "react";
import WriteTag from "./WriteTag";

const WriteEditor = () => {
  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState("내용을 입력해주세요");
  const [isFocused, setIsFocused] = useState(false);
  const editorRef = useRef(null);
  
  const handleFocus = () => {
    if (!isFocused) {
      setEditor("");
    }
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (editor === "") {
      setEditor("내용을 입력해주세요");
    }
    setIsFocused(false);
  };

  const handleChange = (e) => {
    setEditor(e.target.innerHTML);
  };

  // 타이틀 변경
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 이미지 업로드
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const imageUrl = reader.result;
        const imgTag = document.createElement("img");
        imgTag.src = imageUrl;
        imgTag.alt = "Uploaded Image";

        const brTag = document.createElement("br"); // 새 줄을 위한 <br> 태그 생성

        if (editorRef.current) {
          editorRef.current.appendChild(imgTag);
          editorRef.current.appendChild(brTag); // <img> 태그 다음에 <br> 태그 추가
          editorRef.current.focus(); // 이미지와 <br> 태그 삽입 후, 다시 div에 포커스 주기
        }

        e.target.value = null; // input의 value를 초기화해서 중복 업로드를 가능하게 함
      };
    }
  };

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
      <div className="mb-2 pb-2 border-b">
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
      <div
        ref={editorRef}
        contentEditable={true}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleChange}
        dangerouslySetInnerHTML={{ __html: editor }}
        className="w-full h-full min-h-[500px] p-2 border-b "
      />
      <WriteTag />
    </div>
  );
};

export default WriteEditor;
