import React from 'react';
import ViewTitle from "../view/ViewTitle";
import TipsUserTop from "../view/TipsUserTop";
import UserBottom from "../view/UserBottom";
import ViewForm from "../view/ViewForm";
import TagForm from "../view/TagForm";
import ViewPoint from "../view/ViewPoint";

const TipsContents = () => {
    return (
      <div>
        <ViewTitle />
        <TipsUserTop />
        <ViewForm />
        <TagForm />
        <ViewPoint />
        <UserBottom />
      </div>
    );
};

export default TipsContents;