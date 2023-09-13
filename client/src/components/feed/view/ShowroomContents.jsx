import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import ViewTitle from "../view/ViewTitle";
import UserBottom from "../view/UserBottom";
import ViewForm from "../view/ViewForm";
import ViewPoint from "../view/ViewPoint";
import ShowroomUserTop from "../view/ShowroomUserTop";

const ShowroomContents = () => {
  // ViewTitle
  const [title, setTitle] = useState(null);

  // ShowroomUserTop
  const [nickname, setNickname] = useState(null);
  const [memberImage, setMemberImage] = useState(null);
  const [createdDate, setCreatedDate] = useState(null);
  const [roomTypeName, setRoomTypeName] = useState(null);
  const [roomInfoName, setRoomInfoName] = useState(null);
  const [roomSizeName, setRoomSizeName] = useState(null);
  const [roomCountName, setRoomCountName] = useState(null);
  const [locationName, setLocationName] = useState(null);

  // ViewForm
  const [content, setContent] = useState(null);

  // ViewPoint
  const [goodCount, setGoodCount] = useState(null);
  const [bookMarkCount, setBookMarkCount] = useState(null);
  const [commentCount, setCommentCount] = useState(null);
  const [viewCount, setViewCount] = useState(null);

  // UserBottom
  const [myIntro, setMyIntro] = useState(null);


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
      // ViewTitle
      setTitle(response.data.data.title);
      // ShowroomUserTop,UserBottom
      setMemberImage(response.data.data.memberImage);
      setNickname(response.data.data.nickname);
      setCreatedDate(response.data.data.createdDateTime.split("T")[0]);
      setRoomTypeName(response.data.data.roomTypeName);
      setRoomInfoName(response.data.data.roomInfoName);
      setRoomSizeName(response.data.data.roomSizeName);
      setRoomCountName(response.data.data.roomCountName);
      setLocationName(response.data.data.locationName);
      // ViewForm
      setContent(response.data.data.content);
      // ViewPoint
      setGoodCount(response.data.data.likeCount);
      setBookMarkCount(response.data.data.bookMarkCount);
      setCommentCount(response.data.data.repliesCount);
      setViewCount(response.data.data.views);
      // UserBottom
      setMyIntro(response.data.data.myIntro);
      
    } else if (error) {
      console.error("Error:", error);
    }
  }, [response, error]);
  return (
    <div>
      <ViewTitle title={title} loading={loading} error={error} />
      <ShowroomUserTop
        memberImage={memberImage}
        nickname={nickname}
        createdDate={createdDate}
        roomTypeName={roomTypeName}
        roomInfoName={roomInfoName}
        roomSizeName={roomSizeName}
        roomCountName={roomCountName}
        locationName={locationName}
        loading={loading}
        error={error}
      />
      <ViewForm content={content} />
      <ViewPoint
        goodCount={goodCount}
        bookMarkCount={bookMarkCount}
        commentCount={commentCount}
        viewCount={viewCount}
        loading={loading}
        error={error}
      />
      <UserBottom
        myIntro={myIntro}
        memberImage={memberImage}
        nickname={nickname}
      />
    </div>
  );
};

export default ShowroomContents;
