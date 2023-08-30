/* global kakao */
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

const KakaoMap = () => {
  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [inputText, setInputText] = useState([]);
  const [markers, setMarkers] = useState([]);
  const infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  useEffect(() => {
    fetchCurrentPositionAndInitializeMap();
  }, []);

  useEffect(() => {
    // 초기 렌더링시 기본값으로 인테리어 검색
    handleSearch("인테리어");
  }, [map]);

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
      const ps = new kakao.maps.services.Places();
      const searchOptions = {
        location: new kakao.maps.LatLng(
          currentPosition.latitude,
          currentPosition.longitude
        ),
        radius: 5000,
      };
      ps.keywordSearch(keyword, placesSearchCB, searchOptions);
    }
  };

  const placesSearchCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      setSearchResults(data);
      displaySearchResults(data);
    }
  };

  const displaySearchResults = (data) => {
    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null));

    const newMarkers = [];
    const bounds = new kakao.maps.LatLngBounds();

    for (let i = 0; i < data.length; i++) {
      const place = data[i];
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      newMarkers.push(marker);
      bounds.extend(new kakao.maps.LatLng(place.y, place.x));

      // Add marker click event listener to display info when clicked
      kakao.maps.event.addListener(marker, "click", () => {
        const content = `<div>${place.place_name}</div>`;
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });

      // Add marker mouseover event listener to display info when hovered
      kakao.maps.event.addListener(marker, "mouseover", () => {
        const content = `<div>${place.place_name}</div>`;
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });

      // Add marker mouseout event listener to close info window
      kakao.maps.event.addListener(marker, "mouseout", () => {
        infoWindow.close();
      });
    }

    setMarkers(newMarkers);
    map.setBounds(bounds);
  };

  return (
    <div className="flex flex-col relative">
      <SearchBar
        returnToCurrentLocation={fetchCurrentPositionAndInitializeMap}
        onSearch={handleSearch}
        inputText={inputText}
        setInputText={setInputText}
      />
      <div
        id="map"
        className="w-full h-[500px] sm:h-[600px] lg:h-[800px]"
      ></div>
      <div id="search-results">
        {searchResults.map((result, index) => (
          <div key={index}>{result.place_name}</div>
        ))}
      </div>
    </div>
  );
};

export default KakaoMap;
