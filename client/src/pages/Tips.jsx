import React, { useState, useEffect, useRef } from "react";
import Background from "../components/common/Background";
import TipsHeader from "../components/tips/TipsHeader";
import TipsContent from "../components/tips/TipsContent";
import FooterMobile from "../components/footer/FooterMobile";
import useAxios from "../hooks/useAxios";
import { toast } from "react-hot-toast";
import useInput from "../hooks/useInput";
import api from "../components/common/tokens";

const Tips = () => {
  const [inputValue, handleInputChange, clearInput] = useInput(""); // 검색창 인풋값 상태
  const [searchKeyworld, setSearchKeyworld] = useState(""); // 검색창 인풋값을 상태로
  const [isSearch, setIsSearch] = useState(""); // 검색인지의 여부(url 앤드포인트 설정용)
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [tipData, setTipData] = useState("");
  const page = useRef(1); // 페이지 ref
  const isFirstPageRendered = useRef(false);
  const target = useRef(null);

  const configParams = {
    method: "GET",
    url: `/tip${isSearch}${searchKeyworld}?page=${page.current}`,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
  };

  const [response, error, loading] = useAxios(configParams);

  useEffect(() => {
    if (response) {
      if (isFirstPageRendered.current === false) {
        setTipData(response.data.data);
        isFirstPageRendered.current = true;
      } else {
        setTipData((prevData) => [...prevData, ...response.data]);
      }
    } else if (error) {
      console.error("Error:", error);
    }
  }, [response, error, page]);

  console.log(tipData);

  useEffect(() => {
    // 반응형 조건부렌더링
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    // 언마운트시 리스너제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 로딩시 토스트 및 이미지 처리
  useEffect(() => {
    if (!tipData && loading) {
      toast.loading("로딩중...");
    } else if (tipData || error) {
      toast.dismiss();
    }
  }, [loading, error, tipData]);

  // IntersectionObserver를 사용하여 스크롤 감지
  useEffect(() => {
    const newObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          // 페이지 번호 증가
          page.current += 1;
          const updatedUrl = `/tip${isSearch}${searchKeyworld}?page=${page.current}`;
          loadMoreData(updatedUrl); // 새로운 페이지 데이터를 불러오는 함수 호출
        }
      },
      {
        threshold: 0.1, // 스크롤이 약간 발생하면 로딩 시작
      }
    );

    if (target.current) {
      newObserver.observe(target.current);
    }

    return () => {
      if (target.current) {
        newObserver.unobserve(target.current);
      }
    };
  }, [loading, tipData]);

  // 새로운 페이지 데이터를 불러오는 함수
  const loadMoreData = async (url) => {
    try {
      toast.loading("데이터를 불러오는 중입니다...");
      const res = await api({ ...configParams, url });

      if (res.data.length === 0) {
        // 서버로부터 받은 데이터의 길이가 0인 경우
        toast.dismiss(); // 로딩 메시지 닫기
        return; // 무한 스크롤 중지
      }
      // 기존 데이터와 새로운 데이터를 병합
      setTipData((prevData) => [...prevData, ...res.data.data]);
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
    setIsSearch(`/search/`);
    setSearchKeyworld(inputValue);

    if (e.key === "Enter") {
      // API 호출을 기다리기 위해 try-catch 블록 내에서 비동기로 처리
      try {
        const updatedConfigParams = {
          ...configParams,
          url: `/tip${isSearch}${searchKeyworld}?page=${page.current}`,
        };
        const res = await api(updatedConfigParams);
        console.log(res);
        setTipData(res.data.data);
        clearInput();
      } catch (error) {
        console.error("Error sending GET request:", error);
        toast.error("검색 실패");
      }
    }
  };

  if (!tipData) {
    return (
      <div className="flex justify-center h-auto">
        <img
          src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/loading.gif"
          alt="로딩중"
        />
      </div>
    );
  }

  return (
    <>
      <Background mainclassName="h-full bg-[#FFFAEE]" divclassName="">
        <div className="flex-col w-full">
          <TipsHeader
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleSearch={handleSearch}
          />
          <TipsContent tipData={tipData} setTipData={setTipData} />
        </div>
      </Background>

      {viewportWidth < 720 && <FooterMobile />}
      <div className="infinite-scroll" ref={target}></div>
    </>
  );
};

export default Tips;
