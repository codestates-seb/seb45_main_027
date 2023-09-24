import React, { useState, useEffect, useRef } from "react";
import Background from "../components/common/Background";
import BestInterior from "../components/showroom/bestinterior/BestInterior";
import All from "../components/showroom/all/All";
import useAxios from "../hooks/useAxios";
import { toast } from "react-hot-toast";
import api from "../components/common/tokens";
import useInput from "../hooks/useInput";

const ShowRoom = () => {
  const [inputValue, handleInputChange, clearInput] = useInput(""); // 검색창 인풋값 상태
  const [searchKeyworld, setSearchKeyworld] = useState(""); // 검색창 인풋값을 상태로
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth); // 반응형 너비 값
  const [showroomData, setShowroomData] = useState([]); // All부분 렌더링하는 쇼룸데이터
  const [feedCode, setFeedCode] = useState("filter"); // feed/ 다음 피드 코드상태 ex) filter, search 2개임
  const [filterCode, setFilterCode] = useState("RECENT00"); // filter뒤에 filterCode 상태
  const [isLastPage, setIsLastPage] = useState(false); // page가 end인지를 저장하는 상태
  const page = useRef(1); // 페이지 ref
  const isFirstPageRendered = useRef(false);
  const target = useRef(null);

  const configParams = {
    method: "GET",
    url: `/feed/${feedCode}/${inputValue}${filterCode}?page=${page.current}`,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
  };

  const [response, error, loading] = useAxios(configParams);

  useEffect(() => {
    if (response) {
      if (isFirstPageRendered.current === false) {
        setShowroomData(response.data.data);
        isFirstPageRendered.current = true;
      } else {
        setShowroomData((prevData) => [...prevData, ...response.data.data]);
      }
    } else if (error) {
      console.error("Error:", error);
    }
  }, [response, error, page]);

  useEffect(() => {
    // 반응형 조건부 렌더링
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    // 언마운트시 리스너제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [viewportWidth]);

  // 무한스크롤 구현하면서 필요없어진 코드같음..
  useEffect(() => {
    if (!showroomData && loading) {
      toast.loading("데이터를 불러오는 중입니다...");
    } else if (showroomData || error) {
      // toast.dismiss();
    }
  }, [showroomData, loading, error]);

  // 필터링 로직 구현 함수1 (공간별, 평수별, 주거 형태별)
  const handleFilterClick = async (filterCode) => {
    try {
      const filterToast = toast.loading("필터링중입니다...");
      setFeedCode("filter");
      setFilterCode(filterCode);
      page.current = 1;
      isFirstPageRendered.current = true;

      const updatedConfigParams = {
        ...configParams,
        url: `/feed/${feedCode}/${inputValue}${filterCode}?page=${page.current}`,
      };

      const res = await api(updatedConfigParams);
      // toast.dismiss(filterToast); // 필터링 중 토스트 메시지 닫기
      setShowroomData(res.data.data);
      setIsLastPage(res.data.isLast);
      page.current = 1; // 필터링 시 페이지를 다시 1로 설정
    } catch (error) {
      console.error("Error sending GET request:", error);
      if (error.request.status === 500) {
        toast.dismiss();
        toast.error("필터링 데이터가 없습니다.");
      }
    }
  };

  // 필터링 필터링 로직 구현 함수2(최신순(default), 인기순)
  const handleFilterClick2 = async (filterCode) => {
    try {
      const filterToast = toast.loading("필터링중입니다...");
      setFeedCode("filter");
      setFilterCode(filterCode);
      page.current = 1;
      isFirstPageRendered.current = true;

      const updatedConfigParams = {
        ...configParams,
        url: `/feed/${feedCode}/${inputValue}${filterCode}?page=${page.current}`,
      };

      const res = await api(updatedConfigParams);
      // toast.dismiss(filterToast); // 필터링 중 토스트 메시지 닫기
      setShowroomData(res.data.data);
      setIsLastPage(res.data.isLast);
      page.current = 1; // 필터링 시 페이지를 다시 1로 설정
    } catch (error) {
      console.error("Error sending GET request:", error);
      if (error.request.status === 500) {
        toast.dismiss();
        toast.error("필터링 데이터가 없습니다.");
      }
    }
  };

  // IntersectionObserver를 사용하여 스크롤 감지
  useEffect(() => {
    // IntersectionObserver를 생성하고 등록
    if (!isLastPage && !loading && isFirstPageRendered.current == true) {
      // isLast가 false일 때만 IntersectionObserver 등록
      const newObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !loading) {
            page.current += 1; // 페이지 번호 증가
            const updatedUrl = `/feed/${feedCode}/${inputValue}${filterCode}?page=${page.current}`;
            loadMoreData(updatedUrl); // 새로운 페이지 데이터를 불러오는 함수 호출
          }
        },
        {
          threshold: 0.1, // 스크롤이 약간 발생하면 로딩 시작
        }
      );

      // 현재 컴포넌트의 target 요소를 설정합니다.
      if (target.current) {
        newObserver.observe(target.current);
      }

      // 컴포넌트가 언마운트될 때 Observer를 해제합니다.
      return () => {
        if (target.current) {
          newObserver.unobserve(target.current);
        }
      };
    }
  }, [filterCode, loading, searchKeyworld, isLastPage]);

  // 새로운 페이지 데이터를 불러오는 함수
  const loadMoreData = async (url) => {
    try {
      toast.loading("로딩중..."); // 데이터 로딩 중 토스트 메시지 표시
      const res = await api({ ...configParams, url });
      if (res.data.isLast === false) {
        setShowroomData((prevData) => [...prevData, ...res.data.data]);
      } else {
        setShowroomData((prevData) => [...prevData, ...res.data.data]);
        // 마지막 페이지 설정
        setIsLastPage(res.data.isLast);
      }
      toast.dismiss(); // 로딩 메시지 닫기
    } catch (error) {
      console.error("Error loading more data:", error);
      toast.error("데이터를 불러오는 중에 오류가 발생했습니다."); // 에러 시 토스트 메시지 표시
      toast.dismiss(); // 에러 메시지 닫기
    }
  };

  // 검색기능을 담당하는 함수
  const handleSearch = async (e, inputValue) => {
    // 추후 앤터 누를시 서버와 통신해서 해당 게시물을 보여주는 로직 작성 ****
    page.current = 1;
    isFirstPageRendered.current = true;
    setFeedCode("search");
    setFilterCode("");
    setSearchKeyworld(inputValue);

    const updatedConfigParams = {
      ...configParams,
      url: `/feed/${feedCode}/${inputValue}${filterCode}?page=${page.current}`,
    };

    if (e.key === "Enter") {
      // API 호출을 기다리기 위해 try-catch 블록 내에서 비동기로 처리.

      toast.loading("검색중입니다.");
      try {
        const res = await api(updatedConfigParams);
        toast.dismiss();
        setShowroomData(res.data.data);
        clearInput();
      } catch (error) {
        console.error("Error sending GET request:", error);
        toast.error("검색 실패");
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-[#fdfdfe] w-screen h-[810px]">
        <div className="flex justify-center h-auto">
          <img
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/loading.gif"
            alt="로딩중"
          />
        </div>
      </div>
    );
  }

  return (
    <Background mainclassName="h-full bg-[#FFFAEE]">
      <div className="flex-col w-full">
        <BestInterior viewportWidth={viewportWidth} />
        <All
          viewportWidth={viewportWidth}
          setViewportWidth={setViewportWidth}
          showroomData={showroomData}
          setShowroomData={setShowroomData}
          handleFilterClick={handleFilterClick}
          handleFilterClick2={handleFilterClick2}
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
        />
        <div className="infinite-scroll" ref={target}></div>
      </div>
    </Background>
  );
};

export default ShowRoom;
