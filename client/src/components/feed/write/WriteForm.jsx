import React, { useRef, useEffect, useState } from "react";

const DEFAULT_EDITOR_TEXT = "내용을 입력해주세요";

const WriteEditorInput = ({ editor, setEditor }) => {
   
  const editorRef = useRef(null);

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
    if (inputText === "") {
      setEditor(DEFAULT_EDITOR_TEXT);
    }
  };

    return (
      <>
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


export default WriteEditorInput;
