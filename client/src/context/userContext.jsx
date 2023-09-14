import React, { createContext, useContext, useState, useEffect } from "react";
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
  const [memberId, setMemberId] = useState("");
  const fromMemberId = localStorage.getItem("memberId");

  const [res, err, loading, fetchData] = useAxios(
    {
      method: "PATCH",
      url: `/follow/choose/${memberId}/${fromMemberId}`,
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
      setMemberId(res.data.data.memberId);
    }}, [res]);


  return (
    <UserContext.Provider value={{ follow, setFollow, toggleFollow }}>
      {children}
    </UserContext.Provider>
  );
};
