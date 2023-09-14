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

//태그 관련정보 수정후 post 요청만 보내면됨  coverImage  title editorContent selectedValues 내용 담아서 *****
const WriteShowRoom = () => {
  const [coverImage, setCoverImage] = useState(null); // 커버사진 상태
  const [title, setTitle] = useState(""); // title(제목) 상태
  const [editorContent, setEditorContent] = useState(""); // Editor 내용을 관리
  const [selectedValues, setSelectedValues] = useState({
    roomInfo: null,
    roomSize: null,
    roomType: null,
    roomCount: null,
    location: null,
  }); // 드랍다운 선택 결과를 담은 상태

  console.log(coverImage);
  // console.log(title);
  // console.log(editorContent);
  // console.log(selectedValues);
  console.log(selectedValues);

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
  };

  return (
    <>
      <HeaderMobile buttonBgColor="bg-[#F5634A]" />
      <Background
        mainclassName=" bg-[#FFFAEE] w-full h-full px-14 md:px-56"
        divclassName="flex-col my-24 md:my-0"
      >
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
          />
        </div>
      </Background>
    </>
  );
};

export default WriteShowRoom;
