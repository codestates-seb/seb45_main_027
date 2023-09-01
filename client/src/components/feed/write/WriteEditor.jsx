import React, { useState } from "react";
import WriteForm from "./WriteForm";
import WriteTag from "./WriteTag";

const DEFAULT_EDITOR_TEXT = "내용을 입력해주세요";

const WriteEditor = () => {
  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState(DEFAULT_EDITOR_TEXT);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const ImageUpload = (e) => {
    const { files } = e.target;

    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        const imageUrl = reader.result;
        const newEditorContent = `${editor}<img src="${imageUrl}" alt="Uploaded Image"><br>`;
        setEditor(newEditorContent);
        e.target.value = null;
      };
    }
  };

  return (
    <div className="mt-10 mb-20 p-4 bg-white w-full h-full focus:border-white">
      
      {/* 타이틀 입력창 */}
      <div className="mb-4 border-b">
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="제목을 입력해주세요."
          className="my-4 p-2 w-full text-2xl "
        />
      </div>

      {/* 이미지 입력 버튼 */}
      <div className="mb-2 pb-2 border-b">
        <label htmlFor="imageUpload" className="cursor-pointer">
          <img className="p-2" src="/images/gallery.png" alt="" />
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={ImageUpload}
        />
      </div>

      {/* 글 작성창 */}
      <WriteForm
        editor={editor}
        setEditor={setEditor}
      />

      {/* 태그 작성창 */}
      <WriteTag />
    </div>
  );
};

export default WriteEditor;
