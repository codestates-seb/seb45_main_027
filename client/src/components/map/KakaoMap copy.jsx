/* global kakao */
import React, { useEffect, useState, useMemo } from "react";
import SearchBar from "./SearchBar";

const { kakao } = window;

const KakaoMap = () => {
  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  // 검색결과 배열에 담아줌
  const [result, setResult] = useState([]);

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setPlace(inputText);
      setInputText("");
    }
  };

  useEffect(() => {
    const container = document.getElementById("map");
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성

    const options = {
      center: new kakao.maps.LatLng(36.450701, 126.570667),
      level: 5,
    };

    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(place, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        // 페이지 목록 보여주는 displayPagination() 추가
        // displayPagination(pagination);
        setResult(data);
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    // function displayPagination(pagination) {
    //   var paginationEl = document.getElementById("pagination"),
    //     fragment = document.createDocumentFragment(),
    //     i;

    //   // 기존에 추가된 페이지 번호 삭제
    //   while (paginationEl.hasChildNodes()) {
    //     paginationEl.removeChild(paginationEl.lastChild);
    //   }

    //   for (i = 1; i <= pagination.last; i++) {
    //     var el = document.createElement("a");
    //     el.href = "#";
    //     el.innerHTML = i;

    //     if (i === pagination.current) {
    //       el.className = "on";
    //     } else {
    //       el.onclick = (function (i) {
    //         return function () {
    //           pagination.gotoPage(i);
    //         };
    //       })(i);
    //     }

    //     fragment.appendChild(el);
    //   }
    //   paginationEl.appendChild(fragment);
    // }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [place]);

  // 현재위치로 돌아가는 함수
  const returnToCurrentLocation = async () => {
    if (map && currentPosition) {
      const { latitude, longitude } = currentPosition;
      map.panTo(new kakao.maps.LatLng(latitude, longitude));
    }
    // console.log("getCurrentCoordinate 함수 실행!!!");
    // return new Promise((res, rej) => {
    //   // HTML5의 geolocaiton으로 사용할 수 있는지 확인합니다.
    //   if (navigator.geolocation) {
    //     // GeoLocation을 이용해서 접속 위치를 얻어옵니다.
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //       console.log(position);
    //       const lat = position.coords.latitude; // 위도
    //       const lon = position.coords.longitude; // 경도

    //       const coordinate = new kakao.maps.LatLng(lat, lon);
    //       res(coordinate);
    //       console.log(coordinate);
    //     });
    //   } else {
    //     rej(new Error("현재 위치를 불러올 수 없습니다."));
    //   }
    // });
  };

  return (
    <div className="flex flex-col relative">
      <SearchBar
        returnToCurrentLocation={returnToCurrentLocation}
        onChange={onChange}
        handleSubmit={handleSubmit}
        inputText={inputText}
      />
      <div
        id="map"
        className="w-full h-[500px] sm:h-[600px] lg:h-[800px]"
      ></div>
      <div id="result-list">
        {result.map((item, i) => (
          <div key={i} style={{ marginTop: "20px" }}>
            <span>{i + 1}</span>
            <div>
              <div>{item.place_name}</div>
              {console.log(item)}
              <div>{item.address_name}</div>
              <div>{item.phone}</div>
            </div>
          </div>
        ))}
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default KakaoMap;
