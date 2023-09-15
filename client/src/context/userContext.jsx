import React, { createContext, useContext, useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";

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
  const { feedId } = useParams();
  // 팔로우 상태
  const [res, err, loading, fetchData] = useAxios(
    {
      method: "PATCH",
      url: `/feed/${feedId}/feedlike`,
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

  useEffect(() => {
    if (res) {
      setFollow(res.data.data.followYn);
    }
  }, [res]);

  return (
    <UserContext.Provider value={{ follow, setFollow, toggleFollow }}>
      {children}
    </UserContext.Provider>
  );
};
