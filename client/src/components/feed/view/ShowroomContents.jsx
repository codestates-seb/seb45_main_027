import React, { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import { useParams } from "react-router-dom";
import ViewTitle from "../view/ViewTitle";
import UserBottom from "../view/UserBottom";
import ViewForm from "../view/ViewForm";
import ViewPoint from "../view/ViewPoint";
import ShowroomUserTop from "../view/ShowroomUserTop";

const ShowroomContents = ({ feedData, setFeedData }) => {
  const memberId = localStorage.getItem("memberId");
  const frommemberId = feedData.memberId;
  console.log(feedData.memberId);
  const [follow, setFollow] = useState("");
  const { feedId } = useParams();

  // 팔로우 상태
  const [res, err, loading, fetchData] = useAxios({
    method: "GET",
    url: `/feed/${feedId}`,
    headers: {
      "ngrok-skip-browser-warning": "69420",
    },
  });


  return (
    <div>
      <ViewTitle feedData={feedData} />
      <ShowroomUserTop
        feedData={feedData}
        setFollow={setFollow}
        follow={follow}
        res={res}
      />
      <ViewForm feedData={feedData} />
      <ViewPoint feedData={feedData} />
      <UserBottom
        feedData={feedData}
        setFollow={setFollow}
        follow={follow}
        res={res}
      />
    </div>
  );
};

export default ShowroomContents;
