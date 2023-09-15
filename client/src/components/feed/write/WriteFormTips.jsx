import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
      console.log(response.data);
      console.log("S3 업로드 성공");
      setImageSrc(response.data);
      // 에디터에 이미지 추가
      const currentEditorContent = editorRef.current.innerHTML;
      const newEditorContent =
        currentEditorContent +
        `<img src="${response.data}" alt="Uploaded Image" />`;
      setEditorContent(newEditorContent);
      e.target.value = null;
      toast.dismiss();
    } catch (error) {
      console.error("이미지 업로드에 실패하였습니다.", error);
      window.alert("이미지 업로드에 실패하였습니다.");
      setImageSrc(null); // coverimage 값 초기화
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
