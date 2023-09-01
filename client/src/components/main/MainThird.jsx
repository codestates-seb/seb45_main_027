import React from 'react';
import MainWrap from './MainWrap';

const MainThird = () => {
    return (
      <MainWrap
        style={{
          background: "url('/images/main-bg3.png')",
          backgroundPosition: "center", // 이미지 위치
          backgroundSize: "cover", // 이미지 꽉차게
          backgroundRepeat: "no-repeat", // 이미지 반복 지정
        }}
        mainTitle="가까운 인테리어 가게 찾기"
        subTitle="Map"
        intro1="내 위치를 기반으로 장소를 알려드립니다."
        intro2="내 위치 뿐 아니라 원하는 장소는 어디든지 가능합니다."
        intro3="원하는 가게에 이름을 검색해서 보기도 가능합니다."
        page="Map 찾아보기"
        px="px-[148px]"
        linkTo="/map"
      />
    );
};

export default MainThird;