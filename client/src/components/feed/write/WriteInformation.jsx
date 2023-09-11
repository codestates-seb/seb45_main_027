import React, { useState, useEffect } from "react";
import Select from "react-select";

const optionsData = [
  {
    name: "house",
    label: "주거형태",
    options: ["원룸&오피스텔", "아파트", "빌라&타운하우스", "단독주택", "기타"],
  },
  {
    name: "room",
    label: "공간",
    options: [
      "원룸",
      "거실",
      "침실",
      "주방",
      "욕실",
      "아이방",
      "드레스룸",
      "서재&작업실",
      "베란다",
      "현관",
      "기타",
    ],
  },
  {
    name: "pyeong",
    label: "평수",
    options: [
      "1~9평",
      "10평",
      "20평",
      "30평",
      "40평",
      "50평",
      "60평",
      "70평 이상",
    ],
  },
  {
    name: "number",
    label: "방 개수",
    options: ["1", "2", "3", "4", "5개 이상"],
  },
  {
    name: "area",
    label: "지역",
    options: [
      "서울시",
      "경기도",
      "충청도",
      "전라도",
      "강원도",
      "경상도",
      "제주도",
      "해외",
    ],
  },
];

const WriteInformation = ({ selectedValues, setSelectedValues }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (name, value) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [name]: value,
    }));
  };

  const customStyles = {
    // 드랍다운 스타일
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgba(245, 99, 74, 0.05)" : "white",
      color: "black",
    }),
  };

  return (
    <div className="bg-white shadow rounded-md p-5 mt-6 mx-2">
      {/* 아코디언 */}
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center py-2">
          <img
            className="w-7 h-7 mr-5"
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/Write.png"
            alt=""
          />
          <div className="text-2xl font-semibold">
            <span>필수정보 입력</span>
          </div>
        </div>

        {/* 아코디언 버튼 */}
        <button onClick={() => setIsOpen(!isOpen)}>
          <img
            className={`w-7 h-7 ${isOpen ? "transform rotate-180" : ""}`}
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/arrow-line.png"
            alt=""
          />
        </button>
      </div>

      {/* 설명부분 */}
      <div className={`py-5 ${isOpen ? "hidden" : ""}`}>
        <ul className="flex flex-wrap justify-start content-center text-xl font-semibold px-5">
          {optionsData.map((optionGroup) => (
            <li
              key={optionGroup.name}
              className="flex p-3 2xl:w-1/3 xl:w-1/2 sm:w-full w-full"
            >
              <span className="pt-5 min-w-[70px]">{optionGroup.label}</span>
              <Select
                className="py-2 w-[70%] "
                options={optionGroup.options.map((option) => ({
                  value: option,
                  label: option,
                }))}
                placeholder={`선택해주세요.`}
                styles={customStyles}
                // selectedValues와 연동
                value={selectedValues[optionGroup.name] || []}
                onChange={(value) =>
                  handleSelectChange(optionGroup.name, value)
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WriteInformation;
