import React from 'react';
import ViewTitle from "../view/ViewTitle";
import UserBottom from "../view/UserBottom";
import ViewForm from "../view/ViewForm";
import ViewPoint from "../view/ViewPoint";
import ShowroomUserTop from "../view/ShowroomUserTop";

const ShowroomContents = () => {
    return (
      <div>
        <ViewTitle />
        <ShowroomUserTop />
        <ViewForm />
        <ViewPoint />
        <UserBottom />
      </div>
    );
};

export default ShowroomContents;