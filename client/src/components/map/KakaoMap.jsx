/* global kakao */
import React, { useEffect, useState, useCallback } from "react";
import SearchBar from "./SearchBar";
import "./KaKaoMap.css";

const KakaoMap = ({ viewportWidth }) => {
  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [inputText, setInputText] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetchCurrentPositionAndInitializeMap();
  }, []);

  useEffect(() => {
    if (map && currentPosition) {
      handleSearchWithinMapArea("인테리어");
    }
  }, [map]);

  // 초기 렌더링시 현재위치를 기준으로 위도 경도 설정
  const fetchCurrentPositionAndInitializeMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setCurrentPosition({ latitude: lat, longitude: lon });
        },
        function (error) {
          console.error("Error getting current position:", error);
        }
      );
    }
  };

  useEffect(() => {
    if (currentPosition) {
      initializeMap();
    }
  }, [currentPosition]);

  const initializeMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(
        currentPosition.latitude,
        currentPosition.longitude
      ),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    setMap(map);
  };

  const handleSearch = (keyword) => {
    if (map && currentPosition) {
      clearPreviousSearchResults();
      handleSearchWithinMapArea(keyword);
    }
  };

  const clearPreviousSearchResults = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
    setSearchResults([]);
  };

  const handleSearchWithinMapArea = useCallback(
    (keyword) => {
      if (map) {
        const center = map.getCenter();
        const ps = new kakao.maps.services.Places();
        const searchOptions = {
          location: center,
          radius: 1000,
        };

        ps.keywordSearch(keyword, placesSearchCB, searchOptions);
      }
    },
    [map]
  );

  const placesSearchCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      setSearchResults(data);
      displaySearchResults(data);
    }
  };

  const displaySearchResults = (data) => {
    markers.forEach((marker) => marker.setMap(null));

    const newMarkers = [];
    const bounds = new kakao.maps.LatLngBounds();

    for (let i = 0; i < data.length; i++) {
      var imageSrc = "./images/MapMarker.png";
      var imageSize = new kakao.maps.Size(40, 40); // 마커이미지의 크기
      var imageOption = { offset: new kakao.maps.Point(20, 35) }; // 마커이미지의 옵션.
      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      const place = data[i];
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: markerImage,
      });

      newMarkers.push(marker);
      bounds.extend(new kakao.maps.LatLng(place.y, place.x));

      const customOverlay = new kakao.maps.CustomOverlay({
        position: marker.getPosition(),
        zIndex: 1,
      });

      const contentContainer = document.createElement("div");
      contentContainer.innerHTML = `
        <div class="custom-overlay bg-[#00647B] p-2 custom-overlay w-full">
          <h2 class='text-white text-[20px] mb-2'>${place.place_name}</h2>
          <h3 class='text-white text-[14px] mb-1'>${place.address_name}</h3>
          <h3 class='text-white text-[14px] mb-4''>${place.phone}</h3>
          <button class='text-white text-[20px]'>  <a href='${place.place_url}'target=_blank>Detail</a></button>
        </div>`;

      kakao.maps.event.addListener(marker, "mouseover", () => {
        customOverlay.setContent(contentContainer);
        customOverlay.setMap(map);
      });

      // 모달창 바깥으로 나가면 모달창제거
      contentContainer.addEventListener("mouseleave", () => {
        customOverlay.setMap(null);
      });
    }

    setMarkers(newMarkers);
    map.setBounds(bounds);
  };

  // // 맵내 드래그 이벤트 발생시 주변 인테리어 업체 검색 구현
  // let searchTimeout = null;

  // useEffect(() => {
  //   if (map) {
  //     // 드래그에 이벤트 리스너 추가
  //     kakao.maps.event.addListener(map, "dragend", handleMapDrag);
  //   }
  // }, [map]);

  // // 드래그 발생시 실행할 함수
  // const handleMapDrag = () => {
  //   if (searchTimeout) {
  //     clearTimeout(searchTimeout);
  //   }

  //   // 드래그 발생수 현재위치 기준으로 1초뒤 인테리어 업체 렌더링
  //   searchTimeout = setTimeout(() => {
  //     handleSearchWithinMapArea("인테리어");
  //     clearPreviousSearchResults(); // 이전 결과 제거
  //   }, 1000);
  // };

  return (
    <div className="flex flex-col relative  rounded-md">
      <SearchBar
        returnToCurrentLocation={fetchCurrentPositionAndInitializeMap}
        onSearch={handleSearch}
        inputText={inputText}
        setInputText={setInputText}
        viewportWidth={viewportWidth}
      />
      <div
        id="map"
        className="w-full h-[500px] sm:h-[800px]  shadow-[0px_0px_3px_rgba(3,102,214,0.3)]"
      ></div>
      <div
        id="search-results"
        className="mt-4  overflow-y-auto max-h-[300px]  rounded-md "
      >
        {viewportWidth < 720 && (
          <div className="mb-5  rounded-md p-4">
            <h2 className="text-2xl text-[#f5634a] font-semibold  mb-5">
              업체목록
            </h2>
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="mb-5 p-5 bg-[#f5634a] bg-opacity-25 rounded-md shadow-[0px_0px_3px_rgba(3,102,214,0.3)]"
              >
                <a href={result.place_url} target="_blank" rel="noreferrer">
                  {index + 1}. {result.place_name} - {result.address_name}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KakaoMap;
