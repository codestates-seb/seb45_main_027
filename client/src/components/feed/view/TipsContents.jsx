import React, { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useParams } from "react-router-dom";
import ViewTitle from "../view/ViewTitle";
import TipsUserTop from "../view/TipsUserTop";
import UserBottom from "../view/UserBottom";
import ViewForm from "../view/ViewForm";
import TagForm from "../view/TagForm";
import ViewPoint from "../view/ViewPoint";

const TipsContents = ({ feedData }) => {
  const [follow, setFollow] = useState("");
  const { tipId } = useParams();

  // 팔로우 상태
  const [res, err, loading, fetchData] = useAxios({
    method: "GET",
    url: `/tip/${tipId}`,
    headers: {
      "ngrok-skip-browser-warning": "69420",
    },
  });

  return (
    <div>
      <ViewTitle feedData={feedData} />
      <TipsUserTop feedData={feedData} setFollow={setFollow} follow={follow} />
      <ViewForm feedData={feedData} />
      <TagForm feedData={feedData} />
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

export default TipsContents;
