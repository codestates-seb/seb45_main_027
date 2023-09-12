import React, { useRef, useEffect, useState } from "react";

const WriteFormTips = ({
  editorContent,
  setEditorContent,
  DEFAULT_EDITOR_TEXT,
}) => {
  const editorRef = useRef(null);
  console.log(editorContent);

  useEffect(() => {
    if (editorContent === DEFAULT_EDITOR_TEXT) {
      editorRef.current.innerHTML = editorContent;
    }
  }, [editorContent]);

  const handleFocus = () => {
    if (editorContent === DEFAULT_EDITOR_TEXT) {
      setEditorContent("");
    }
  };

  const handleBlur = () => {
    const inputText = editorRef.current.innerHTML.trim();
    setEditorContent(inputText || DEFAULT_EDITOR_TEXT);
  };

  const ImageUpload = (e) => {
    const { files } = e.target;

    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        const imageUrl = reader.result;
        const currentEditorContent = editorRef.current.innerHTML;
        const newEditorContent = `${currentEditorContent}<img src="${imageUrl}" alt="Uploaded Image"><br>`;
        setEditorContent(newEditorContent);
        e.target.value = null;
      };
    }
  };

  return (
    <>
      {/* 이미지 입력 버튼 */}
      <div className="mb-2 pb-2 border-b">
        <label htmlFor="imageUpload" className="cursor-pointer">
          <img
            className="p-2  mb-1"
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/gallery.png"
            alt=""
          />
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={ImageUpload}
        />
      </div>

      <div
        ref={editorRef}
        className="w-full h-full min-h-[500px] p-2 border-b"
        contentEditable={true}
        onFocus={handleFocus}
        onBlur={handleBlur}
        dangerouslySetInnerHTML={{ __html: editorContent }}
      />
    </>
  );
};

export default WriteFormTips;
