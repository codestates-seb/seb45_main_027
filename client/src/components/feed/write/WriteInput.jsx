import React, { useState } from "react";

const selectWrap = "border rounded-md py-2 px-5 mx-20";
const liWrap = "p-5 grid grid-cols-2 items-center";

const WriteInput = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow rounded-2xl p-5 mt-6 mx-2">
      {/* 아코디언 */}
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center py-2">
          <img className="w-7 h-7 mr-5" src="/images/Write.png" alt="" />
          <div className="text-2xl font-semibold">
            <span>필수정보 입력</span>
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
        <ul className="text-xl font-semibold px-5">
          <li className={liWrap}>
            <span>주거형태</span>
            <select className={selectWrap} name="house">
              <option hidden className=" text-gray-500">
                선택해주세요
              </option>
              <option value="원룸&오피스텔">원룸&오티스텔</option>
              <option value="아파트">아파트</option>
              <option value="빌라&연립">빌라&연립</option>
              <option value="단독주택">단독주택</option>
              <option value="기타">기타</option>
            </select>
          </li>

          <li className={liWrap}>
            <span>공간</span>
            <select className={selectWrap} name="room">
              <option hidden className=" text-gray-500">
                선택해주세요
              </option>
              <option value="원룸">원룸</option>
              <option value="거실">거실</option>
              <option value="침실">침실</option>
              <option value="주방">주방</option>
              <option value="욕실">욕실</option>
              <option value="아이방">아이방</option>
              <option value="드레스룸">드레스룸</option>
              <option value="서제&작업실">서제&작업실</option>
              <option value="베란다">베란다</option>
              <option value="현관">현관</option>
              <option value="기타">기타</option>
            </select>
          </li>

          <li className={liWrap}>
            <span>평수</span>
            <select className={selectWrap} name="pyeong">
              <option hidden className=" text-gray-500">
                선택해주세요
              </option>
              <option value="1~9평">1~9평</option>
              <option value="10평대">10평대</option>
              <option value="20평대">20평대</option>
              <option value="30평대">30평대</option>
              <option value="40평대">40평대</option>
              <option value="50평대">50평대</option>
              <option value="60평대">60평대</option>
              <option value="70평대 이상">70평대 이상</option>
            </select>
          </li>

          <li className={liWrap}>
            <span>방개수</span>
            <select className={selectWrap} name="number">
              <option hidden className=" text-gray-500">
                선택해주세요
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5개 이상">5개 이상</option>
            </select>
          </li>

          <li className={liWrap}>
            <span>지역</span>
            <select className={selectWrap} name="area">
              <option hidden className=" text-gray-500">
                선택해주세요
              </option>
              <option value="서울시">서울시</option>
              <option value="경기도">경기도</option>
              <option value="충청도">충청도</option>
              <option value="전라도">전라도</option>
              <option value="강원도">강원도</option>
              <option value="경상도">경상도</option>
              <option value="제주도">제주도</option>
              <option value="해외">해외</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WriteInput;
