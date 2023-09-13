import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import ViewTitle from "../view/ViewTitle";
import TipsUserTop from "../view/TipsUserTop";
import UserBottom from "../view/UserBottom";
import ViewForm from "../view/ViewForm";
import TagForm from "../view/TagForm";
import ViewPoint from "../view/ViewPoint";

const TipsContents = () => {
  // ViewTitle
  const [title, setTitle] = useState(null);

  // TipsUserTop
  const [nickname, setNickname] = useState(null);
  const [memberImage, setMemberImage] = useState(null);
  const [createdDate, setCreatedDate] = useState(null);

  // ViewForm
  const [content, setContent] = useState(null);

  // ViewPoint
  const [goodCount, setGoodCount] = useState(null);
  const [bookMarkCount, setBookMarkCount] = useState(null);
  const [commentCount, setCommentCount] = useState(null);
  const [viewCount, setViewCount] = useState(null);

  // UserBottom
  // const [myIntro, setMyIntro] = useState(null);

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
      setTitle(response.data.title);

      setNickname(response.data.nickname);
      setMemberImage(response.data.memberImage);
      const dateTime = response.data.createdDateTime.split("T")[0];
      setCreatedDate(dateTime);

      setContent(response.data.content);

      setGoodCount(response.data.likeCount);
      setBookMarkCount(response.data.bookMarkCount);
      setCommentCount(response.data.repliesCount);
      setViewCount(response.data.views);

      // setMyIntro(response.data.myIntro);
    } else if (error) {
      console.error("Error:", error);
    }
  }, [response, error]);

  return (
    <div>
      <ViewTitle title={title} loading={loading} error={error} />
      <TipsUserTop
        memberImage={memberImage}
        nickname={nickname}
        createdDate={createdDate}
        loading={loading}
        error={error}
      />
      <ViewForm content={content} loading={loading} error={error} />
      <TagForm />
      <ViewPoint
        goodCount={goodCount}
        bookMarkCount={bookMarkCount}
        commentCount={commentCount}
        viewCount={viewCount}
        loading={loading}
        error={error}
      />
      <UserBottom
        // myIntro={myIntro}
        memberImage={memberImage}
        nickname={nickname}
      />
    </div>
  );
};

export default TipsContents;
