import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough } from "react-icons/fa";

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
      <div className="flex mb-2 pb-[11px] border-b">
        <label htmlFor="imageUpload" className="cursor-pointer">
          <img
            className="p-[3px]  mb-1"
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
        <button
          className="p-2 border-[1px] mx-2 rounded-md"
          onClick={handleDeleteImage}
        >
          이미지 삭제
        </button>
        <div className="border-r-[1px] h-7 my-auto mx-3"></div> {/* 구분선 */}
        <button
          onClick={() => {
            toggleStyle("bold");
          }}
          className={`p-2 border-[1px] mx-2 rounded-md`}
        >
          <FaBold />
        </button>
        <button
          onClick={() => toggleStyle("italic")}
          className={`p-2 border-[1px] mx-2 rounded-md`}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => toggleStyle("underline")}
          className={`p-2 border-[1px] mx-2 rounded-md`}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => toggleStyle("strikethrough")}
          className={`p-2 border-[1px] mx-2 rounded-md`}
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
