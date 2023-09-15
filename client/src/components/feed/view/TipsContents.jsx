import React from "react";
import ViewTitle from "../view/ViewTitle";
import TipsUserTop from "../view/TipsUserTop";
import UserBottom from "../view/UserBottom";
import ViewForm from "../view/ViewForm";
import TagForm from "../view/TagForm";
import ViewPoint from "../view/ViewPoint";

const TipsContents = ({ feedData, setFeedData }) => {
 

  return (
    <div>
      <ViewTitle feedData={feedData} />
      <TipsUserTop feedData={feedData}/>
      <ViewForm  feedData={feedData}/>
      <TagForm  feedData={feedData}/>
      <ViewPoint feedData={feedData}/>
      <UserBottom feedData={feedData}/>
    </div>
  );
};

export default TipsContents;
