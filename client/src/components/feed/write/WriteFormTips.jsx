import React, { useRef, useEffect, useState } from "react";

const DEFAULT_EDITOR_TEXT = "내용을 입력해주세요";

const WriteFormTips = () => {
  const [editor, setEditor] = useState(DEFAULT_EDITOR_TEXT);
  const editorRef = useRef(null);
  console.log(editor);

  useEffect(() => {
    if (editor === DEFAULT_EDITOR_TEXT) {
      editorRef.current.innerHTML = editor;
    }
  }, [editor]);

  const handleFocus = () => {
    if (editor === DEFAULT_EDITOR_TEXT) {
      setEditor("");
    }
  };

  const handleBlur = () => {
    const inputText = editorRef.current.innerHTML.trim();
    setEditor(inputText || DEFAULT_EDITOR_TEXT);
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
        setEditor(newEditorContent);
        e.target.value = null;
      };
    }
  };

  return (
    <>
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

      <div
        ref={editorRef}
        className="w-full h-full min-h-[500px] p-2 border-b"
        contentEditable={true}
        onFocus={handleFocus}
        onBlur={handleBlur}
        dangerouslySetInnerHTML={{ __html: editor }}
      />
    </>
  );
};

export default WriteFormTips;
