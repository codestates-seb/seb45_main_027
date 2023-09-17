import React, { useState, useRef, useEffect } from "react";
import RoomInfoFilter from "./RoomInfoFilter";
import RoomSizeFilter from "./RoomSizeFilter";
import RoomTypeFilter from "./RoomTypeFilter";

const filterStyle =
  "flex justify-center px-2.5 py-2 mx-1 text-gray-700 font-semibold hover:text-white hover:font-bold hover:bg-[#00647bcc] rounded-md";

const filterFocusStyle =
  "flex justify-center px-2.5 py-1 mx-1 text-gray-700 font-semibold rounded-md border-[3px] border-[#00647bcc] transition";

const AllHeaderFilter = ({ handleFilterClick, handleFilterClick2 }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [isFocus, setIsFocus] = useState({
    newest: true,
    popular: false,
    roomInfo: false,
    roomSize: false,
    roomType: false,
  });
  const modalRef = useRef(null);

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

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

  const handleFilterFocus = (filterKey) => {
    const updatedFocusState = { ...isFocus };
    Object.keys(updatedFocusState).forEach((key) => {
      if (key !== filterKey) {
        updatedFocusState[key] = false;
      }
    });
    return updatedFocusState;
  };

  const handleFilterClickWithFocus = (filterKey, modalName) => {
    if (modalName) {
      openModal(modalName);
    }
    setIsFocus((prevState) => ({
      [filterKey]: !prevState[filterKey],
    }));
  };

  const filters = [
    { key: "newest", label: "최신순", modal: null, filterCode: "RECENT00" },
    { key: "popular", label: "인기순", modal: null, filterCode: "VIEW00" },
    { key: "roomInfo", label: "공간별", modal: "roomInfoFilter" },
    { key: "roomSize", label: "평수별", modal: "roomSizeFilter" },
    { key: "roomType", label: "주거형태별", modal: "roomTypeFilter" },
  ];

  return (
    <div className="relative text-xl pl-4 cursor-pointer grid grid-cols-3 gap-1 sm:flex">
      {filters.map((filter) => (
        <span
          key={filter.key}
          className={isFocus[filter.key] ? filterFocusStyle : filterStyle}
          onClick={() => {
            handleFilterClickWithFocus(filter.key, filter.modal);
            handleFilterFocus(filter.key);
            if (filter.filterCode) {
              handleFilterClick2(filter.filterCode);
            }
          }}
        >
          {filter.label}
        </span>
      ))}
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
