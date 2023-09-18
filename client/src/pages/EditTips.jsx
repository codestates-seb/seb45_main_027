import React, { useState, useEffect } from "react";
import HeaderMobile from "../components/header/HeaderMobile";
import Background from "../components/common/Background";
import WriteBtn from "../components/feed/write/WriteBtn";
import WriteAccordion from "../components/feed/write/WriteGuide";
import WriteCoverImg from "../components/feed/write/WriteCoverImg";
import WriteTitle from "../components/feed/write/WriteTitle";
import WriteFormTips from "../components/feed/write/WriteFormTips";
import WriteTag from "../components/feed/write/WriteTag";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import api from "../components/common/tokens";
import useAxios from "../hooks/useAxios";

const DEFAULT_EDITOR_TEXT = "내용을 입력해주세요.";

const toastStyle = {
  style: {
    border: "1px solid #033743",
    padding: "8px",
    color: "#033743",
    fontSize: "14px",
  },
  iconTheme: {
    primary: "#033743",
    secondary: "#FFFAEE",
  },
};

const EditTips = () => {
  const { tipId } = useParams();
  const [editData, setEditData] = useState();
  const [coverImage, setCoverImage] = useState(null); // 커버사진 상태
  const [title, setTitle] = useState(null); // title(제목) 상태
  const [editorContent, setEditorContent] = useState(""); // Editor 내용을 관리
  const [tags, setTags] = useState([]); // 팁에있는 해시태그 상태!
  const [isEditPage, setIsEditPage] = useState(false); // edit page여부를 확인하는 상태
  const navigate = useNavigate();

  const configParams = {
    method: "GET",
    url: `/tip/${tipId}`,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
  };

  const [response, error, loading] = useAxios(configParams);
  // 초기 렌더링시 해당 수정글의 정보를 렌더링
  useEffect(() => {
    if (response) {
      setEditData(response.data);
      if (editData) {
        setIsEditPage(true);
        setCoverImage(editData.coverPhoto);
        setTitle(editData.title);
        setEditorContent(editData.content);
        setTags(editData.tags.map((el) => el.tagContent));
      }
    } else if (error) {
      console.error("Error:", error);
    }
  }, [response, error, editData]);

  // 로컬스토리지에 임시저장값이 있으면 해당값 불러오기 위한 useEffect
  useEffect(() => {
    const savedData = localStorage.getItem("tempSaveTipDataEdit");

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
        toast.success("작성중인 글을 불러왔습니다.");
      } else {
        // 취소시 삭제
        localStorage.removeItem("tempSaveTipDataEdit");
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
        tags,
        createdAt: new Date(), // 현재시간까지 저장
      };

      localStorage.setItem("tempSaveTipDataEdit", JSON.stringify(tempSaveData));

      // 성공메세지
      toast.success("임시저장이 완료되었습니다!");
    } catch (error) {
      //실패메세지
      toast.error("임시저장에 실패하였습니다.");
    }
  };

  // 작성하기 버튼 누를 시 실행되는 핸들러 함수
  const handlePublish = async () => {
    if (coverImage && title && editorContent) {
      // 모든 값이 존재할 때만 API 요청
      // API 호출을 위한 요청 파라미터 설정
      const configParams = {
        method: "PATCH",
        url: `/tip/${tipId}`,
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        data: {
          coverPhoto: coverImage,
          title: title,
          content: editorContent,
          tagContents: tags,
        },
      };

      try {
        // API 호출
        const response = await api(configParams);
        // 성공적으로 게시된 경우
        const tipIdFromResponse = response.data.tipId;
        toast.success("수정되었습니다.");

        if (tipIdFromResponse) {
          navigate(`/tips/${tipIdFromResponse}`);
        }
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
    }
  };

  return (
    <>
      <HeaderMobile
        buttonBgColor="bg-[#00647B]"
        handlePublish={handlePublish}
      />
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
            handlePublish={handlePublish}
            isEditPage={isEditPage}
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

export default EditTips;
