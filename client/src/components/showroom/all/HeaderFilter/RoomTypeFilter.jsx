import React from "react";

const RoomTypeFilter = ({ handleFilterClick }) => {
  const roomType = [
    {
      name: "원룸&오피스텔",
      filterCode: "TYPE01",
    },
    {
      name: "아파트",
      filterCode: "TYPE02",
    },
    {
      name: "빌라&연립",
      filterCode: "TYPE03",
    },
    {
      name: "단독주택",
      filterCode: "TYPE04",
    },
    {
      name: "기타",
      filterCode: "TYPE00",
    },
  ];

  return (
    <div className="absolute top-20 sm:top-10 left-5 grid grid-cols-2 gap-1 z-10 sm:flex min-w-max py-1 text-gray-700 font-semibold bg-white rounded-md shadow">
      {roomType.map((room, index) => (
        <div
          key={index}
          className="flex justify-center hover:bg-[#00647B] hover:text-white min-w-max px-2.5 py-1 mx-1 rounded-md"
          onClick={() => handleFilterClick(room.filterCode)}>
          {room.name}
        </div>
      ))}
    </div>
  );
};

export default RoomTypeFilter;
