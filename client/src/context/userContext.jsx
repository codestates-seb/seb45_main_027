import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";

const UserContext = createContext();

export const useFollow = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useFollow must be used within a FollowProvider");
  }
  return context;
};

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [follow, setFollow] = useState("");
  const { memberId } = useParams();

  const [res, err, loading, fetchData] = useAxios(
    {
      method: "PATCH",
      url: `/follow/choose/${memberId}`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    },
    false
  );

  const toggleFollow = () => {
    fetchData();
    setFollow(!follow);
  };

  // 팔로우 받아온 요청 상태 저장
  // useEffect(() => {
  //   if (fetchData) {
  //     setFollow(fetchData.followYn);
  //   }
  // }, [fetchData]);

  return (
    <UserContext.Provider value={{ follow, setFollow, toggleFollow }}>
      {children}
    </UserContext.Provider>
  );
};
