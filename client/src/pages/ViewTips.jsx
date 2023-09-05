import React from 'react';
import Background from '../components/common/Background';
import ViewCoverImg from '../components/feed/view/ViewCoverImg';
import Sidebar from '../components/feed/view/Sidebar';
import ViewTitle from '../components/feed/view/ViewTitle';
import TipsUserTop from "../components/feed/view/TipsUserTop";
import TipsUserBottom from "../components/feed/view/TipsUserBottom";
import ViewForm from '../components/feed/view/ViewForm';
import TagForm from '../components/feed/view/TagForm';
import ViewPoint from "../components/feed/view/ViewPoint";

const ViewTips = () => {
    return (
      <div className=" ">
        <ViewCoverImg />
        <Sidebar />
        <Background
          mainclassName="bg-[#FFFAEE] h-full px-14 md:px-56 pb-20"
          divclassName="flex-col my-24 md:my-0">
          <ViewTitle />
          <TipsUserTop />
          <ViewForm />
          <TagForm />
          <ViewPoint />
          <TipsUserBottom />
        </Background>
      </div>
    );
};

export default ViewTips; 