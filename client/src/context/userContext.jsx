import React, { createContext, useContext, useState } from "react";

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
  const [follow, setFollow] = useState(false);
  const [nickname, setNickname] = useState(null);

  return (
    <UserContext.Provider value={{ follow, setFollow, nickname, setNickname }}>
      {children}
    </UserContext.Provider>
  );
};
