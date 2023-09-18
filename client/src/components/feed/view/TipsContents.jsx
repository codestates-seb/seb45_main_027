import React, { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import { useParams } from "react-router-dom";
import ViewTitle from "../view/ViewTitle";
import TipsUserTop from "../view/TipsUserTop";
import UserBottom from "../view/UserBottom";
import ViewForm from "../view/ViewForm";
import TagForm from "../view/TagForm";
import ViewPoint from "../view/ViewPoint";

const TipsContents = ({ feedData, setFeedData }) => {
  const memberId = localStorage.getItem("memberId");
  const frommemberId = localStorage.getItem("memberId");
  const [follow, setFollow] = useState("");
  const { feedId } = useParams();

  // 팔로우 상태
  const [res, err, loading, fetchData] = useAxios({
    method: "GET",
    url: `/tip/${feedId}`,
    headers: {
      "ngrok-skip-browser-warning": "69420",
    },
  });

  const [patchRes, patchErr, patchLoading, patchFetchData] = useAxios(
    {
      method: "PATCH",
      url: `/follow/choose/${frommemberId}/${memberId}`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    },
    false
  );

  return (
    <div>
      <ViewTitle
        feedData={feedData}
        setFollow={setFollow}
        follow={follow}
        res={res}
        patchFetchData={patchFetchData}
      />
      <TipsUserTop feedData={feedData} />
      <ViewForm feedData={feedData} />
      <TagForm feedData={feedData} />
      <ViewPoint feedData={feedData} />
      <UserBottom
        feedData={feedData}
        setFollow={setFollow}
        follow={follow}
        res={res}
        patchFetchData={patchFetchData}
      />
    </div>
  );
};

export default TipsContents;
