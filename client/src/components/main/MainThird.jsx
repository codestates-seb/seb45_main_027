import React from 'react';
import MainWrap from './MainWrap';
import Background from "../common/Background";

const MainThird = () => {
  return (
      <Background
      mainclassName=""
      divclassName=""
      style={{
        background: "url('/images/main-bg3.png')",
        backgroundPosition: "center", // 이미지 위치
        backgroundSize: "cover", // 이미지 꽉차게
        backgroundRepeat: "no-repeat", // 이미지 반복 지정
      }}>
      <MainWrap
        wrap="float-right"
        mainTitle="가까운 인테리어 가게 찾기"
        subTitle="Map"
        intro1="내 위치를 기반으로 장소를 알려드립니다."
        intro2="원하는 장소는 어디든지 검색 가능합니다."
        intro3="주소와 연락처를 제공해 드립니다."
        paddingX="px-[148px]"
        linkTo="/map"
      />
    </Background>
    );
};

export default MainThird;