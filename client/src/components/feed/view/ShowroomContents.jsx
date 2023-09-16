import React from "react";
import ViewTitle from "../view/ViewTitle";
import UserBottom from "../view/UserBottom";
import ViewForm from "../view/ViewForm";
import ViewPoint from "../view/ViewPoint";
import ShowroomUserTop from "../view/ShowroomUserTop";

const ShowroomContents = ({ feedData, setFeedData }) => {

  return (
    <div>
      <ViewTitle feedData={feedData} />
      <ShowroomUserTop feedData={feedData} />
      <ViewForm feedData={feedData}/>
      <ViewPoint feedData={feedData} />
      <UserBottom feedData={feedData} />
    </div>
  );
};

export default ShowroomContents;
