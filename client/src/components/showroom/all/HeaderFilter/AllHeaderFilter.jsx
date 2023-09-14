import React, { useState, useRef, useEffect } from "react";
import RoomInfoFilter from "./RoomInfoFilter";
import RoomSizeFilter from "./RoomSizeFilter";
import RoomTypeFilter from "./RoomTypeFilter";

const buttonStyle =
  "flex justify-center px-2.5 py-1 mx-1 text-gray-700 font-semibold hover:text-white hover:font-bold hover:bg-[#00647bcc] rounded-md focus:border-[#00647B] focus:ring focus:ring-[#00647B] focus:ring-2";

const AllHeaderFilter = ({ handleFilterClick }) => {
  // const [roomInfoFilter, setRoomInfoFilter] = useState(false);
  // const [roomSizeFilter, setRoomSizeFilter] = useState(false);
  // const [roomTypeFilter, setRoomTypeFilter] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 상태 하나로 필터 모달 관리
  const modalRef = useRef(null);

  // // 공간별 필터 클릭
  // const openRoomInfoFilter = () => {
  //   setRoomInfoFilter(!roomInfoFilter);
  //   setRoomSizeFilter(false);
  //   setRoomTypeFilter(false);
  // };

  // // 평수별 필터 클릭
  // const openRoomSizeFilter = () => {
  //   setRoomSizeFilter(!roomSizeFilter);
  //   setRoomInfoFilter(false);
  //   setRoomTypeFilter(false);
  // };

  // // 주거형태별 필터 클릭
  // const openRoomTypeFilter = () => {
  //   setRoomTypeFilter(!roomTypeFilter);
  //   setRoomInfoFilter(false);
  //   setRoomSizeFilter(false);
  // };
  // 모달 오픈로직
  const openModal = (modalName) => {
    setActiveModal(modalName);
  };
  // 모달창 닫는 로직
  const closeModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    if (activeModal) {
      window.addEventListener("mousedown", handleOutsideClick);
    } else {
      window.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activeModal]);

  return (
    <div className="relative text-xl pl-4 cursor-pointer grid grid-cols-3 gap-1 sm:flex">
      <span className={buttonStyle}>최신순</span>
      <span className={buttonStyle}>인기순</span>
      <span className={buttonStyle} onClick={() => openModal("roomInfoFilter")}>
        공간별
      </span>
      <span className={buttonStyle} onClick={() => openModal("roomSizeFilter")}>
        평수별
      </span>
      <span className={buttonStyle} onClick={() => openModal("roomTypeFilter")}>
        주거형태별
      </span>
      {activeModal && (
        <div ref={modalRef}>
          {activeModal === "roomInfoFilter" && (
            <RoomInfoFilter handleFilterClick={handleFilterClick} />
          )}
          {activeModal === "roomSizeFilter" && (
            <RoomSizeFilter handleFilterClick={handleFilterClick} />
          )}
          {activeModal === "roomTypeFilter" && (
            <RoomTypeFilter handleFilterClick={handleFilterClick} />
          )}
        </div>
      )}
    </div>
  );
};

export default AllHeaderFilter;
