import React, { useState, useEffect, useRef } from "react";
import PhotoTagging from "./PhotoTagging";
import ImageEditGuide from "./ImageEditGuide";
import axios from "axios";

const WriteFormShowroom = ({
  editorContent,
  setEditorContent,
  DEFAULT_EDITOR_TEXT,
}) => {
  const editorRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [tags, setTags] = useState([]); // 이미지 내 tags 들의 집합
  const [currentTag, setCurrentTag] = useState({ x: "0%", y: "0%", text: "" }); // 현재 추가하려는 tag

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const formData = new FormData();

    formData.append("feedImage", file);
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    // S3 이미지 업로드 통신 로직은 API(헤더에 토큰정보전달하는 코드) 쓰면 안됨! - 데이터 형식 이슈
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/imageUpload/feedImage`,
        formData
      );

      console.log("S3 업로드 성공");
      setImageSrc(response.data);
    } catch (error) {
      console.error("이미지 업로드에 실패하였습니다.", error);
      window.alert("이미지 업로드에 실패하였습니다.");
      setImageSrc(null); // coverimage 값 초기화
    }
  };

  // 이미지 및 태그 삭제
  const handleDeleteImageAndTags = () => {
    // 상위 <div id="contentImage"> 요소를 삭제
    const updatedContent = editorContent.replace(
      /<br\/><div id="contentImage" class="relative mx-5"[\s\S]*?<\/div><br\/>/,
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
    const combinedHTML = `<br/><div id="contentImage" class="relative mx-5" style="display: inline-block; justify-content: center; align-items: center; position: relative; text-align: center;"><img src="${imageSrc}" class="" alt="Uploaded Image" contentEditable="false" />${tagsData
      .map(
        (tag) =>
          `<span class="bg-[#F5634A] p-2 rounded-xl text-white text-base" style="position: absolute; left: ${tag.x}; top: ${tag.y}; transform: translate(-50%, -50%);" contentEditable="false">${tag.text}</span>`
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
          <div className="m-5 p-3 flex flex-col border-[3px] rounded-md">
            <ImageEditGuide />
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
          className="p-2 mt-6 h-full  min-h-[600px] text-md"
        ></div>
      </div>
    </>
  );
};

export default WriteFormShowroom;
