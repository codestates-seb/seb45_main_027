import React, { useState } from "react";

const WriteGuide = ({ Title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow rounded-md p-5 mt-6 mx-2">
      {/* 아코디언 */}
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center py-2">
          <img className="w-7 h-7 mr-5" src="/images/book.png" alt="" />
          <div className="text-2xl font-semibold">
            <span>{Title}</span>
            <span>작성 가이드</span>
          </div>
        </div>

        {/* 아코디언 버튼 */}
        <button onClick={() => setIsOpen(!isOpen)}>
          <img
            className={`w-7 h-7 ${isOpen ? "transform rotate-180" : ""}`}
            src="/images/arrow-line.png"
            alt=""
          />
        </button>
      </div>

      {/* 설명부분 */}
      <div className={`py-5 ${isOpen ? "hidden" : ""}`}>
        <ul>
          <li className="pb-2">
            * 여러분들만의 인테리어/생활 관련 팁을 공유해주세요.
          </li>
          <li className="pb-2">
            * 사진 첨부 시 용량은 장당 최대 00MB까지 업로드할 수 있고, jpg, png,
            gif 포맷을 지원합니다.
          </li>
          <li className="pb-2">
            * 제품 태그를 많이 추가할수록 검색 결과에 많이 노출되어 조회수가
            올라갑니다.
          </li>
          <li>
            * 글 작성과 이미지 업로드 시, 타인의 지식재산권을 침해하지 않도록
            유의해주세요.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WriteGuide;
