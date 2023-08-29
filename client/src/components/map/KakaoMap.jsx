/* global kakao */
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

const KakaoMap = () => {
  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    const container = document.getElementById("map");

    // 현재위치 받기
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 5,
          };

          const newMap = new kakao.maps.Map(container, options);
          setMap(newMap);
          setCurrentPosition({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not available.");
    }
  }, []);

  // 현재위치로 돌아가는 함수
  const returnToCurrentLocation = () => {
    if (map && currentPosition) {
      const { latitude, longitude } = currentPosition;
      map.panTo(new kakao.maps.LatLng(latitude, longitude));
    }
  };

  return (
    <div className="flex flex-col relative">
      <SearchBar returnToCurrentLocation={returnToCurrentLocation} />
      <div
        id="map"
        className="w-full h-[500px] sm:h-[600px] lg:h-[800px]"
      ></div>
    </div>
  );
};

export default KakaoMap;
