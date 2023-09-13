import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Background from "../components/common/Background";
import ViewCoverImg from "../components/feed/view/ViewCoverImg";
import Sidebar from "../components/feed/view/Sidebar";
import ShowroomContents from "../components/feed/view/ShowroomContents";
import Edit from "../components/feed/view/Edit";
import Comment from "../components/feed/view/Comment";

const ViewShowRoom = () => {
  const commentSectionRef = useRef(null);

  const [coverPhoto, setCoverPhoto] = useState(null);

  const { feedId } = useParams();

  const [response, error, loading] = useAxios({
    method: "GET",
    url: `/feed/${feedId}`,
    headers: {
      "ngrok-skip-browser-warning": "69420",
    },
  });

  useEffect(() => {
    if (response) {
      
      setCoverPhoto(response.data.data.coverPhoto);
      
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
        <ShowroomContents />
        <Edit />
        <Comment ref={commentSectionRef} />
      </Background>
    </div>
  );
};

export default ViewShowRoom;
