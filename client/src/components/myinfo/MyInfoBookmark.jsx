//import React from 'react';
import { useEffect, useState } from "react";
import MyInfoDummy from "./MyInfoDummy";


const MyInfoBookmark = ({itemId}) => {
  const myinfoData = MyInfoDummy;

  const [isBookmarked, setIsBookmarked] = useState(); 

  useEffect(() => {
  }, [itemId]);

  const toggleBookmark = () => {
    setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
    console.log(isBookmarked)
  };

    return (
        <button
          onClick={toggleBookmark}
          className="absolute bottom-3 right-3 cursor-pointer"
        >
          <img
            src={
              isBookmarked
                ? "./images/isBookmarked.png"
                : "./images/Bookmark.png"
            }
            alt="Bookmark"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </button>
    );
}

export default MyInfoBookmark