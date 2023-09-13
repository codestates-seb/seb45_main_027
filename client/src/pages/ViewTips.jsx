import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Background from "../components/common/Background";
import ViewCoverImg from "../components/feed/view/ViewCoverImg";
import Sidebar from "../components/feed/view/Sidebar";
import TipsContents from "../components/feed/view/TipsContents";
import Edit from "../components/feed/view/Edit";
import Comment from "../components/feed/view/Comment";

const ViewTips = () => {
  // 사이드바 댓글 이동 버튼
  const commentSectionRef = useRef(null);
  // 커버 이미지
  const [coverPhoto, setCoverPhoto] = useState(null);
  // 멤버아이디 (게시글ID(feedId)와 memberId 일치시에만 On)
  const [userId, setUserId] = useState(null);
  // 로컬에 저장된 memberID 가져오기
  const memberId = localStorage.getItem("memberId");

  const { tipId } = useParams();

  const [response, error, loading] = useAxios({
    method: "GET",
    url: `/tip/${tipId}`,
    headers: {
      "ngrok-skip-browser-warning": "69420",
    },
  });

  useEffect(() => {
    if (response) {
      setCoverPhoto(response.data.coverPhoto);
      setUserId(response.data.feedId);
    } else if (error) {
      console.error("Error:", error);
    }
  }, [response, error]);

  return (
    <div>
      <ViewCoverImg coverPhoto={coverPhoto} loading={loading} error={error} />
      <Sidebar commentSectionRef={commentSectionRef} />
      <Background
        mainclassName="bg-[#FFFAEE] h-full px-14 md:px-56 pb-40"
        divclassName="flex-col my-24 md:my-0">
        <TipsContents />
        {memberId === userId && <Edit />}
        <Comment ref={commentSectionRef} />
      </Background>
    </div>
  );
};

export default ViewTips;
