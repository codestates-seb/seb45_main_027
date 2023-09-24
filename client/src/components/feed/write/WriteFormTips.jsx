import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough } from "react-icons/fa";
import { LuImageOff } from "react-icons/lu";
import { LuImage } from "react-icons/lu";

// 버튼효과
const buttonStyle =
  "ml-2 lg:mt-0 py-2 px-2 sm:px-4 border-[1px] mx-2 rounded-md hover:bg-gray-200 hover:bg-opacity-50";

const WriteFormTips = ({
  editorContent,
  setEditorContent,
  DEFAULT_EDITOR_TEXT,
}) => {
  const [imageSrc, setImageSrc] = useState(null); // 에디터내 이미지 주소의 상태(s3)
  const editorRef = useRef(null);

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

  const ImageUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const formData = new FormData();

    formData.append("tipImage", file);
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    // S3 이미지 업로드 통신 로직은 API(헤더에 토큰정보전달하는 코드) 쓰면 안됨! - 데이터 형식 이슈
    try {
      toast.success("이미지업로드 중입니다.");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/imageUpload/tipImage`,
        formData
      );
      console.log("S3 업로드 성공");
      setImageSrc(response.data);
      // 에디터에 이미지 추가
      const currentEditorContent = editorRef.current.innerHTML;
      const newEditorContent =
        currentEditorContent +
        `<div class="flex justify-center"><img src="${response.data}" alt="Uploaded Image" /> </div>`;
      setEditorContent(newEditorContent);
      e.target.value = null;
      toast.dismiss();
    } catch (error) {
      console.error("이미지 업로드에 실패하였습니다.", error);
      window.alert("이미지 업로드에 실패하였습니다.");
      setImageSrc(null); // coverimage 값 초기화
    }
  };

  const toggleStyle = (style) => {
    // 에디터내 글자 스타일 설정
    document.execCommand(style, false, null);
  };

  // 이미지삭제 핸들러 함수
  const handleDeleteImage = () => {
    const images = editorRef.current.querySelectorAll("img");

    images.forEach((image) => {
      image.remove();
    });
  };

  return (
    <>
      {/* 이미지 입력 버튼 */}
      <div className="flex border-b-[1px] pb-4 flex-wrap sm:flex-nowrap">
        <label
          htmlFor="imageUpload"
          className="text-lg font-semibold text-white flex items-center bg-[#00647b1c] bg-opacity-40 hover:bg-opacity-20 mx-1 sm:mx-4 px-2 sm:px-5 py-2 rounded-md shadow"
        >
          <div>
            <LuImage size={"25px"} color="#00647B" />
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={ImageUpload}
            />
          </div>
          <span className="hidden lg:block pl-4 text-lg font-semibold text-[#808080]">
            이미지 등록하기
          </span>
        </label>
        <button
          className="flex items-center bg-[#00647b1c] bg-opacity-40 hover:bg-opacity-20 mx-2 sm:mx-4 px-2 sm:px-5 py-2 rounded-md shadow"
          onClick={handleDeleteImage}
        >
          <div>
            <LuImageOff size={"25px"} color={"#00647B"} />
          </div>
          <span className="hidden lg:block pl-4 text-lg font-semibold text-[#808080]">
            이미지 삭제하기
          </span>
        </button>
        {/* 구분선 */}
        <div className="border-r-[1px] h-7 my-auto mx-3" />

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

      <div
        ref={editorRef}
        className="w-full h-full min-h-[500px] p-2 border-b text-xl"
        contentEditable={true}
        onFocus={handleFocus}
        onBlur={handleBlur}
        dangerouslySetInnerHTML={{ __html: editorContent }}
      />
    </>
  );
};

export default WriteFormTips;
