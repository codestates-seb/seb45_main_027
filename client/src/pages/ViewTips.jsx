import React from 'react';
import Background from '../components/common/Background';
import ViewCoverImg from '../components/feed/view/ViewCoverImg';

const ViewTips = () => {
    return (
        <>
            <ViewCoverImg/>
        <Background
          mainclassName="bg-[#FFFAEE] h-full px-14 md:px-56 "
          divclassName="flex-col my-24 md:my-0"></Background>
      </>
    );
};

export default ViewTips; 