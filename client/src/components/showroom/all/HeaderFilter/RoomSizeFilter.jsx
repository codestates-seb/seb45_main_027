import React from "react";

const RoomSizeFilter = ({ handleFilterClick }) => {
  const roomSize = [
    {
      name: "1~9평",
      filterCode: "SIZE01",
    },
    {
      name: "10평",
      filterCode: "SIZE02",
    },
    {
      name: "20평",
      filterCode: "SIZE03",
    },
    {
      name: "30평",
      filterCode: "SIZE04",
    },
    {
      name: "40평",
      filterCode: "SIZE05",
    },
    {
      name: "50평",
      filterCode: "SIZE06",
    },
    {
      name: "60평",
      filterCode: "SIZE07",
    },
    {
      name: "70평 이상",
      filterCode: "SIZE00",
    },
  ];

  return (
    <div className="absolute grid grid-cols-4 gap-2 z-10  p-2 rounded-md ">
      {roomSize.map((room, index) => (
        <div
          key={index}
          className="bg-[#00647B] text-white text-[14px] py-2 px-2 rounded-md text-center w-[60px] h-[50px] flex items-center justify-center"
          onClick={() => handleFilterClick(room.filterCode)}
        >
          {room.name}
        </div>
      ))}
    </div>
  );
};
export default RoomSizeFilter;
