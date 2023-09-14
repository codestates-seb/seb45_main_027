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
    <div className="absolute top-20 sm:top-10 left-5 grid grid-cols-2 gap-1 z-10 sm:flex min-w-max py-1 text-gray-700 font-semibold bg-[#ffffff7a] rounded-md shadow">
      {roomSize.map((room, index) => (
        <div
          key={index}
          className="flex justify-center hover:bg-[#00647bcc] hover:text-white min-w-max px-2.5 py-1 mx-1 rounded-md"
          onClick={() => handleFilterClick(room.filterCode)}>
          {room.name}
        </div>
      ))}
    </div>
  );
};
export default RoomSizeFilter;
