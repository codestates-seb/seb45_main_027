import React, { useState, useEffect, useRef } from "react";
import PhotoTagging from "./PhotoTagging";
import ImageEditGuide from "./ImageEditGuide";
import axios from "axios";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaTrashAlt,
} from "react-icons/fa";
import { LuImageOff } from "react-icons/lu";
import { LuImage } from "react-icons/lu";

// 버튼효과
const buttonStyle =
  "ml-2 sm:mt-4 lg:mt-0 py-2 px-2 sm:px-4 border-[1px] mx-2 rounded-md hover:bg-gray-200 hover:bg-opacity-50";

const WriteFormShowroom = ({
  editorContent,
  setEditorContent,
  DEFAULT_EDITOR_TEXT,
}) => {
  const editorRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState({ x: "0%", y: "0%", text: "" });

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
      setImageSrc(null);
    }
  };

  const handleDeleteImageAndTags = () => {
    const updatedContent = editorContent.replace(
      /<br\s*\/?>\s*<div\s+class="flex justify-center">\s*<div\s+id="contentImage"\s+class="relative mx-5"[\s\S]*?<\/div>\s*<\/div>\s*<br\s*\/?>/g,
      ""
    );
    setEditorContent(updatedContent);
    setImageSrc(null);
    setTags([]);
  };

  const handlePost = () => {
    const tagsData = tags.map((tag) => ({
      x: tag.x,
      y: tag.y,
      text: tag.text,
    }));

    const combinedHTML = `<br/><div class="flex justify-center"><div id="contentImage" class="relative mx-5" style="display: inline-block; justify-content: center; align-items: center; position: relative; text-align: center;"><img src="${imageSrc}" class="" alt="Uploaded Image" contentEditable="false" />${tagsData
      .map(
        (tag) =>
          `<span class="bg-[#F5634A] p-2 rounded-xl text-white text-base" style="position: absolute; left: ${tag.x}; top: ${tag.y}; transform: translate(-50%, -50%);" contentEditable="false">${tag.text}</span>`
      )
      .join("")}</div></div><br/>`;

    setEditorContent(editorContent + combinedHTML);
    setImageSrc(null);
    setTags([]);
  };

  const toggleStyle = (style) => {
    // 에디터내 글자 스타일 설정
    document.execCommand(style, false, null);
  };

  return (
    <>
      <div className="flex border-b-[1px] pb-4 flex-wrap">
        {/* 등록 */}
        <label className="text-lg font-semibold text-white flex items-center bg-[#F5634A] bg-opacity-40 hover:bg-opacity-20 mx-1 sm:mx-4 px-2 sm:px-5 py-2 rounded-md shadow">
          <div>
            <LuImage size={"25px"} color={"#F5634A"} />
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <span className="hidden sm:block pl-4 text-lg font-semibold text-white">
            이미지 등록하기
          </span>
        </label>

        {/* 삭제 */}
        <button
          onClick={handleDeleteImageAndTags}
          className="flex items-center bg-[#F5634A] bg-opacity-40 hover:bg-opacity-20 mx-2 sm:mx-4 px-2 sm:px-5 py-2 rounded-md shadow"
        >
          <div>
            <LuImageOff size={"25px"} color={"#F5634A "} />
          </div>
          <span className="hidden sm:block pl-4 text-lg font-semibold text-white">
            이미지 삭제하기
          </span>
        </button>

        {/* 구분선 */}
        <div className="border-r-[1px] h-10 my-auto mx-3 "></div>

        <button
          onClick={() => {
            toggleStyle("bold");
          }}
          className={buttonStyle}
        >
          <FaBold />
        </button>
        <button onClick={() => toggleStyle("italic")} className={buttonStyle}>
          <FaItalic />
        </button>
        <button
          onClick={() => toggleStyle("underline")}
          className={buttonStyle}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => toggleStyle("strikethrough")}
          className={buttonStyle}
        >
          <FaStrikethrough />
        </button>
      </div>

      <div className="flex-col justify-center content-center">
        <div className="m-4 p-10 flex flex-col border shadow rounded-xl bg-[#F5634A] bg-opacity-10">
          <ImageEditGuide />
          {/* {imageSrc && <div>이미지 편집기</div>} */}

          <PhotoTagging
            imageSrc={imageSrc}
            tags={tags}
            setTags={setTags}
            currentTag={currentTag}
            setCurrentTag={setCurrentTag}
          />
          {imageSrc && (
            <div className="w-full flex justify-center mt-10">
              <button
                onClick={handlePost}
                className="flex items-center bg-[#F5634A] bg-opacity-40 hover:bg-opacity-20 mx-4 px-5 py-2 rounded-md shadow"
              >
                <span className="px-4 py-2 text-xl font-semibold text-white">
                  이미지 등록하기
                </span>
              </button>
            </div>
          )}
        </div>
        <div
          ref={editorRef}
          contentEditable={true}
          dangerouslySetInnerHTML={{ __html: editorContent }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="p-10 m-4 h-full min-h-[600px] text-md rounded-md shadow text-xl focus:outline-none"
        ></div>
      </div>
    </>
  );
};

export default WriteFormShowroom;
