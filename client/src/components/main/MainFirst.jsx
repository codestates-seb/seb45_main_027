import React from 'react';
import MainWrap from './MainWrap';
import Background from "../common/Background";

const MainFirst = () => {
  return (
    <Background
      mainclassName=""
      divclassName=""
      style={{
        background: "url('/images/main-bg1.png')",
        backgroundPosition: "center", // 이미지 위치
        backgroundSize: "cover", // 이미지 꽉차게
        backgroundRepeat: "no-repeat", // 이미지 반복 지정
      }}>
      <MainWrap
        mainTitle="공간별 인테리어 모아보기"
        subTitle="Show room"
        intro1="베스트 10곳을 모아서 볼 수 있는!"
        intro2="원하는 공간만 골라서 볼 수 있는!"
        intro3="회원님의 공간도 자랑할 수 있는!"
        paddingX="px-[75px]"
        linkTo="/showroom"
      />
    </Background>
  );
};

export default MainFirst;