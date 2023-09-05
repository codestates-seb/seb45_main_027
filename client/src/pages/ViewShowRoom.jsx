import React from "react";
import Background from "../components/common/Background";
import ViewCoverImg from "../components/feed/view/ViewCoverImg";
import Sidebar from "../components/feed/view/Sidebar";
import ViewTitle from "../components/feed/view/ViewTitle";

const ViewShowRoom = () => {
  return (
    <div className=" ">
      <ViewCoverImg />
      <Sidebar />
      <Background
        mainclassName="bg-[#FFFAEE] h-full px-14 md:px-56 "
        divclassName="flex-col my-24 md:my-0">
        <ViewTitle/>
        </Background>
    </div>
  );
};

export default ViewShowRoom;
