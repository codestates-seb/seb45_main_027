import React, { useEffect, useState, useRef } from "react";
import MainSection from "../components/main/MainSection";

const Main = () => {
  const sections = [
    {
      id: "main0",
      background:
        "url('https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/main-bg1.png')",
      title: "공간별 인테리어 모아보기",
      subTitle: "Show room",
      intro1: "베스트 10곳을 모아서 볼 수 있는!",
      intro2: "원하는 공간만 골라서 볼 수 있는!",
      intro3: "회원님의 공간도 자랑할 수 있는!",
      paddingX: "px-[75px]",
      linkTo: "/showroom",
    },
    {
      id: "main1",
      background:
        "url('https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/main-bg2.png')",
      title: "유용한 꿀팁 모아보기",
      subTitle: "Tips",
      intro1: "살림에 유용한 정보들이 가득합니다.",
      intro2: "태그로 원하는 정보만 모아볼 수 있습니다.",
      intro3: "또 보고 싶은 글은 북마크 할 수 있습니다.",
      paddingX: "px-[140px]",
      linkTo: "/tips",
    },
    {
      id: "main2",
      background:
        "url('https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/main-bg3.png')",
      title: "가까운 인테리어 가게 찾기",
      subTitle: "Map",
      intro1: "내 위치를 기반으로 장소를 알려드립니다.",
      intro2: "원하는 장소는 어디든지 검색 가능합니다.",
      intro3: "주소와 연락처를 제공해 드립니다.",
      paddingX: "px-[148px]",
      linkTo: "/map",
    },
  ];

  const [position, setPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false); // 새로운 상태 변수 추가
  const index = useRef(0);

  function onWheel(e) {
    if (isScrolling) return; // 스크롤 중이면 추가 작동을 방지
    setIsScrolling(true); // 스크롤 시작

    setPosition(window.scrollY);

    if (e.wheelDeltaY > 0) {
      if (index.current > 0) {
        index.current -= 1;
      }
    } else {
      if (index.current < sections.length - 1) {
        index.current += 1;
      }
    }

    scrollToSection();

    setTimeout(() => {
      setIsScrolling(false); // 스크롤 작동이 끝난 후 상태를 초기화
    }, 500); // 스크롤 작동이 끝나기까지의 시간 (밀리초 단위)
  }

  function scrollToSection() {
    setTimeout(() => {
      window.scrollTo({
        top:
          document.getElementById(`main${index.current}`).getBoundingClientRect()
            .top + window.scrollY,
        behavior: "smooth",
      });
    },1000);
  }

  useEffect(() => {
    window.addEventListener("wheel", onWheel);
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <>
      <div className="w-full overscroll-x-none">
        {sections.map((section, index) => (
          <MainSection key={index} {...section} />
        ))}
      </div>
    </>
  );
};

export default Main;