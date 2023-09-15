import React, { useState, useEffect, useRef } from "react";
import PhotoTagging from "./PhotoTagging";

const WriteFormShowroom = ({
  editorContent,
  setEditorContent,
  DEFAULT_EDITOR_TEXT,
}) => {
  const editorRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [tags, setTags] = useState([]); // 이미지 내 tags 들의 집합
  const [currentTag, setCurrentTag] = useState({ x: "0%", y: "0%", text: "" }); // 현재 추가하려는 tag
  // const [editorContent, setEditorContent] = useState(""); // Editor 내용을 관리

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 및 태그 삭제
  const handleDeleteImageAndTags = () => {
    // 상위 <div class="relative"> 요소를 삭제합니다.
    const updatedContent = editorContent.replace(
      /<div class="relative">[\s\S]*?<\/div>/,
      ""
    );
    setEditorContent(updatedContent);
  };

  const handlePost = () => {
    const tagsData = tags.map((tag) => ({
      x: tag.x,
      y: tag.y,
      text: tag.text,
    }));

    // post요청시 이미지 태그 생성, 이미지 태그 내 태그 삽입
    const combinedHTML = `<br/><div class="relative"><img src="${imageSrc}" alt="Uploaded Image" contentEditable="false" />${tagsData
      .map(
        (tag) =>
          `<span class="bg-[#F5634A] p-2 rounded-xl text-white" style="position: absolute; left: ${tag.x}; top: ${tag.y}" contentEditable="false">${tag.text}</span>`
      )
      .join("")}</div><br/>`;

    // 에디터 내용에 이미지삽입
    setEditorContent(editorContent + combinedHTML);

    // 이미지 및 태그정보 초기화
    setImageSrc(null);
    setTags([]);
  };

  return (
    <>
      <div className="flex border-b-[1px] pb-4">
        <label htmlFor="imageUpload" className="cursor-pointer rounded-md">
          <img
            className="p-2"
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/gallery.png"
            alt="gallery"
          />
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <button
          onClick={handlePost}
          className="p-2 border-[1px] mx-2 rounded-md"
        >
          이미지 등록
        </button>
        <button
          onClick={handleDeleteImageAndTags}
          className="p-2 border-[1px] mx-2 rounded-md"
        >
          이미지 삭제
        </button>
      </div>

      <div className="flex-col justify-center content-center">
        {imageSrc ? (
          <div className="m-5">
            <PhotoTagging
              imageSrc={imageSrc}
              tags={tags}
              setTags={setTags}
              currentTag={currentTag}
              setCurrentTag={setCurrentTag}
            />
          </div>
        ) : null}
        <div
          ref={editorRef}
          contentEditable={true}
          dangerouslySetInnerHTML={{ __html: editorContent }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="p-2 mt-6 h-full w-full min-h-[600px] text-xl"
        ></div>
      </div>
    </>
  );
};

export default WriteFormShowroom;
