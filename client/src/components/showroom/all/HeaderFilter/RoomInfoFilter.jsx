import React from "react";

// 확장성고려해서 개선좀해라 카테고리
const roomInfo = [
  {
    name: "원룸",
    url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/INFO01",
  },
  {
    name: "거실",
    url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/INFO02",
  },
  {
    name: "침실",
    url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/INFO03",
  },
  {
    name: "주방",
    url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/INFO04",
  },
  {
    name: "욕실",
    url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/INFO05",
  },
  {
    name: "아이방",
    url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/INFO06",
  },
  {
    name: "드레스룸",
    url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/INFO07",
  },
  {
    name: "서재",
    url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/INFO08",
  },
  {
    name: "베란다",
    url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/INFO09",
  },
  {
    name: "현관",
    url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/INFO10",
  },
  {
    name: "기타",
    url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/INFO00",
  },
];

const RoomInfoFilter = ({ handleFilterClick }) => {
  // const customHeaders = {
  //   "Content-Type": "application/json",
  //   "ngrok-skip-browser-warning": "69420",
  // };

  // const handleFilterClick = async (url) => {
  //   try {
  //     const response = await axios.get(url, {
  //       headers: customHeaders,
  //     });
  //     console.log("GET request response:", response.data);
  //   } catch (error) {
  //     console.error("Error sending GET request:", error);
  //   }
  // };

  return (
    <div className="absolute grid grid-cols-4 gap-2 z-10 p-2 rounded-md">
      {roomInfo.map((room, index) => (
        <div
          key={index}
          className="bg-[#00647B] text-white text-[14px] py-2 px-1 rounded-md text-center cursor-pointer"
          onClick={() => handleFilterClick(room.url)}
        >
          {room.name}
        </div>
      ))}
    </div>
  );
};

export default RoomInfoFilter;
