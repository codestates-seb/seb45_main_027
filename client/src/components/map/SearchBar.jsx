import React from "react";

const SearchBar = ({ returnToCurrentLocation }) => {
  return (
    <div className="flex absolute z-10 top-5 left-1/2 transform -translate-x-1/2">
      <div className="flex justify-start bg-white p-2 w-full h-1/8 text-center mr-4 shadow-xl rounded-3xl">
        <img src="./images/Search.png" alt="searchimg" />
        <input
          className="bg-transparent w-80 focus:outline-none pl-4 text-[14px]"
          type="text"
        />
      </div>
      <button
        className="shadow-xl rounded-xl bg-white w-[55px]"
        onClick={returnToCurrentLocation}
      >
        <img
          className="w-full p-2"
          src="./images/CurrentLocation.png"
          alt="CurrentLocation"
        />
      </button>
    </div>
  );
};

export default SearchBar;
