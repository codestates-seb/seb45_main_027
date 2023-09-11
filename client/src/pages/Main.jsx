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

  const [isScrolling, setIsScrolling] = useState(false); // 새로운 상태 변수 추가
  const index = useRef(0);
  let debounceTimeout = null; // 하나는 이벤트가 발생했을 때 다음 이벤트가 발생할 수 있도록 허용하기 전에 일정 시간을 기다리는 것
  const maxIndex = sections.length;

  function onWheel(e) {
    e.preventDefault();

    if (isScrolling) return;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      if (e.wheelDeltaY > 0) {
        if (index.current > 0) {
          index.current -= 1;
        }
      } else {
        if (index.current < maxIndex) {
          index.current += 1;
        }
      }

      scrollToSection();
      setIsScrolling(true);

      setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    }, 200);
  }

  function scrollToSection() {
    if (index.current === maxIndex) {
      // Scroll to footer
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } else {
      // Scroll to section
      window.scrollTo({
        top:
          document
            .getElementById(`main${index.current}`)
            .getBoundingClientRect().top + window.scrollY,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    window.addEventListener("wheel", onWheel, { passive: false });
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