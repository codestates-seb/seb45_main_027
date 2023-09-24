import React, { useState, useEffect } from "react";
import HeaderMobile from "../components/header/HeaderMobile";
import Background from "../components/common/Background";
import WriteBtn from "../components/feed/write/WriteBtn";
import WriteGuide from "../components/feed/write/WriteGuide";
import WriteCoverImg from "../components/feed/write/WriteCoverImg";
import WriteTitle from "../components/feed/write/WriteTitle";
import WriteInformation from "../components/feed/write/WriteInformation";
import WriteFormShowroom from "../components/feed/write/WriteFormShowroom";
import { toast } from "react-hot-toast";
import api from "../components/common/tokens";
import { useNavigate } from "react-router-dom";

const DEFAULT_EDITOR_TEXT = "내용을 입력해주세요.";

const toastStyle = {
  style: {
    border: "1px solid #b91604",
    padding: "8px",
    color: "#b91604",
    fontSize: "14px",
  },
  iconTheme: {
    primary: "#b91604",
    secondary: "#FFFAEE",
  },
};

const WriteShowRoom = () => {
  const [coverImage, setCoverImage] = useState(null); // 커버사진 상태
  const [title, setTitle] = useState(null); // title(제목) 상태
  const [editorContent, setEditorContent] = useState(DEFAULT_EDITOR_TEXT); // Editor 내용을 관리
  const [selectedValues, setSelectedValues] = useState({
    roomInfo: null,
    roomSize: null,
    roomType: null,
    roomCount: null,
    location: null,
  }); // 드랍다운 선택 결과를 담은 상태

  const navigate = useNavigate();

  // 로컬스토리지에 임시저장값이 있으면 해당값 불러오기 위한 useEffect
  useEffect(() => {
    const savedData = localStorage.getItem("tempSaveShowroomData");

    if (savedData) {
      const tempSaveData = JSON.parse(savedData);
      const createdAtString = tempSaveData.createdAt;
      const createdAtDate = new Date(createdAtString);
      const formattedDate = createdAtDate.toLocaleString();

      const userConfirmed = window.confirm(
        `(${formattedDate}) 
작성중인 글을 불러오시겠습니까? 
취소를 누를 경우 작성중인 글은 삭제됩니다.`
      );
      if (userConfirmed) {
        const parsedData = JSON.parse(savedData);
        setCoverImage(parsedData.coverImage);
        setTitle(parsedData.title);
        setEditorContent(parsedData.editorContent);
        setSelectedValues(parsedData.selectedValues);
        toast.success("작성중인 글을 불러왔습니다.");
      } else {
        // 취소시 삭제
        localStorage.removeItem("tempSaveShowroomData");
        toast.error("작성중인 글을 삭제하였습니다.");
      }
    }
  }, []);

  // 임시저장 클릭했을때 실행되는 핸들러함수 = > 로컬스토리지에 저장
  const saveToLocalStorage = () => {
    try {
      const tempSaveData = {
        coverImage,
        title,
        editorContent,
        selectedValues,
        createdAt: new Date(), // 현재시간까지 저장
      };

      localStorage.setItem(
        "tempSaveShowroomData",
        JSON.stringify(tempSaveData)
      );

      // 성공메세지
      toast.success("임시저장이 완료되었습니다!");
    } catch (error) {
      //실패메세지
      // Display an error toast notification if something went wrong
      toast.error("임시저장에 실패하였습니다.");
    }
  };

  // 작성하기 버튼 누를 시 실행되는 핸들러 함수
  const handlePublish = async () => {
    if (coverImage && title && editorContent && selectedValues) {
      // 모든 값이 존재할 때만 API 요청
      // API 호출을 위한 요청 파라미터 설정
      const configParams = {
        method: "POST",
        url: `/feed`,
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        data: {
          coverPhoto: coverImage,
          title: title,
          content: editorContent,
          roomType: selectedValues.roomType.code,
          roomSize: selectedValues.roomSize.code,
          roomInfo: selectedValues.roomInfo.code,
          roomCount: selectedValues.roomCount.code,
          location: selectedValues.location.code,
        },
      };

      try {
        // API 호출
        const response = await api(configParams);
        // 성공적으로 게시된 경우
        const feedIdFromResponse = response.data.data.feedId;
        toast.success("게시되었습니다.");

        if (feedIdFromResponse) {
          navigate(`/showroom/${feedIdFromResponse}`);
        }

        // 게시 후 로컬 스토리지의 임시 데이터 삭제
        // localStorage.removeItem("tempSaveShowroomData");
      } catch (error) {
        // 오류 발생 시 오류 메시지를 토스트로 표시
        toast.error("게시 중 오류가 발생했습니다.");
      }
    } else {
      // 값이 없는 경우 각각의 null 상태에 따라 toast 메시지를 표시
      if (!coverImage) {
        toast.error("커버 사진을 선택하세요.", toastStyle);
      }
      if (!title) {
        toast.error("제목을 입력하세요.", toastStyle);
      }
      if (editorContent === DEFAULT_EDITOR_TEXT || editorContent === "") {
        toast.error("내용을 입력하세요.", toastStyle);
      }
      if (
        !selectedValues.roomType ||
        !selectedValues.roomSize ||
        !selectedValues.roomSize ||
        !selectedValues.roomInfo ||
        !selectedValues.location
      ) {
        toast.error("필수정보 값을 모두 선택하세요.", toastStyle);
      }
    }
  };

  return (
    <>
      <HeaderMobile
        buttonBgColor="bg-[#F5634A]"
        handlePublish={handlePublish}
      />
      <Background
        mainclassName=" bg-[#FFFAEE] w-full h-full px-14 md:px-56"
        divclassName="flex-col my-24 md:my-0">
        <div className="hidden md:block">
          <WriteBtn
            saveToLocalStorage={saveToLocalStorage}
            buttonBgColor="bg-[#F5634A]"
            buttonBorderColor="border-[#F5634A]"
            buttonTextColor="text-[#F5634A]"
            Title="Show room"
            handlePublish={handlePublish}
          />
        </div>
        <WriteGuide Title="Show room" />
        <WriteInformation
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
        <WriteCoverImg
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          bgColor="bg-[#f5644a16]"
          btnColor="bg-[#F5634A]"
        />
        <div className="mt-10 mb-20 p-4 bg-white w-full h-full rounded-md">
          <WriteTitle title={title} setTitle={setTitle} />
          <WriteFormShowroom
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            DEFAULT_EDITOR_TEXT={DEFAULT_EDITOR_TEXT}
          />
        </div>
        <div className="-mt-36 mx-2 pb-40">
          <WriteBtn
            saveToLocalStorage={saveToLocalStorage}
            buttonBgColor="bg-[#F5634A]"
            buttonBorderColor="border-[#F5634A]"
            buttonTextColor="text-[#F5634A]"
            Title="Tips"
            handlePublish={handlePublish}
          />
        </div>
      </Background>
    </>
  );
};

export default WriteShowRoom;
