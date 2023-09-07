import React, { useState, useEffect } from "react";
import HeaderMobile from "../components/header/HeaderMobile";
import Background from "../components/common/Background";
import WriteBtn from "../components/feed/write/WriteBtn";
import WriteAccordion from "../components/feed/write/WriteGuide";
import WriteCoverImg from "../components/feed/write/WriteCoverImg";
import WriteTitle from "../components/feed/write/WriteTitle";
import WriteFormTips from "../components/feed/write/WriteFormTips";
import WriteTag from "../components/feed/write/WriteTag";

const DEFAULT_EDITOR_TEXT = "내용을 입력해주세요";

const WriteTips = () => {
  const [coverImage, setCoverImage] = useState(null); // 커버사진 상태
  const [title, setTitle] = useState(""); // title(제목) 상태
  const [editorContent, setEditorContent] = useState(DEFAULT_EDITOR_TEXT); // Editor 내용을 관리
  const [tags, setTags] = useState([]); // 팁에있는 해시태그 상태!

  // 로컬스토리지에 임시저장값이 있으면 해당값 불러오기 위한 useEffect
  useEffect(() => {
    const savedData = localStorage.getItem("tempSaveTipData");

    if (savedData) {
      const tempSaveData = JSON.parse(savedData);
      const createdAtString = tempSaveData.createdAt;
      const createdAtDate = new Date(createdAtString);
      const formattedDate = createdAtDate.toLocaleString();

      const userConfirmed = window.confirm(
        `(${formattedDate}) 

작성중인 글을 불러오시겠습니까? 

취소를 누를 경우 작성중인 글은 삭제됩니다.
`
      );
      if (userConfirmed) {
        const parsedData = JSON.parse(savedData);
        setCoverImage(parsedData.coverImage);
        setTitle(parsedData.title);
        setEditorContent(parsedData.editorContent);
      } else {
        // 취소시 삭제
        localStorage.removeItem("tempSaveTipData");
      }
    }
  }, []);

  // 임시저장 클릭했을때 실행되는 핸들러함수 = > 로컬스토리지에 저장
  const saveToLocalStorage = () => {
    const tempSaveData = {
      coverImage,
      title,
      editorContent,
      tags,
      createdAt: new Date(), // 현재시간까지 저장
    };

    localStorage.setItem("tempSaveTipData", JSON.stringify(tempSaveData));
  };

  return (
    <>
      <HeaderMobile buttonBgColor="bg-[#00647B]" />
      <Background
        mainclassName="min-h-screen bg-[#FFFAEE] w-full h-full px-14 md:px-56 "
        divclassName="flex-col my-24 md:my-0"
      >
        <div className="hidden md:block">
          <WriteBtn
            saveToLocalStorage={saveToLocalStorage}
            buttonBgColor="bg-[#00647B]"
            buttonBorderColor="border-[#00647B]"
            buttonTextColor="text-[#00647B]"
            Title="Tips"
          />
        </div>
        <WriteAccordion Title="Tips " />
        <WriteCoverImg
          bgColor="bg-[#00647b1c]"
          btnColor="bg-[#00647B]"
          coverImage={coverImage}
          setCoverImage={setCoverImage}
        />
        <div className="mt-10 mb-20 p-4 bg-white w-full h-full">
          <WriteTitle title={title} setTitle={setTitle} />
          <WriteFormTips
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            DEFAULT_EDITOR_TEXT={DEFAULT_EDITOR_TEXT}
          />
          <WriteTag tags={tags} setTags={setTags} />
        </div>
      </Background>
    </>
  );
};

export default WriteTips;
