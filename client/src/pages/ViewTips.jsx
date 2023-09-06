import React from 'react';
import Background from '../components/common/Background';
import ViewCoverImg from '../components/feed/view/ViewCoverImg';
import Sidebar from '../components/feed/view/Sidebar';
import TipsContents from '../components/feed/view/TipsContents'
import Edit from '../components/feed/view/Edit';
import Comment from '../components/feed/view/Comment'


const ViewTips = () => {

    return (
      <div className=" ">
        <ViewCoverImg />
        <Sidebar />
        <Background
          mainclassName="bg-[#FFFAEE] h-full px-14 md:px-56 pb-40"
          divclassName="flex-col my-24 md:my-0">
          <TipsContents />
          <Edit/>
          <Comment/>
        </Background>
      </div>
    );
};

export default ViewTips; 